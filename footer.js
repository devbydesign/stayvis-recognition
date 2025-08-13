// Centralized Footer HTML for StayVisible
const footerHTML = `
<footer>
  <div class="container footer-grid">
    <div class="footer-section footer-company">
      <h3>StayVisible</h3>
      <p>New Fairfield, CT 06812<br>(888) 746-2111<br>theresa@stayvisible.com</p>
    </div>
    <div class="footer-section footer-links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#" onclick="document.querySelector('#search-form-header input[type=search]')?.focus(); return false;">Search</a></li>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="contact.html">Support</a></li>
        <li><a href="contact.html">Feedback and Suggestions</a></li>
      </ul>
    </div>
    <div class="footer-section footer-social">
      <h3>Follow Us</h3>
      <div class="social-icons">
        <a href="https://www.facebook.com/stayvisiblellc" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://x.com/StayVizLLC" target="_blank" aria-label="X (Twitter)">
          <i class="fab fa-x-twitter"></i>
        </a>
        <a href="https://www.instagram.com/stayvisible2018/" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/stay-visible-llc/" target="_blank" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>
  <div class="container copyright">
    <p>&copy; <span id="current-year"></span> StayVisible Promotions. All rights reserved. | Website by YourName/Company</p>
  </div>
</footer>
`;

function loadFooter() {
  const existing = document.querySelector('footer');
  if (existing) {
    // Replace existing footer to standardize across pages
    existing.outerHTML = footerHTML;
  } else {
    // Insert footer HTML before the closing body tag
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Set the current year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}


