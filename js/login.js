// Initialize sample users array if not already present in localStorage
const users = JSON.parse(localStorage.getItem('users')) || [
  { username: "mlftsh030", password: "Batloung1966*", role: "admin" },
  { username: "mlftsh030", password: "Batloung1966", role: "management" },
  { username: "mlilo", password: "12345", role: "management" }
];
localStorage.setItem('users', JSON.stringify(users));

function showRegisterForm() {
  document.getElementById('loginDiv').style.display = 'none';
  document.getElementById('registerDiv').style.display = 'block';
  document.getElementById('usrMngmt').style.display = 'block';
  displayUsers();
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
      localStorage.setItem('loggedIn', JSON.stringify(user));
      if (user.role === "management") {
          showRegisterForm();
          localStorage.setItem('authenticated', 'true');
      } else {
         localStorage.setItem('authenticated', 'true');
          window.location.href = "index1.html";
      }
  } else {
      document.getElementById('message').textContent = "Invalid login credentials";
      document.getElementById('message').style.display = 'block';
  }
});

// Handle registration form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
  if (loggedInUser && loggedInUser.role === "management") {
      const newUsername = document.getElementById('newUsername').value;
      const newPassword = document.getElementById('newPassword').value;
      const role = document.getElementById('role').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(user => user.username === newUsername);

      if (userExists) {
          document.getElementById('registerMessage').textContent = "User already exists";
      } else {
          users.push({ username: newUsername, password: newPassword, role });
          localStorage.setItem('users', JSON.stringify(users));
          document.getElementById('registerMessage').textContent = "User registered successfully";
          document.getElementById('registerForm').reset();
          displayUsers();
      }
  } else {
      document.getElementById('registerMessage').textContent = "Only management can register new users";
  }
});

// Display users for management
function displayUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach((user, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>Username</strong>: ${user.username}<br><strong>Role</strong>: ${user.role}`;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
          removeUser(index);
      });
      li.appendChild(removeButton);
      userList.appendChild(li);
  });
}

// Remove user function
function removeUser(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));
  displayUsers();
}

// Handle logout
document.getElementById('logout').addEventListener('click', function() {
  localStorage.setItem('authenticated', 'false');
  alert("You have logged out");
  localStorage.removeItem('loggedIn');
  window.location.href = "index.html";
});

// Handle home button
document.getElementById('home').addEventListener('click', function() {
  window.location.href = "index1.html";
});

// index part

document.addEventListener("DOMContentLoaded", () => {
  const whiteCardsBtn = document.getElementById("white-cards-btn");
  const storageFormsBtn = document.getElementById("storage-forms-btn");
  const whiteCard = document.getElementById("white-card");
  const storageCard = document.getElementById("storage-card");
  const enrollStudentBtn = document.getElementById("enroll-student-btn");
  const getStudentBtn = document.getElementById("get-student-btn");
  const deleteStudentBtn = document.getElementById("delete-student-btn");
  const logoutbtn = document.getElementById("logout-btn");
  const studentData = JSON.parse(localStorage.getItem('users')) || [];

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
  alert("Are you sure you want to exist?");

  // Redirect after the action
  window.location.href = "index.html";
});
