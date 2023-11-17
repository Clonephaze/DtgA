document.addEventListener('DOMContentLoaded', (event) => {
    var colorValue = localStorage.getItem('DtgA-primary') || '133, 255, 225';
    document.documentElement.style.setProperty('--DtgA-primary', colorValue);
    var colorPicker = new iro.ColorPicker("#ThemeWheel", {
        width: 200,
        color: "rgb(" + colorValue + ")",
        layout: [
            {
                component: iro.ui.Wheel,
                options: {}
            }
        ]
    });

    colorPicker.on("color:change", function (color) {
        var rgb = color.rgb;
        var colorValue = rgb.r + ',' + rgb.g + ',' + rgb.b;
        document.documentElement.style.setProperty('--DtgA-primary', colorValue);
        localStorage.setItem('DtgA-primary', colorValue);
    });
 }); 
 
    

function toggleThemeColors() {
    const themeDtgA = document.getElementById('ThemeDtgA')
    const themeBlue = document.getElementById('ThemeBlue')
    const themeRed = document.getElementById('ThemeRed')
    const themeGreen = document.getElementById('ThemeGreen')

    themeDtgA.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '133, 255, 225');
        var colorValue = '133, 255, 225';
        localStorage.setItem('DtgA-primary', colorValue);
    })

    themeBlue.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '0, 0, 255');
        var colorValue = '0, 0, 255';
        localStorage.setItem('DtgA-primary', colorValue);
    })

    themeRed.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '255, 0, 0');
        var colorValue = '255, 0, 0';
        localStorage.setItem('DtgA-primary', colorValue);
    })

    themeGreen.addEventListener('click', function () {
        document.documentElement.style.setProperty('--DtgA-primary', '0, 255, 0');
        var colorValue = '0, 255, 0';
        localStorage.setItem('DtgA-primary', colorValue);
    })
}


toggleThemeColors();