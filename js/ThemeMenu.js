function handleThemeMenu() {
    // Get the table of contents element
    const themeMenu = document.getElementById('ThemeMenuButton');
    const themeMenuContent = document.getElementById('ThemeMenuContent');

        // Function to update the class based on screen width
        function updateThemeMenuClass() {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1580) {
                themeMenu.className = 'btn las la-swatchbook Theme-Menu-Btn ThemeMenu-Button-Desktop';
            } else {
                themeMenu.className = 'btn las la-swatchbook Theme-Menu-Btn ThemeMenu-Mobile';
            }
        }

        // Add a click event listener to the themeMenu button
        themeMenu.addEventListener('click', function (event) {
            event.stopPropagation();
            var menu = document.getElementById('ThemeMenu');
            menu.classList.add('show');
        });

        // Add a click event listener to the document
        document.documentElement.addEventListener('click', function (event) {
            if (event.target != themeMenuContent) {
                var menu = document.getElementById('ThemeMenu');
                menu.classList.remove('show');
            }
        });

        window.addEventListener('load', function () {
            updateThemeMenuClass();
        });

        window.addEventListener('resize', updateThemeMenuClass);
}

function toggleThemeColors() {
    const themeDtgA = document.getElementById('ThemeDtgA')
    const themeBlue = document.getElementById('ThemeBlue')
    const themeRed = document.getElementById('ThemeRed')
    const themeGreen = document.getElementById('ThemeGreen')
    const themeYellow = document.getElementById('ThemeYellow')
    const themePurple = document.getElementById('ThemePurple')
    const themeOrange = document.getElementById('ThemeOrange')

    themeDtgA.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '133, 255, 225');
    })

    themeBlue.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '0, 0, 255');
    })
    
    themeRed.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '255, 0, 0');
    })
    
    themeGreen.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '0, 255, 0');
    })

    themeYellow.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '255, 255, 0');
    })

    themePurple.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '255, 0, 255');
    })

    themeOrange.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '255, 128, 0');
    })
}

handleThemeMenu();

toggleThemeColors();