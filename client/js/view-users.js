// ================= ELEMENT =================

const tableBody = document.getElementById("usersTableBody");

// ================= LOAD USERS =================

async function loadUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");

    const users = await response.json();

    tableBody.innerHTML = "";

    users.forEach(function (user) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.full_name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log(error);

    alert("Failed to load users");
  }
}

// ================= INITIAL LOAD =================

loadUsers();
