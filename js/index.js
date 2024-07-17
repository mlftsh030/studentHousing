document.addEventListener("DOMContentLoaded", () => {
  const whiteCardsBtn = document.getElementById("white-cards-btn");
  const storageFormsBtn = document.getElementById("storage-forms-btn");
  const whiteCard = document.getElementById("white-card");
  const storageCard = document.getElementById("storage-card");
  const enrollStudentBtn = document.getElementById("enroll-student-btn");
  const getStudentBtn = document.getElementById("get-student-btn");
  const deleteStudentBtn = document.getElementById("delete-student-btn");
  const logoutbtn = document.getElementById("logout-btn");
  const studentData = JSON.parse(localStorage.getItem("studentData")) || [];

  whiteCardsBtn.addEventListener("click", () => {
    whiteCard.classList.remove("hidden");
    storageCard.classList.add("hidden");
  });

  storageFormsBtn.addEventListener("click", () => {
    whiteCard.classList.add("hidden");
    storageCard.classList.remove("hidden");
  });

  enrollStudentBtn.addEventListener("click", () => {
    window.location.href = "white-card.html";
    });

  getStudentBtn.addEventListener("click", () => {
    window.location.href = "studentSearch.html";
  });

  deleteStudentBtn.addEventListener("click", () => {
    window.location.href = "delete-student.html";
  });
  logoutbtn.addEventListener("click", () => {
    alert("You have logged out");
    localStorage.setItem('authenticated', 'false');
    localStorage.removeItem('loggedIn');
    window.location.href = "index.html";
  });
})
const whiteCard = document.getElementById("white-card");
const whiteCardsBtn = document.getElementById("white-cards-btn");
const enrollStudentBtn = document.getElementById("enroll-student-btn");
const backBtn = whiteCard.querySelector("#back-btn"); // Use querySelector to find the back button within whiteCard

// Optional: define storageCard if it's being used
const storageCard = document.getElementById("storage-card"); // Assuming you have an element with id "storage-card"

whiteCardsBtn.addEventListener("click", () => {
  whiteCard.style.display = "block";
  if (storageCard) {
    storageCard.style.display = "none"; // Hide storage card section when white cards are shown
  }
});

enrollStudentBtn.addEventListener("click", () => {
  window.location.href = "white-card.html"; // Redirect to student enrollment page
  
});

backBtn.addEventListener("click", () => {
  // Your action here (e.g., show confirmation message)
  alert("Are you sure you want to search a new student?");

  // Redirect after the action
  window.location.href = "index1.html";
});


// ... rest of the logic for student management buttons ...