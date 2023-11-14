var dropdownElement = document.querySelector('.dropdown');
var dropdown = new bootstrap.Dropdown(dropdownElement);

dropdownElement.addEventListener('mouseenter', function () {
 dropdown.show();
});

dropdownElement.addEventListener('mouseleave', function () {
 dropdown.hide();
});

// Add click event listener to dropdown items
var dropdownItems = dropdownElement.querySelectorAll('.dropdown-item');
dropdownItems.forEach(function (item) {
 item.addEventListener('click', function (event) {
  // Prevent the default action
  event.preventDefault();

  // Check if the dropdown menu is open
  if (dropdown._popper) {
    // Navigate to the link
    window.location.href = event.target.href;
  }
 });
});
