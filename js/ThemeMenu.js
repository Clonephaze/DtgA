// Add event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Get the screen width
    var screenWidth = window.innerWidth;

    // Get the color value from local storage, or use the default value
    var colorValue = localStorage.getItem('DtgA-primary') || '133, 255, 225';

    // Set the CSS variable '--DtgA-primary' to the color value
    document.documentElement.style.setProperty('--DtgA-primary', colorValue);

    // Set the width of the color picker based on the screen width
    var width = screenWidth < 992 ? 150 : 200;

    // Create a new color picker instance
    var colorPicker = new iro.ColorPicker("#ThemeWheel", {
        width: width,
        color: "rgb(" + colorValue + ")",
        layout: [
            {
                component: iro.ui.Wheel,
                options: {}
            }
        ]
    });

    // Event listener for when the color is changed
    colorPicker.on("color:change", function (color) {
        var rgb = color.rgb;
        var colorValue = rgb.r + ',' + rgb.g + ',' + rgb.b;

        // Set the CSS variable '--DtgA-primary' to the new color value
        document.documentElement.style.setProperty('--DtgA-primary', colorValue);

        // Store the new color value in local storage
        localStorage.setItem('DtgA-primary', colorValue);
    });

    // Event listener for window resize
    window.addEventListener('resize', function() {
        var screenWidth = window.innerWidth;

        // Update the width of the color picker based on the new screen width
        var width = screenWidth < 992 ? 150 : 200;

        // Update the options of the color picker
        colorPicker.setOptions({
            width: width
        });
    });
});

// Function to toggle theme colors
function toggleThemeColors() {
    const themeDtgA = document.getElementById('ThemeDtgA');
    const themeBlue = document.getElementById('ThemeBlue');
    const themeRed = document.getElementById('ThemeRed');
    const themeGreen = document.getElementById('ThemeGreen');

    // Event listener for themeDtgA
    themeDtgA.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '133, 255, 225');
        var colorValue = '133, 255, 225';
        localStorage.setItem('DtgA-primary', colorValue);
    });

    // Event listener for themeBlue
    themeBlue.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '0, 0, 255');
        var colorValue = '0, 0, 255';
        localStorage.setItem('DtgA-primary', colorValue);
    });

    // Event listener for themeRed
    themeRed.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '255, 0, 0');
        var colorValue = '255, 0, 0';
        localStorage.setItem('DtgA-primary', colorValue);
    });

    // Event listener for themeGreen
    themeGreen.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '0, 255, 0');
        var colorValue = '0, 255, 0';
        localStorage.setItem('DtgA-primary', colorValue);
    });
}

// Call the toggleThemeColors function
toggleThemeColors();