const STORAGE_KEY = "students";

function getStudents() {
  const storedStudents = localStorage.getItem(STORAGE_KEY);
  if (storedStudents === null) {
    return [];
  }

  return JSON.parse(storedStudents);
}

function saveStudents(student) {
  const students = getStudents();
  students.push(student);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function setupStudentForm() {
  const form = document.getElementById("studentForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const idInput = document.getElementById("id");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const programInput = document.getElementById("program");
    const ageInput = document.getElementById("age");
    const student = {
      id: idInput.value,
      name: nameInput.value,
      email: emailInput.value,
      program: programInput.value,
      age: ageInput.value,
    };

    const students = getStudents();
    
    const repeated = students.some(function (item) {
      return item.id === student.id;
    });

    if (repeated) {
      alert("Ya existe un estudiante con esta identificacion.");
      return;
    }

    saveStudents(student);
    alert("El estudiante ha sido registrado");

    form.reset();
    window.location.href = "index.html";
  });
}

setupStudentForm();


function displayStudents(students) {
  const studentList = document.getElementById("studentList");
  const studentCount = document.getElementById("studentCount");
  studentList.innerHTML = "";
  studentCount.textContent = students.length;
  students.forEach(function (student) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.program}</td>
          <td>${student.age}</td>
          <td><button type="button" class="js-delete" data-id="${student.id}">Eliminar</button></td>`;
    studentList.appendChild(row);
  });
}

function deleteStudent() {
  const studentList = document.getElementById("studentList");
  studentList.addEventListener("click", function (event) {
    if (!event.target.classList.contains("js-delete")) {
      return;
    }
    const students = getStudents();
    const newStudentList = students.filter(
      (student) => student.id !== event.target.dataset.id,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStudentList));
    displayStudents(newStudentList);
  });
}

function searchStudents() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function (event) {
    const searchText = event.target.value.toLowerCase();
    const students = getStudents();
    const foundStudents = students.filter(function (student) {
      return student.name.toLowerCase().includes(searchText);
    });
    displayStudents(foundStudents);
  });
}
