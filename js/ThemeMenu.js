document.addEventListener('DOMContentLoaded', (event) => {
    var colorPicker = new iro.ColorPicker("#ThemeWheel", {
        width: 200,
        color: "rgb(133, 255, 225)",
        layout: [
            {
                component: iro.ui.Wheel,
                options: {}
            }
        ]
    });

    colorPicker.on("color:change", function (color) {
        var rgb = color.rgb;
        document.documentElement.style.setProperty('--DtgA-primary', rgb.r + ',' + rgb.g + ',' + rgb.b);
    });
});

function toggleThemeColors() {
    const themeDtgA = document.getElementById('ThemeDtgA')
    const themeBlue = document.getElementById('ThemeBlue')
    const themeRed = document.getElementById('ThemeRed')
    const themeGreen = document.getElementById('ThemeGreen')
    const themeYellow = document.getElementById('ThemeYellow')
    const themePurple = document.getElementById('ThemePurple')
    const themeOrange = document.getElementById('ThemeOrange')
    const themeIndigo = document.getElementById('ThemeIndigo')

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

    themeIndigo.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '75, 0, 130');
    })
}


toggleThemeColors();