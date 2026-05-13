// We need different links depending on if we are in the pages/ folder or not
// This checks the current URL to figure that out
var isInPagesFolder = window.location.pathname.includes("/pages/");

// If we are inside pages/ folder, we go up one level with ../
// If we are in the root, we don't need to go up
var prefix = isInPagesFolder ? "../" : "";


// ── HEADER ────────────────────────────────────────────────────────

function loadHeader() {
  document.getElementById("site-header").innerHTML = `
    <nav class="navbar">
      <div class="logo">
        <div class="logo-icon">EB</div>
        <div class="logo-text">
          <h2>EduBridge International</h2>
          <span>INTERNATIONAL STUDENT SUPPORT</span>
        </div>
      </div>

      <ul class="nav-links" id="navLinks">
        <li><a href="${prefix}index.html">Home</a></li>
        <li><a href="${prefix}pages/about.html">About Us</a></li>
        <li><a href="${prefix}pages/service.html">Services</a></li>
        <li><a href="${prefix}pages/university.html">Universities</a></li>
        <li><a class="cta" href="${prefix}pages/contact.html">Book a Consultation</a></li>
        <li>
          <a href="${prefix}pages/login.html" class="user-icon-btn" aria-label="Login">
            <i class="fa-regular fa-user"></i>
          </a>
        </li>
      </ul>

      <button class="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  `;
}


// ── FOOTER ────────────────────────────────────────────────────────

function loadFooter() {
  document.getElementById("site-footer").innerHTML = `
    <div class="footer-container">
      <div class="footer-left">
        <h3>EduBridge International</h3>
        <p>Helping international students secure admission to top universities
           across the UK, Europe, Canada and Australia.</p>
      </div>

      <div class="footer-right">
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="${prefix}index.html">Home</a></li>
            <li><a href="${prefix}pages/about.html">About Us</a></li>
            <li><a href="${prefix}pages/service.html">Services</a></li>
            <li><a href="${prefix}pages/university.html">Universities</a></li>
            <li><a href="${prefix}pages/contact.html">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact</h4>
          <p>Email: info@edubridge.com</p>
          <p>Phone: +44 000 000 000</p>
          <p>Location: Portsmouth, UK</p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 EduBridge International. All Rights Reserved.</p>
    </div>
  `;
}


// ── RUN BOTH ──────────────────────────────────────────────────────

loadHeader();
loadFooter();