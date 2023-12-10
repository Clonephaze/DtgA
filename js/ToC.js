/**Handles the table of contents functionality.**/
function handleTableOfContents() {
  // Get the table of contents element
  const tableOfContents = document.getElementById('tableOfContents');
  const navbar = document.getElementById('DtgA-navbar');
  const navbarHeight = navbar.offsetHeight;

  /**
   * Updates the class of the table of contents based on screen width.
   */
  function updateTableOfContentsClass() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1580) {
      tableOfContents.className = 'list-group position-fixed top-5 start-0';
    } else {
      tableOfContents.className = 'list-group container text-center mx-auto';
    }
  }

  /**
   * Scrolls smoothly to the clicked section.
   */
  function smoothScrollToSection() {
    document.querySelectorAll('.TOC-item').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        let additionalSpace;
        if (window.innerWidth < 991) {
          additionalSpace = 15;
        } else {
          additionalSpace = 5;
        }
        const top = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight - additionalSpace;
        window.scrollTo({top: top, behavior: 'smooth'});
      });
    });
  }

  // Call the functions on page load and whenever the window is resized
  window.addEventListener('load', function() {
    updateTableOfContentsClass();
    smoothScrollToSection();
  });

  window.addEventListener('resize', updateTableOfContentsClass);
}
  
  // Call the function
  handleTableOfContents();