const loginButton = document.querySelector(".auth-submit");
console.log("login.js connected");

loginButton.addEventListener("click", async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "../index.html";
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
});
