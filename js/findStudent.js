document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("searchButton");
    const resultDiv = document.getElementById("result");
    const studentsNo = document.getElementById("enrolled");
    const studentForm = document.getElementById("student-form");
    const backend = document.getElementById("back-btn");
    const studentData = JSON.parse(localStorage.getItem("studentData")) || [];
    function findStudent() {
        const searchTerm = searchInput.value.toLowerCase();
        let foundPdf = null;
        
        if (studentData != null ) {
            if(/[a-zA-Z]/.test(searchTerm)){
                for (let i = 0; i < studentData.length; i++) {
                    if ((studentData[i].name).toLowerCase().includes(searchTerm)) {
                        foundPdf = studentData[i];
                        break;
                    }
                }
                if (foundPdf) {
                    resultDiv.innerHTML = `
                    <a id="download"href="${foundPdf.content}" download="${foundPdf.name}"><br>Download PDF</a>
                    <iframe id="myPDF" src="${foundPdf.content}" frameborder="0">Open PDF</iframe>
                    
                    <style>
                        #myPDF{
                        width: 100%;
                        height: 600px;
                    }
                        #download{
                        color: white !important;
                        text-align: left !important;
                        font-size: 20px;
                    }
                    </style>
                    `;  
                }
                else {
                    resultDiv.innerHTML = `No PDF found for ${searchTerm} | ${studentData.length-1} exists`;
                }
            }
            else {
                resultDiv.innerHTML = `Please enter a student name | ${studentData.length-1} exists`;
            }
        }
        else{
            resultDiv.innerHTML = `No students found in the database`;
        }
}   

    if (searchButton) {
        searchButton.addEventListener("click", findStudent);
    } else {
        console.log("searchButton not found");
    }

    if (backend) {
        backend.addEventListener("click", () => {
            if (confirm("Are you sure you want to Exit?")) {
                window.location.href = "index1.html";
            }
        });
    } else {
        console.log("backend not found");
    }

    if (studentForm) {
        studentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Student enrolled successfully!");
            studentForm.reset();
        });
    } else {
        console.log("studentForm not found");
    }
});
