console.log("Booking script loaded!");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ==========================
   SUPABASE CONFIG
========================== */
const SUPABASE_URL = "https://cskwmnwlvgbotyutegoy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_2tYWZaOByOJ7Dtbx8OaCJQ_yHNoQqYA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  /* ================= DOM ELEMENTS ================= */
  const bookingName = document.getElementById("bookingName");
  const bookingEmail = document.getElementById("bookingEmail");
  const bookingPhone = document.getElementById("bookingPhone");
  const bookingNote = document.getElementById("bookingNote");
  const dateInput = document.getElementById("bookingDate");
  const timeInput = document.getElementById("bookingTime");
  const submitBtn = document.getElementById("submitBookingBtn");

  const findApptBtn = document.getElementById("detectBookingBtn");
  const rePhoneInput = document.getElementById("detectPhone");
  const reEmailInput = document.getElementById("detectEmail");
  const rescheduleForm = document.getElementById("rescheduleFormContainer");
  const reDateInput = document.getElementById("re_date");
  const reTimeInput = document.getElementById("re_time");
  const saveRescheduleBtn = document.getElementById("saveRescheduleBtn");
  const cancelApptBtn = document.getElementById("cancelAppointmentBtn");

  const errorBox = document.getElementById("bookingError");
  const successBox = document.getElementById("bookingSuccess");
  const toast = document.getElementById("bookingToast");

  const loader = document.getElementById("rescheduleLoading");

  let currentAppointment = null; // stores appointment found for reschedule

  /* ==========================
     HELPER FUNCTIONS
  ========================== */
  function showToast(message, type = "error") {
    toast.textContent = message;
    toast.style.background = type === "success" ? "#2abf6f" : "#ff4d4d";
    toast.classList.remove("hidden");
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hidden");
    }, 3500);
  }

  function showLoader(show = true) {
    loader.style.display = show ? "block" : "none";
  }

  /* ==========================
     BLOCKED TIMES LOGIC
  ========================== */
  async function updateBlockedTimes(selectedDate, targetTimeInput) {
    if (!selectedDate) return;

    // Fetch unavailable times
    const { data: unavailableData } = await supabase
      .from("booking_unavailable")
      .select("time_range")
      .eq("date", selectedDate)
      .eq("archived", false);

    // Fetch booked times
    const { data: bookedData } = await supabase
      .from("bookings")
      .select("time")
      .eq("date", selectedDate)
      .eq("archived", false);

    const blockedTimes = new Set([
      ...(unavailableData?.map(d => d.time_range) || []),
      ...(bookedData?.map(d => d.time) || [])
    ]);

    Array.from(targetTimeInput.options).forEach(option => {
      if (!option.value) return;
      option.disabled = blockedTimes.has(option.value);
      option.textContent = blockedTimes.has(option.value)
        ? `${option.value} (Unavailable)`
        : option.value;
    });
  }

  dateInput.addEventListener("change", () => updateBlockedTimes(dateInput.value, timeInput));
  reDateInput.addEventListener("change", () => updateBlockedTimes(reDateInput.value, reTimeInput));

  /* ==========================
     BOOK APPOINTMENT
  ========================== */
  submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    errorBox.textContent = "";
    successBox.textContent = "";
    successBox.classList.add("hidden");

    const name = bookingName.value.trim();
    const email = bookingEmail.value.trim();
    const phone = bookingPhone.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const note = bookingNote.value.trim();

    if (!name || !email || !phone || !date || !time) {
      showToast("Please fill all required fields.");
      return;
    }

    // Check if email or phone already exists
    const { data: existingBookings } = await supabase
      .from("bookings")
      .select("id")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .limit(1);

    if (existingBookings.length > 0) {
      showToast("⛔ Appointment already booked. Check your email.");
      return;
    }

    // Insert booking
    const { error: insertErr } = await supabase.from("bookings").insert([{ name, email, phone, date, time, note }]);
    if (insertErr) {
      console.error(insertErr);
      showToast("Booking failed. Try again later.");
      return;
    }

    // Send confirmation email
    emailjs.send("Sarwari", "Sarwari", { name, email, phone, date, time })
      .then(() => console.log("Confirmation email sent."))
      .catch(err => console.error("Email failed:", err));

    showToast("✅ Booking successful!", "success");

    // Reset form
    bookingName.value = "";
    bookingEmail.value = "";
    bookingPhone.value = "";
    bookingNote.value = "";
    dateInput.value = "";
    timeInput.selectedIndex = 0;
  });

  /* ==========================
     FIND APPOINTMENT
  ========================== */
  findApptBtn.addEventListener("click", async e => {
    e.preventDefault();
    const email = reEmailInput.value.trim();
    const phone = rePhoneInput.value.trim();
    showLoader(true);

    if (!email || !phone) {
      showToast("Enter both email and phone.");
      showLoader(false);
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("email", email)
      .eq("phone", phone)
      .eq("archived", false)
      .single();

    showLoader(false);

    if (error || !data) {
      showToast(`Appointment not found. Call us at 123-456-7890`);
      rescheduleForm.classList.add("hidden");
      currentAppointment = null;
      return;
    }

    currentAppointment = data;
    rescheduleForm.classList.remove("hidden");

    // Fill current values
    reDateInput.value = data.date;
    reTimeInput.value = data.time;
    updateBlockedTimes(data.date, reTimeInput);
  });


  async function isTimeAvailable(date, time, bookingId = null) {
  // Check unavailable table
  const { data: unavailable } = await supabase
    .from("booking_unavailable")
    .select("id")
    .eq("date", date)
    .eq("time_range", time)
    .eq("archived", false)
    .limit(1);

  if (unavailable && unavailable.length > 0) return false;

  // Check existing bookings (exclude current booking if rescheduling)
  let query = supabase
    .from("bookings")
    .select("id")
    .eq("date", date)
    .eq("time", time)
    .eq("archived", false);

  if (bookingId) {
    query = query.neq("id", bookingId);
  }

  const { data: booked } = await query.limit(1);
  return !booked || booked.length === 0;
}


  /* ==========================
     SAVE RESCHEDULE
  ========================== */
saveRescheduleBtn.addEventListener("click", async e => {
  e.preventDefault();
  if (!currentAppointment) return;

  const newDate = reDateInput.value;
  const newTime = reTimeInput.value;

  if (!newDate || !newTime) {
    showToast("Please select a valid date and time.");
    return;
  }

  showLoader(true);

  // 🔴 HARD CHECK AVAILABILITY
  const available = await isTimeAvailable(
    newDate,
    newTime,
    currentAppointment.id
  );

  if (!available) {
    showLoader(false);
    showToast("⛔ That time is no longer available. Please choose another.");
    return;
  }

  // Proceed only if available
  const { error } = await supabase
    .from("bookings")
    .update({
      date: newDate,
      time: newTime
    })
    .eq("id", currentAppointment.id);

  showLoader(false);

  if (error) {
    showToast("Reschedule failed. Please try again.");
    return;
  }

  // Send reschedule email
  emailjs.send("Sarwari", "re_Sarwari", {
    name: currentAppointment.name,
    email: currentAppointment.email,
    phone: currentAppointment.phone,
    date: newDate,
    time: newTime
  });

  showToast("✅ Appointment rescheduled successfully!", "success");
  rescheduleForm.classList.add("hidden");
  currentAppointment = null;
});


  /* ==========================
     CANCEL APPOINTMENT
  ========================== */
  cancelApptBtn.addEventListener("click", async e => {
    e.preventDefault();
    if (!currentAppointment) return;
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    showLoader(true);

    const { error } = await supabase
      .from("bookings")
      .update({ archived: true })
      .eq("id", currentAppointment.id);

    showLoader(false);

    if (error) {
      showToast("Cancellation failed.");
      return;
    }

    showToast("✅ Appointment cancelled.", "success");
    rescheduleForm.classList.add("hidden");
    currentAppointment = null;
  });
});
