console.log("register.js connected");

const registerButton = document.querySelector(".auth-submit");

registerButton.addEventListener("click", async function () {

  const full_name = document.getElementById("regName").value;
  const age = document.getElementById("regAge").value;
  const phone = document.getElementById("regPhone").value;
  const email = document.getElementById("regEmail").value;
  const address = document.getElementById("regAddress").value;
  const password = document.getElementById("regPassword").value;

  try {

    const response = await fetch(
      "http://localhost:3000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name,
          age,
          phone,
          email,
          address,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Registration successful");

      window.location.href = "login.html";

    } else {

      alert(data.message);
    }

  } catch (error) {

    console.error(error);

    alert("Registration failed");
  }
});