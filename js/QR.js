document.addEventListener("DOMContentLoaded", () => {
  const backendBtn = document.getElementById("back-btn");
  const studentForm = document.getElementById("student-form");
  const searchButton = document.getElementById("search-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const downloadLink = document.createElement('a');

  // Retrieve student data from local storage or initialize with a default value if none exists
  const studentData = JSON.parse(localStorage.getItem("studentData")) || [];

  backendBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  function generatePdfContent(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 20; 
    
    // Add photo
    if (data.photo) {
      const img = new Image();
      img.src = data.photo;
      doc.addImage(img, 'JPEG', margin, margin-5, doc.internal.pageSize.getWidth()/2-21, 60); // Add image at (x, y) with width and height
    }
    // Set font and alignment for headings 
    doc.setLineWidth(0.5);
    doc.setFont("helvetica", "bold", 30);
    doc.textAlign = "center";
    doc.line(margin, margin -5, doc.internal.pageSize.getWidth() - margin, margin-5);
    doc.text("Student Personal Infomation", doc.internal.pageSize.getWidth() / 2, margin);
    doc.text("Enrollment infomation", margin, margin+60);
    doc.text("Student Contact Infomation", doc.internal.pageSize.getWidth() / 2, margin+60);
    doc.text("Academic  Infomation", margin, margin+87);
    doc.text("Student Medical Infomation", doc.internal.pageSize.getWidth() / 2, margin+87);
    doc.text("Religion Infomation", margin, margin+118);
    doc.text("Parent/Guardian Infomation", margin, margin+135);
    doc.text("Family/friend in Cape Town",  doc.internal.pageSize.getWidth() / 2, margin+135);
    doc.line(margin+84, margin + 1, doc.internal.pageSize.getWidth() - margin, margin + 1);
      
    // Add a line to separate sections
    doc.line(margin, margin + 55, doc.internal.pageSize.getWidth() - margin, margin + 55);
    doc.line(doc.internal.pageSize.getWidth()/2-1, margin-5, doc.internal.pageSize.getWidth()/2-1, margin + 55);
    // Add text fields
    doc.setFontSize(15);
    doc.text(`Surname:  ${data.surname}`, doc.internal.pageSize.getWidth() / 2, margin + 10);
    doc.text(`First Name: ${data.firstName}`,  doc.internal.pageSize.getWidth() / 2, margin + 20);
    doc.text(`Student No.: ${data.studentNo}`, doc.internal.pageSize.getWidth() / 2, margin + 30);
    doc.text(`ID/Passport No.: ${data.idPassportNo}`, doc.internal.pageSize.getWidth() / 2, margin + 40)
    doc.text(`Date of Birth: ${data.dateOfBirth}`,doc.internal.pageSize.getWidth() / 2, margin + 50);
    // Enrollment infomation:
    doc.setFont("helvetica", "bold", 30);
    doc.text(`Room No.: ${data.roomNumber.toLowerCase()}`, margin, margin+70);
    doc.text(`Date of First Entry: ${data.dateOfFirstEntry}`,margin, margin+80);
    doc.line(margin, margin + 81, doc.internal.pageSize.getWidth() - margin, margin + 81);
    doc.text(`Cell No.: ${data.ScellNo}`, doc.internal.pageSize.getWidth() / 2, margin+70);
    doc.text(`E-Mail: ${data.stuEmail}`, doc.internal.pageSize.getWidth() / 2, margin+80);
    doc.line(margin, margin + 88, doc.internal.pageSize.getWidth() - margin, margin + 88);//underline the student medical
    doc.line(margin, margin + 61, doc.internal.pageSize.getWidth() - margin, margin + 61);//underline the student medical
    doc.text(`Course & Subject: \n${data.Course}`,margin, margin+95);
    doc.text(`Year of study: \n${data.yearOfStudy}`,margin, margin+106);
    doc.line(margin, margin + 113, doc.internal.pageSize.getWidth() - 106, margin + 113);// left underliner 

    doc.text(`Medical Problems: ${data.medicalProblems}`,doc.internal.pageSize.getWidth() / 2, margin+95);
    doc.text(`Medical Aid No.: ${data.medicalAid}`,doc.internal.pageSize.getWidth() / 2, margin+105);
    doc.text(`Dr/GP in Cape Town: \n${data.Dr}`, doc.internal.pageSize.getWidth() / 2, margin+115);
    doc.text(`Dr/GP Tel: ${data.DrTel}`, doc.internal.pageSize.getWidth() / 2, margin+129);
    doc.line(margin+84, margin + 130, doc.internal.pageSize.getWidth() - margin, margin + 130);
    
    doc.line(margin, margin + 119, doc.internal.pageSize.getWidth() - 106, margin + 119);
    doc.text(`Religion: ${data.religion}`,margin, margin+129);
    doc.line(margin, margin + 129+1, doc.internal.pageSize.getWidth() - 106, margin + 130);
    doc.line(margin, margin + 61, doc.internal.pageSize.getWidth() - margin, margin + 61);//underline the student medical


    doc.line(margin, margin + 136, doc.internal.pageSize.getWidth() - 106, margin + 136);
    doc.text(`Name & Surname: \n${data.parentGuardianName}`,margin, margin+140);
    doc.text(`Cell No.: ${data.parentGuardianCell}`,margin, margin+151);
    doc.text(`E-mail:\n${data.parentGuardianEmail}`,margin, margin+161);
    doc.line(margin, margin + 168, doc.internal.pageSize.getWidth() - 106, margin + 168);


    doc.line(margin, margin + 136, doc.internal.pageSize.getWidth() - margin, margin + 136);
    doc.text(`Name & Surname: \n${data.FriendFamilyName}`,doc.internal.pageSize.getWidth() / 2, margin+140);
    doc.text(`Cell No.: ${data.FriendFamilyCell}`,doc.internal.pageSize.getWidth() / 2, margin+151);
    doc.text(`E-mail:\n${data.FriendFamilyEmail}`,doc.internal.pageSize.getWidth() / 2, margin+161);
    doc.line(margin, margin + 168, doc.internal.pageSize.getWidth() - margin, margin + 168);
    
    doc.line(doc.internal.pageSize.getWidth()/2-1, margin + 55, doc.internal.pageSize.getWidth()/2-1, margin + 168);//donot touch
    doc.line(margin, margin -5, margin, margin + 168);
    doc.line(margin+170, margin -5, margin+ 170, margin + 168);
    return doc;
  }

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(studentForm);
    const reader = new FileReader();

    reader.onload = function () {
      const student = {
        surname: formData.get("surname"),
        firstName: formData.get("first-name"),
        roomNumber: formData.get("room-number"),
        idPassportNo: formData.get("id-passport-no"),
        dateOfBirth: formData.get("date-of-birth"),
        studentNo: formData.get("student-no"),
        dateOfFirstEntry: formData.get("date-of-first-entry"),
        ScellNo: formData.get("Scell-no"),
        stuEmail: formData.get("stuEmail"),
        medicalProblems: formData.get("medical-problems"),
        religion: formData.get("religion"),
        Course: formData.get("Course"),
        yearOfStudy: formData.get("year-of-study"),
        medicalAid: formData.get("medical-Aid"),
        Dr: formData.get("Dr"),
        DrTel: formData.get("Dr-tel"),
        parentGuardianName: formData.get("p-name"),
        parentGuardianCell: formData.get("p-cell"),
        parentGuardianEmail: formData.get("p-email"),
        FriendFamilyName: formData.get("ff-name"),
        FriendFamilyCell: formData.get("ff-cell"),
        FriendFamilyEmail: formData.get("ff-email"),
        FriendFamilyAddress: formData.get("ff-Address"),
        parentGuardianAddress: formData.get("p-Address"),
        photo: reader.result
      };

      const pdfDoc = generatePdfContent(student);
      const pdfContent = pdfDoc.output('datauristring');
      const pdfFileName = `${student.studentNo}_${student.roomNumber}.pdf`;

      studentData.push({ name: pdfFileName, content: pdfContent });
      localStorage.setItem('studentData', JSON.stringify(studentData));

      alert("Student information enrolled successfully!");
    };

    const fileInput = document.getElementById('student-picture');
    if (fileInput.files.length > 0) {
      reader.readAsDataURL(fileInput.files[0]);
    } 
    else {
      reader.onload();
    }
  });

  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
      studentForm.reset();
    });
  }



  document.addEventListener("DOMContentLoaded", () => {
    const backend = document.getElementById("back-btn");
    const studentForm = document.getElementById("student-form");

    backend.addEventListener("click", () => {
      if (confirm("Are you sure you want to search a new student?")) {
        window.location.href = "index.html";
      }
    });

    studentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      localStorage.setItem('studentData', JSON.stringify(studentData));
      alert("Student enrolled successfully!");
      studentForm.reset();
    });
  });
});