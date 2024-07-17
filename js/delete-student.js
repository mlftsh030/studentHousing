
const studentData = JSON.parse(localStorage.getItem("studentData")) || [];

const backToHomeBtn = document.getElementById("back-btn");
const deleteForm = document.getElementById("delete-form");
const deleteResult = document.getElementById("delete-result");
const resultDiv = document.getElementById("results");
const deletePdfViewer = document.getElementById("delete-pdf-viewer");
const confirmDeleteBtn = document.getElementById("confirm-delete");

// Back button event listener
backToHomeBtn.addEventListener("click", () => {
  window.location.href = "index1.html";
});

// Search form event listener
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = document.getElementById("delete-search").value.toLowerCase();
  let foundStudent = null;
  if (/[a-zA-Z]/.test(searchTerm)) {
      if(studentData != null){
          for (let i = 0; i < studentData.length; i++) {
              if ((studentData[i].name).toLowerCase().includes(searchTerm)) {
                foundStudent = studentData[i];
                  break;
              }
          }

          if (foundStudent) {
            deletePdfViewer.src = `${(foundStudent.content)}`;
            deleteResult.style.display = "block";
            confirmDeleteBtn.style.display = "block";

            confirmDeleteBtn.addEventListener("click", () => {
              index = studentData.indexOf(foundStudent);
              if (index !== -1) {
                  studentData.splice(index, 1);
                  alert("Student deleted successfully!");
                  localStorage.setItem('studentData', JSON.stringify(studentData));
                  window.location.href = "index1.html";
                }
            });
          } 
          else {
            resultDiv.innerHTML = `No student found with the specified student number or room number.`;
          }
        }
      else {
          resultDiv.innerHTML = `"The data base is empty.`;
      }
  }
  else{
      resultDiv.innerHTML = `invalid input value`;  
    }
  });
