function handleTableOfContents() {
    // Get the table of contents element
    const tableOfContents = document.getElementById('tableOfContents');
  
    // Function to update the class based on screen width
    function updateTableOfContentsClass() {
      const screenWidth = window.innerWidth;
  
      if (screenWidth >= 1580) {
        tableOfContents.className = 'list-group position-fixed top-0 end-0';
      } else {
        tableOfContents.className = 'list-group container text-center mx-auto';
      }
    }
  
    // Function to smoothly scroll to the clicked section
    function smoothScrollToSection() {
      document.querySelectorAll('.list-group-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
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
  