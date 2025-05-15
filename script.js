// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  // Initialize search form functionality
  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const searchInput = this.querySelector('input[type="search"]');
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (!searchTerm) {
        alert('Please enter a search term');
        return;
      }
      
      // Perform search among product cards if they exist
      const productCards = document.querySelectorAll('.product-card');
      let matchCount = 0;
      
      if (productCards.length > 0) {
        // First hide all products
        productCards.forEach(card => {
          card.style.display = 'none';
        });
        
        // Then show matching products
        productCards.forEach(card => {
          const title = card.dataset.title?.toLowerCase() || '';
          const desc = card.dataset.desc?.toLowerCase() || '';
          const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
          
          if (title.includes(searchTerm) || desc.includes(searchTerm) || cardTitle.includes(searchTerm)) {
            card.style.display = 'flex';
            // Add highlight animation
            card.classList.add('search-highlight');
            // Remove the class after animation completes
            setTimeout(() => {
              card.classList.remove('search-highlight');
            }, 1000);
            matchCount++;
          }
        });
        
        // Show search results message
        const resultsHeading = document.querySelector('h2');
        if (resultsHeading) {
          resultsHeading.textContent = `Search Results for "${searchTerm}" (${matchCount} found)`;
        }
        
        // If no results, show a message
        if (matchCount === 0) {
          const productsContainer = document.querySelector('.product-grid');
          if (productsContainer) {
            const noResultsMsg = document.createElement('p');
            noResultsMsg.textContent = `No products found matching "${searchTerm}". Try a different search term.`;
            noResultsMsg.className = 'no-results';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.width = '100%';
            noResultsMsg.style.padding = '2rem';
            productsContainer.appendChild(noResultsMsg);
          }
        }
      } else {
        // If no product cards on this page, redirect to index with search parameter
        window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
      }
      
      // Scroll to results
      const productsSection = document.querySelector('.product-grid');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Handle search parameter if coming from another page
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    const searchInput = document.querySelector('.search-form input[type="search"]');
    if (searchInput) {
      searchInput.value = searchParam;
      // Trigger search
      const searchForm = document.querySelector('.search-form');
      if (searchForm) {
        const event = new Event('submit');
        searchForm.dispatchEvent(event);
      }
    }
  }
  
  // Initialize accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      // Toggle active class on the header
      this.classList.toggle('active');
      
      // Toggle active class on the content
      const content = this.nextElementSibling;
      content.classList.toggle('active');
    });
  });
  
  // Initialize contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Validate form (simple validation)
      if (!name || !email || !message) {
        alert('Please fill out all fields');
        return;
      }
      
      // In a real application, you would send this data to a server
      // For now, we'll just show a success message
      alert(`Thank you for your message, ${name}! We will get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
});

// Modal Functionality
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalQuoteBtn = modal.querySelector('.btn'); // Get quote button inside modal
const closeModalBtn = modal.querySelector('.modal-close-btn');
const productCards = document.querySelectorAll('.product-card');

// Function to open modal
function openModal(card) {
  const title = card.dataset.title;
  const imgSrc = card.dataset.img;
  const desc = card.dataset.desc;

  modalImg.src = imgSrc;
  modalImg.alt = title; // Set alt text
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  
  // Update quote button link (optional - passes product title)
  modalQuoteBtn.href = `contact.html?product=${encodeURIComponent(title)}`;

  modal.classList.add('show');
}

// Function to close modal
function closeModal() {
  modal.classList.remove('show');
}

// Add event listeners to product cards
productCards.forEach(card => {
  // Listen for clicks on the entire card
  card.addEventListener('click', (event) => {
    // Check if the click is on the View Details button or its parent button element
    const isViewDetailsButton = event.target.classList.contains('view-details') || 
                              event.target.closest('.view-details');
    
    // If it's a button click, prevent the default behavior
    if (isViewDetailsButton) {
      event.preventDefault();
      event.stopPropagation(); // Prevent triggering the card click
      openModal(card);
    } 
    // For non-button clicks on the card
    else if (event.target.tagName !== 'BUTTON') {
      openModal(card);
    }
  });
});

// Add event listener to close button
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

// Add event listener to close modal when clicking outside the content
if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) { // Check if click is on the modal background
      closeModal();
    }
  });
}

// Add event listener for Escape key to close modal
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});

// Mobile Menu Toggle
const menuButton = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (menuButton && navList) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
    // Change button icon based on state
    menuButton.innerHTML = navList.classList.contains('active') ? '✕' : '☰'; 
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile navigation toggle (Placeholder) - Removed placeholder function
// function setupMobileNav() {
//   // ...
// }
// setupMobileNav(); 

// ==============================================
// --- NEW: PROGRAM BUILDER FUNCTIONALITY --- 
// ==============================================

const modulePalette = document.getElementById('module-palette');
const canvasDropzone = document.getElementById('canvas-dropzone');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const planDetailsForm = document.getElementById('plan-details-form');
const planSummarySection = document.getElementById('plan-summary-section');
const summaryContent = document.getElementById('plan-summary-content');
const summaryModulesList = document.getElementById('summary-modules-list');
const summaryContactInfo = document.getElementById('summary-contact-info');
const saveButton = document.getElementById('save-program-btn'); // Although requested, save just uses localStorage implicitly
const startOverButton = document.getElementById('start-over-btn');
const generatePlanButton = document.getElementById('generate-plan-btn');
const captchaQuestionSpan = document.getElementById('captcha-question');
const captchaNum1Input = document.getElementById('captcha-num1');
const captchaNum2Input = document.getElementById('captcha-num2');
const captchaInput = document.getElementById('captcha');
const dropzonePlaceholder = document.querySelector('.dropzone-placeholder');

// --- Sync Palette Module Visibility --- 
function syncPaletteVisibility() {
    if (!modulePalette || !canvasDropzone) return;
    const modulesOnCanvas = canvasDropzone.querySelectorAll('.program-module');
    const canvasModuleIds = new Set();
    modulesOnCanvas.forEach(m => canvasModuleIds.add(m.dataset.moduleId));

    const paletteModules = modulePalette.querySelectorAll('.program-module');
    paletteModules.forEach(pModule => {
        if (canvasModuleIds.has(pModule.dataset.moduleId)) {
            pModule.style.display = 'none'; // Hide if on canvas
        } else {
            pModule.style.display = 'flex'; // Show if not on canvas
        }
    });
}

// --- Drag and Drop ---
let draggedModule = null;

// Function to add listeners TO MODULES ON THE CANVAS (Right-click only now)
function addCanvasListeners(moduleElement) {
    // Right-click removal listener (Keep)
    moduleElement.addEventListener('contextmenu', (e) => {
      e.preventDefault(); // Prevent browser context menu
      if (confirm('Remove this module?')) {
        e.target.closest('.program-module').remove();
        updateProgramStrength();
        saveCanvasState();
        syncPaletteVisibility(); // Sync after removal
        // Show placeholder if canvas becomes empty
        if (canvasDropzone && canvasDropzone.children.length === 0) {
             if (dropzonePlaceholder) dropzonePlaceholder.hidden = false;
         }
      }
    });
}

// Add event listeners to draggable modules in the PALETTE
const modules = modulePalette ? modulePalette.querySelectorAll('.program-module') : [];
modules.forEach(module => {
  module.addEventListener('dragstart', (e) => {
    // Check if module is already on canvas (should be hidden, but check anyway)
    if(e.target.style.display === 'none') {
        e.preventDefault();
        return;
    }
    draggedModule = e.target.cloneNode(true); // Clone the node FROM PALETTE
    draggedModule.classList.remove('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.moduleId);
    e.dataTransfer.effectAllowed = 'copy';
    setTimeout(() => e.target.classList.add('dragging'), 0);
    const tooltip = e.target.querySelector('.tooltip-text');
    if (tooltip) tooltip.style.visibility = 'hidden';
  });

  module.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
     setTimeout(() => {
        if (draggedModule) {
             draggedModule = null;
         }
     }, 0); 
  });
});

// Add event listeners to the dropzone (CANVAS)
if (canvasDropzone) {
  canvasDropzone.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    // Simplified check: Allow drop if dragging a module from palette
    if (draggedModule) { 
         e.dataTransfer.dropEffect = 'copy'; 
         canvasDropzone.classList.add('drag-over');
    } else {
         e.dataTransfer.dropEffect = 'none'; 
    }
  });

  canvasDropzone.addEventListener('dragleave', () => {
    canvasDropzone.classList.remove('drag-over');
  });

  canvasDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    canvasDropzone.classList.remove('drag-over');
    
    // Check if module already exists on canvas before dropping
    const droppedModuleId = e.dataTransfer.getData('text/plain');
    const alreadyExists = canvasDropzone.querySelector(`[data-module-id="${droppedModuleId}"]`);

    if (draggedModule && !alreadyExists) { // Only drop if it's not already there
      if (dropzonePlaceholder && !dropzonePlaceholder.hidden) {
        dropzonePlaceholder.hidden = true;
      }
      const droppedElement = draggedModule; 
      canvasDropzone.appendChild(droppedElement);
      addCanvasListeners(droppedElement); 
      draggedModule = null; // Reset after successful drop
      updateProgramStrength();
      saveCanvasState();
      syncPaletteVisibility(); // Sync after adding
    } else if (alreadyExists) {
        // Optionally provide feedback that it's already added
        // console.log("Module already added");
        draggedModule = null; // Still reset if drag ended here
    } else {
        draggedModule = null; // Reset if drag ended for other reasons
    }
  });
}

// --- Strength Meter Update --- 
function updateProgramStrength() {
    if (!canvasDropzone || !strengthBar || !strengthText) return;
    const modulesOnCanvas = canvasDropzone.querySelectorAll('.program-module');
    const count = modulesOnCanvas.length;
    let widthPercent = 0;
    let text = '';

    if (count === 0) {
        widthPercent = 0;
        text = '';
    } else if (count === 1) {
        widthPercent = 33; // Using discrete steps
        text = 'Good start!';
    } else if (count === 2) {
        widthPercent = 66;
        text = 'Getting stronger!';
    } else { // 3 or more
        widthPercent = 100;
        text = 'Great foundation!';
    }

    strengthBar.style.width = `${widthPercent}%`;
    strengthText.textContent = text;
}

// --- LocalStorage Save/Load --- 
function saveCanvasState() {
    if (!canvasDropzone) return;
    const modulesOnCanvas = canvasDropzone.querySelectorAll('.program-module');
    const moduleData = Array.from(modulesOnCanvas).map(m => ({
        id: m.dataset.moduleId,
        html: m.outerHTML // Save the exact HTML to restore
    }));
    localStorage.setItem('programBuilderCanvas', JSON.stringify(moduleData));
    // Show placeholder if canvas is empty after save
    if (dropzonePlaceholder) {
        dropzonePlaceholder.hidden = moduleData.length > 0;
    }
}

// --- Modified loadCanvasState to restore default module logic ---
function loadCanvasState() {
    if (!canvasDropzone) return;
    const savedState = localStorage.getItem('programBuilderCanvas');
    let modulesData = [];
    if (savedState) {
        try {
            modulesData = JSON.parse(savedState);
        } catch (e) {
            console.error("Error parsing saved canvas state:", e);
            localStorage.removeItem('programBuilderCanvas'); // Clear corrupted state
        }
    }

    canvasDropzone.innerHTML = ''; // Clear existing
    if (dropzonePlaceholder) { // Ensure placeholder exists before trying to use it
        canvasDropzone.appendChild(dropzonePlaceholder);
        dropzonePlaceholder.hidden = true; // Hide it initially
    }

    if (modulesData.length > 0) {
        if (dropzonePlaceholder) dropzonePlaceholder.hidden = true;
        modulesData.forEach(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.html.trim();
            const moduleElement = tempDiv.firstChild;
            if (moduleElement) {
              canvasDropzone.appendChild(moduleElement);
              addCanvasListeners(moduleElement);
            }
        });
    } else {
        // Load empty state - Show placeholder AND add default module
        if (dropzonePlaceholder) dropzonePlaceholder.hidden = false; // Show placeholder
        addDefaultModule(); // *** RESTORED CALL TO ADD DEFAULT ***
    }
    updateProgramStrength();
    syncPaletteVisibility(); // Sync visibility AFTER loading state/adding default
}

// --- Reinstate addDefaultModule function logic ---
function addDefaultModule() {
    // Only add if canvas is truly empty (contains only the placeholder or nothing)
    if (!canvasDropzone || (canvasDropzone.children.length > 1) || 
        (canvasDropzone.children.length === 1 && canvasDropzone.children[0] !== dropzonePlaceholder) ) {
            return; 
    }
    
    const welcomeModule = modulePalette ? modulePalette.querySelector('[data-module-id="welcome"]') : null;
    if (welcomeModule) {
        const clonedWelcome = welcomeModule.cloneNode(true);
        if (dropzonePlaceholder) dropzonePlaceholder.hidden = true; // Hide placeholder
        // Ensure placeholder is removed before adding module if it's the only child
        if (canvasDropzone.children.length === 1 && canvasDropzone.children[0] === dropzonePlaceholder) {
            canvasDropzone.innerHTML = ''; 
        }
        canvasDropzone.appendChild(clonedWelcome);
        addCanvasListeners(clonedWelcome); // Add listeners to default
        // Don't save state here, let loadCanvasState finish and call sync
    }
}

// --- Modified Start Over ---
if (startOverButton && canvasDropzone) {
    startOverButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your program plan?')) {
            canvasDropzone.innerHTML = ''; // Clear canvas visually
            if (dropzonePlaceholder) {
                 canvasDropzone.appendChild(dropzonePlaceholder);
                 dropzonePlaceholder.hidden = false; // Show placeholder again
            } 
            localStorage.removeItem('programBuilderCanvas'); // Clear storage
            updateProgramStrength();
            syncPaletteVisibility(); // Make all palette items visible again
            planSummarySection.style.display = 'none'; // Hide summary if shown
        }
    });
}

// --- Save Button (Implicit via localStorage) ---
// Save happens automatically on drop. Button can provide user feedback.
if (saveButton) {
    saveButton.addEventListener('click', () => {
        // Could add a visual cue like 'Saved!' momentarily
        // alert('Your progress is automatically saved!'); 
        
        const contactSection = document.getElementById('contact-delivery-section');
        if (contactSection) {
            contactSection.style.display = 'block'; // Or 'flex' if it's a flex container
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// --- Captcha Generation ---
function generateCaptcha() {
    if (!captchaQuestionSpan || !captchaNum1Input || !captchaNum2Input) return;
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaQuestionSpan.textContent = `${num1} + ${num2}`;
    captchaNum1Input.value = num1;
    captchaNum2Input.value = num2;
    if (captchaInput) captchaInput.value = ''; // Clear previous answer
}

// --- Form Submission --- 
if (planDetailsForm && generatePlanButton) {
    planDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Validate Form
        const firstName = document.getElementById('first-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const captchaAnswer = parseInt(captchaInput.value, 10);
        const num1 = parseInt(captchaNum1Input.value, 10);
        const num2 = parseInt(captchaNum2Input.value, 10);

        if (!firstName || !email) {
            alert('Please fill in your First Name and Email.');
            return;
        }
        if (isNaN(captchaAnswer) || captchaAnswer !== (num1 + num2)) {
            alert('Incorrect security check answer. Please try again.');
            generateCaptcha(); // Generate a new question
            return;
        }

        // 2. Gather selected modules
        const modulesOnCanvas = canvasDropzone ? canvasDropzone.querySelectorAll('.program-module') : [];
        if (modulesOnCanvas.length === 0) {
            alert('Please add at least one module to your program plan.');
            return;
        }
        const selectedModuleNames = Array.from(modulesOnCanvas).map(m => m.innerText.trim());

        // 3. Populate Summary Section
        if (summaryModulesList) {
            summaryModulesList.innerHTML = selectedModuleNames.map(name => `<li>${name}</li>`).join('');
        }
        if (summaryContactInfo) {
            summaryContactInfo.innerHTML = `
                <strong>Name:</strong> ${firstName}<br>
                <strong>Email:</strong> ${email}
                ${phone ? `<br><strong>Phone:</strong> ${phone}` : ''}
            `;
        }

        // 4. Show Summary Section
        if (planSummarySection) {
            planSummarySection.style.display = 'block';
            planSummarySection.scrollIntoView({ behavior: 'smooth' });
        }

        // 5. Prepare and Open Mailto Link
        const subject = `Program Plan Submission from ${firstName}`;
        const body = `New Program Plan Request:

Selected Modules:
- ${selectedModuleNames.join('\n- ')}

Contact Information:
Name: ${firstName}
Email: ${email}
Phone: ${phone || 'Not provided'}

------
Submitted via Program Builder`;

        const recipient1 = 'rbadiner@rbbmarketing.com';
        const recipient2 = 'theresa@stayvisible.com';
        const mailtoLink = `mailto:${recipient1}?cc=${recipient2}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Give user a moment to see the summary before the mail client opens
        setTimeout(() => {
           // Try to open mailto link
           window.location.href = mailtoLink;
           // Fallback message if mailto doesn't work or is blocked
           alert('Your email client should open shortly. If not, please manually send your plan details. You can also print this summary.');
        }, 500); 

        // Generate a new captcha for potential resubmission
        generateCaptcha(); 
    });
}

// --- Initial Load --- 
loadCanvasState();
generateCaptcha(); 