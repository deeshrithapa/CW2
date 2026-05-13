// ================== CONSULTATION FORM ==================

// get container where consultation form will be inserted
const consultContainer = document.getElementById("consultation-form");
//  create a new form using Javascript
const consultForm = document.createElement("form");
// defining structure of form
consultForm.innerHTML = `
  <label>Full Name *</label>
  <input type="text" name="name" placeholder="e.g. Aryan Thapa">

  <label>Email Address *</label>
  <input type="email" name="email" placeholder="e.g. aryan@email.com">

  <label>Phone Number</label>
  <input type="text" name="phone" placeholder="+40 497 900XXX">
  
  <label>Address *</label>
  <input type="text" name="address" placeholder="e.g. Portsmouth, UK">

  <label>Study Level *</label>
  <input type="text" name="level" placeholder="e.g. Under-graduate">

  <label>Preferred Consultation Date *</label> 
  <input type="date" name="date">

  <label>Tell Us About Your Goals</label>
  <textarea name="message" placeholder="E.g. I am looking to study Computer Science..."></textarea>

  <button type="submit" class="form-btn">Book Consultation</button>
 
`;
// append form to the page
consultContainer.appendChild(consultForm);

// ================== GENERAL ENQUIRY FORM ==================
// get container for the enquiry form
const enquiryContainer = document.getElementById("enquiry-form");
//  create a new form
const enquiryForm = document.createElement("form");
//  defining form structure
enquiryForm.innerHTML = `
  <label>Full Name *</label>
  <input type="text" name="name" placeholder="e.g. Aryan Thapa">

  <label>Email Address *</label>
  <input type="email" name="email" placeholder="e.g. aryan@email.com">

  <label>Your Message *</label>
  <textarea name="message" placeholder="Describe your question in detail"></textarea>

  <button type="submit" class="form-btn outline">Send Enquiry</button>

`;
//  append form to thepage
enquiryContainer.appendChild(enquiryForm);

// ================== SUBMIT HANDLING ==================
//  attach a submit event listener
[consultForm, enquiryForm].forEach((form) => {
  form.addEventListener("submit", function (e) {
    // prevent default form submission
    e.preventDefault();

    // Show alert message depending on form type
    if (form === consultForm) {
      alert(
        "Consultation booked successfully! Thank you! We will get back to you within 24 hours.",
      );
    } else {
      alert(
        "Enquiry sent successfully! Thank you! We will get back to you within 24 hours.",
      );
    }
    //  reset  form after submission
    form.reset();
  });
});
