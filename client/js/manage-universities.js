// ================= ELEMENTS =================

const tableBody = document.getElementById("universitiesTableBody");

const saveButton = document.getElementById("saveUniversityBtn");

// ================= LOAD UNIVERSITIES =================

async function loadUniversities() {
  try {
    const response = await fetch("http://localhost:3000/universities");

    const universities = await response.json();

    tableBody.innerHTML = "";

    universities.forEach(function (uni) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${uni.id}</td>
        <td>${uni.name}</td>
        <td>${uni.country}</td>
        <td>${uni.city}</td>

        <td>
          <button class="edit-btn" onclick="editUniversity(${uni.id})">
            Edit
          </button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log(error);

    alert("Failed to load universities");
  }
}

// ================= SAVE UNIVERSITY =================

saveButton.addEventListener("click", async function () {
  const universityId = document.getElementById("universityId").value;

  const universityData = {
    name: document.getElementById("name").value,

    country: document.getElementById("country").value,

    city: document.getElementById("city").value,

    courses: document.getElementById("courses").value,

    tuition: document.getElementById("tuition").value,

    image: document.getElementById("image").value,

    website: document.getElementById("website").value,

    description: document.getElementById("description").value,
  };

  try {
    // ================= UPDATE =================

    if (universityId) {
      await fetch(`http://localhost:3000/universities/${universityId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(universityData),
      });

      alert("University updated successfully");
    } else {
      // ================= ADD =================

      await fetch("http://localhost:3000/universities", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(universityData),
      });

      alert("University added successfully");
    }

    clearForm();

    loadUniversities();
  } catch (error) {
    console.log(error);

    alert("Operation failed");
  }
});

// ================= EDIT UNIVERSITY =================

async function editUniversity(id) {
  try {
    const response = await fetch("http://localhost:3000/universities");

    const universities = await response.json();

    const university = universities.find(function (uni) {
      return uni.id === id;
    });

    // Fill form

    document.getElementById("universityId").value = university.id;

    document.getElementById("name").value = university.name;

    document.getElementById("country").value = university.country;

    document.getElementById("city").value = university.city;

    document.getElementById("courses").value = university.courses;

    document.getElementById("tuition").value = university.tuition;

    document.getElementById("image").value = university.image;

    document.getElementById("website").value = university.website;

    document.getElementById("description").value = university.description;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.log(error);

    alert("Failed to edit university");
  }
}

// ================= CLEAR FORM =================

function clearForm() {
  document.getElementById("universityId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("country").value = "";

  document.getElementById("city").value = "";

  document.getElementById("courses").value = "";

  document.getElementById("tuition").value = "";

  document.getElementById("image").value = "";

  document.getElementById("website").value = "";

  document.getElementById("description").value = "";
}

// ================= INITIAL LOAD =================

loadUniversities();
