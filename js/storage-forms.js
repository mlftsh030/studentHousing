const storageCard = document.getElementById("storage-card");
const storageFormsBtn = document.getElementById("storage-forms-btn");

storageFormsBtn.addEventListener("click", () => {
  storageCard.style.display = "block";
  whiteCard.style.display = "none"; // Hide white card section when storage forms are shown
});

// ... rest of the logic for storage management buttons ...
