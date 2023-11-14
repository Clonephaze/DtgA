function handleNavbar() {
    var navbarToggler = document.querySelector(".navbar-toggler");
    var navbarCollapse = document.querySelector(".navbar-collapse");
 
    navbarToggler.addEventListener("click", function (event) {
        event.stopPropagation();
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
 
    document.addEventListener('click', function(event) {
        var isClickInside = navbarCollapse.contains(event.target);
        if (!isClickInside) {
            navbarCollapse.classList.remove('show');
        }
    });
 }
 