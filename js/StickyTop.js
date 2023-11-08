// Get all the h2 elements with the sticky-top class
const h2Elements = document.querySelectorAll('.sticky-top');

// Function to handle scrolling
function handleScroll() {
  const scrollPosition = window.scrollY;

  // Loop through each h2 element
  h2Elements.forEach((h2) => {
    const h2Position = h2.offsetTop;

    // Check if the h2 element is at the top of the viewport
    if (scrollPosition >= h2Position) {
      // Add a class to the h2 element to make it sticky
      h2.classList.add('position-sticky');
      h2.style.top = '0';
    } else {
      // Remove the sticky class from the h2 element
      h2.classList.remove('position-sticky');
      h2.style.top = '';
    }
  });
}

// Call the handleScroll function on page load and whenever the window is scrolled
window.addEventListener('load', handleScroll);
window.addEventListener('scroll', handleScroll);
