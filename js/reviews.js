import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ==========================
   SUPABASE CONFIG
========================== */
const SUPABASE_URL = "https://khvyorfwdviuywcfldxh.supabase.co"; // replace with your URL
const SUPABASE_ANON_KEY = "sb_publishable__R64vdHfzLYKXQ9yUNC9Aw_WfMupAeC"; // replace with your ANON key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ==========================
   STAR RATING (1–5, no halves)
========================== */
let selectedRating = 0;
const starContainer = document.getElementById("starRating");

for (let i = 1; i <= 5; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.innerHTML = "★";
  star.dataset.index = i;

  // hover effect
  star.onmouseenter = () => updateStars(i);
  star.onmouseleave = () => updateStars(selectedRating);

  // click sets rating
  star.onclick = () => {
    selectedRating = i; // only whole numbers
    updateStars(selectedRating);
  };

  starContainer.appendChild(star);
}

function updateStars(rating = 0) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, i) => {
    star.classList.toggle("active", i < rating);
    star.classList.remove("half"); // remove half star logic entirely
  });
}

/* ==========================
   SUBMIT REVIEW
========================== */
const submitBtn = document.getElementById("submitReviewBtn");
const successMsg = document.getElementById("successMessage");

submitBtn.addEventListener("click", async () => {
  const name = document.getElementById("reviewName").value.trim();
  const message = document.getElementById("reviewMessage").value.trim();
  const error = document.getElementById("reviewError");

  if (!name || !message || selectedRating === 0) {
    error.textContent = "Please complete all fields and select a rating.";
    return;
  }

  error.textContent = "";

  const reviewData = {
    name,
    rating: selectedRating,
    comment: message,
    is_admin: false,
    created_at: new Date().toISOString()
  };

  const { data, error: dbError } = await supabase.from("reviews").insert([reviewData]);
  if (dbError) {
    console.error("Error saving review:", dbError);
    error.textContent = "Error saving review. Try again.";
    return;
  }

  document.getElementById("reviewName").value = "";
  document.getElementById("reviewMessage").value = "";
  selectedRating = 0;
  updateStars();

  // Show animated success
  successMsg.classList.remove("hidden");
  setTimeout(() => successMsg.classList.add("hidden"), 3000);
});

