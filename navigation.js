// Centralized Navigation HTML
const navigationHTML = `
<header>
  <div class="container">
    <a href="index.html" class="logo">
      <img src="assets/images/StayVisibleLogo.png" alt="StayVisible Promotions Logo">
    </a>
    <nav>
      <button class="menu-toggle" id="mobile-menu" aria-label="Toggle menu" aria-expanded="false">☰</button>
      <ul id="nav-list">
        <li><a href="index.html">Home</a></li>
        <li><a href="build-program.html">Build Your Program</a></li>
        <li><a href="build-program2.html">Build Your Program 2</a></li>
        <li class="dropdown">
          <a href="resources.html">Program Resources <i class="fas fa-chevron-down"></i></a>
          <ul class="dropdown-menu three-column">
            <div class="dropdown-column overview-column">
              <li><a href="resources.html">Overview</a></li>
              <li><a href="vital-statistics.html">Vital Statistics</a></li>
            </div>
            <div class="dropdown-column features-column">
              <li><a href="attendance-recognition.html">Attendance Recognition</a></li>
              <li><a href="community-impact.html">Community Impact</a></li>
              <li><a href="general-awards.html">General Awards</a></li>
              <li><a href="incentive-programs.html">Incentive Programs</a></li>
              <li><a href="patient-care.html">Patient Care Recognition</a></li>
              <li><a href="peer-to-peer.html">Peer-to-Peer</a></li>
              <li><a href="performance-bonuses.html">Performance Bonuses</a></li>
            </div>
            <div class="dropdown-column features-column">
              <li><a href="point-based-rewards.html">Point-Based Rewards</a></li>
              <li><a href="safety-recognition.html">Safety Recognition</a></li>
              <li><a href="spot-recognition.html">Spot Recognition</a></li>
              <li><a href="welcome-kits.html">Welcome Kits</a></li>
              <li><a href="wellness-programs.html">Wellness Programs</a></li>
              <li><a href="years-of-service.html">Years of Service</a></li>
            </div>
          </ul>
        </li>
          <li><a href="contact.html">Contact Us</a></li>
      </ul>
      <form class="search-form" id="search-form-header">
        <input type="search" name="query" placeholder="Search Products..." aria-label="Search">
        <button type="submit">Search</button>
      </form>
    </nav>
  </div>
</header>
`;

// Function to load navigation and set active states
function loadNavigation() {
  // Insert navigation HTML
  document.body.insertAdjacentHTML('afterbegin', navigationHTML);
  
  // Set active states based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // First, remove active class from all links
  const allLinks = document.querySelectorAll('nav a');
  allLinks.forEach(link => link.classList.remove('active'));
  
  // Set active state for main navigation links (excluding dropdown items)
  const mainNavLinks = document.querySelectorAll('#nav-list > li > a');
  mainNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Set active state for current page
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
    
    // Set active state for Program Resources dropdown (main link only)
    if (href === 'resources.html' && 
        ['resources.html', 'vital-statistics.html', 'welcome-kits.html', 
         'years-of-service.html', 'performance-bonuses.html', 'wellness-programs.html',
         'spot-recognition.html', 'peer-to-peer.html', 'point-based-rewards.html',
         'general-awards.html', 'incentive-programs.html', 'attendance-recognition.html',
         'safety-recognition.html', 'community-impact.html', 'patient-care.html'].includes(currentPage)) {
      link.classList.add('active');
    }
  });
  
  // Set active state for specific dropdown items only
  const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
  dropdownLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

// Load navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNavigation);
} else {
  loadNavigation();
} 