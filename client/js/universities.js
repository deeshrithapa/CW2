// ================== GET ELEMENTS ==================

// Get container where university cards will be displayed
const container = document.getElementById("universities-container");
// Get dropdown filter
const filter = document.getElementById("countryFilter");
// Store university data
let universitiesData = [];

// ================== FETCH DATA ==================

fetch("../data/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    universitiesData = data; // store data
    displayUniversities(data); // show all universities
    populateFilter(data); // fill dropdown
  });

// ================== DISPLAY UNIVERSITIES ==================

function displayUniversities(data) {
  container.innerHTML = ""; // clear old cards
  // Loop through each university
  data.forEach(function (uni) {
    const card = document.createElement("div");
    card.classList.add("uni-card");
    // Add content
    card.innerHTML = `
      <img src="${uni.image}" alt="${uni.name}" class="uni-img">

      <div class="uni-content">
        <h3 class="uni-name">${uni.name}</h3>
        <p class="uni-location">${uni.city}, ${uni.country}</p>

        <p class="uni-courses">
          <strong>Available Courses:</strong><br>
          ${uni.courses}
        </p>

        <p class="uni-desc">${uni.description}</p>

        <p class="uni-fee">
          <strong>Tuition:</strong> ${uni.tuition}
        </p>

        <div class="uni-buttons">
          <a href="${uni.website}" target="_blank" class="btn-outline">
            Visit Website 
          </a>
          <button class="btn-primary apply-btn">
            Save
          </button>
        </div>
      </div>
    `;

    // Button click event
    const button = card.querySelector(".apply-btn");
    button.addEventListener("click", function () {
      alert(uni.name + " saved!");
    });
    // Add card to page
    container.appendChild(card);
  });
}

// ================== POPULATE FILTER ==================

function populateFilter(data) {
  const countries = [];
  // Collect unique countries manually
  data.forEach(function (uni) {
    if (!countries.includes(uni.country)) {
      countries.push(uni.country);
    }
  });
  // Add countries to dropdown
  countries.forEach(function (country) {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    filter.appendChild(option);
  });
}

// ================== FILTER LOGIC ==================

filter.addEventListener("change", function () {
  const selectedCountry = filter.value;
  // If "all" selected → show everything
  if (selectedCountry === "all") {
    displayUniversities(universitiesData);
  } else {
    const filteredUniversities = [];
    // Manually filter data
    universitiesData.forEach(function (uni) {
      if (uni.country === selectedCountry) {
        filteredUniversities.push(uni);
      }
    });

    displayUniversities(filteredUniversities);
  }
});
