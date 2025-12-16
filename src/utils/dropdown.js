// src/utils/dropdown.js
export function initDropdowns() {
  const dropdownButtons = document.querySelectorAll('.dropdown-btn');

  dropdownButtons.forEach(btn => {
    const menu = btn.nextElementSibling;

    // Avoid adding multiple listeners if already initialized
    if (!btn.dataset.dropdownInit) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(m => {
          if (m !== menu) m.classList.remove('active');
        });
        // Toggle the clicked dropdown
        menu.classList.toggle('active');
      });
      btn.dataset.dropdownInit = "true"; // mark as initialized
    }
  });

  // Only add one global listener
  if (!document.body.dataset.dropdownOutsideInit) {
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
      });
    });
    document.body.dataset.dropdownOutsideInit = "true";
  }
}