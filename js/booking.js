console.log("Booking script loaded!");
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
});


import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ==========================
   SUPABASE CONFIG
========================== */
const SUPABASE_URL = "https://cskwmnwlvgbotyutegoy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_2tYWZaOByOJ7Dtbx8OaCJQ_yHNoQqYA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  /* DOM ELEMENTS */
  const bookingName = document.getElementById("bookingName");
  const bookingEmail = document.getElementById("bookingEmail");
  const bookingPhone = document.getElementById("bookingPhone");
  const bookingNote = document.getElementById("bookingNote");
  const dateInput = document.getElementById("bookingDate");
  const timeInput = document.getElementById("bookingTime");
  const submitBtn = document.getElementById("submitBookingBtn");
  const errorBox = document.getElementById("bookingError");
  const successBox = document.getElementById("bookingSuccess");

  /* ====== Toast function ====== */
  function showToast(message) {
    const toast = document.getElementById("bookingToast");
    if (!toast) return; // safety check
    toast.textContent = message;
    toast.classList.remove("hidden", "hide");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hide");
    }, 3500);
  }

  /* ==========================
     BLOCKED TIMES LOGIC
  ========================== */
  dateInput.addEventListener("change", async () => {
    const selectedDate = dateInput.value;
    if (!selectedDate) return;

    // Fetch unavailable times
    const { data: unavailableData, error: unavailErr } = await supabase
      .from("booking_unavailable")
      .select("time_range")
      .eq("date", selectedDate)
      .eq("archived", false);

    // Fetch already booked times
    const { data: bookedData, error: bookedErr } = await supabase
      .from("bookings")
      .select("time")
      .eq("date", selectedDate)
      .eq("archived", false);

    if (unavailErr || bookedErr) {
      console.error("Error fetching blocked times:", unavailErr || bookedErr);
      return;
    }

    const blockedTimes = new Set([
      ...(unavailableData?.map(d => d.time_range) || []),
      ...(bookedData?.map(d => d.time) || [])
    ]);

    Array.from(timeInput.options).forEach(option => {
      if (!option.value) return;
      option.disabled = blockedTimes.has(option.value);
      option.textContent = blockedTimes.has(option.value)
        ? `${option.value} (Unavailable)`
        : option.value;
    });
  });

  /* ==========================
     SUBMIT BOOKING
  ========================== */
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    errorBox.textContent = "";
    successBox.textContent = "";
    successBox.classList.remove("error-state");
    successBox.classList.add("hidden");

    const name = bookingName.value.trim();
    const email = bookingEmail.value.trim();
    const phone = bookingPhone.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const note = bookingNote.value.trim();

    if (!name || !email || !phone || !date || !time) {
      errorBox.textContent = "Please fill all required fields.";
      return;
    }

// Check if email or phone already exists
const { data: existingBookings } = await supabase
  .from("bookings")
  .select("id")
  .or(`email.eq.${email},phone.eq.${phone}`)
  .limit(1);

if (existingBookings.length > 0) {
  showToast("⛔ Appointment already booked. Please check your email for details.");
    bookingName.value = "";
    bookingEmail.value = "";
    bookingPhone.value = "";
    bookingNote.value = "";
    dateInput.value = "";
    timeInput.selectedIndex = 0;
  return;
}



    // Final insert
    const { data, error: insertErr } = await supabase
      .from("bookings")
      .insert([{ name, email, phone, date, time, note }]);

    if (insertErr) {
      console.error("Error inserting booking:", insertErr);
      errorBox.textContent = "Booking failed. Try again later.";
      return;
    }

    // Send confirmation email
    emailjs.send("Sarwari", "Sarwari", { name, email, phone, date, time })
      .then(() => console.log("Confirmation email sent."))
      .catch(err => console.error("Email failed:", err));

    // Show success
    successBox.textContent = "✅ Booking successful! Please check your email for appointment details.";
    successBox.classList.remove("hidden");

    // Reset form
    bookingName.value = "";
    bookingEmail.value = "";
    bookingPhone.value = "";
    bookingNote.value = "";
    dateInput.value = "";
    timeInput.selectedIndex = 0;
  });
});
