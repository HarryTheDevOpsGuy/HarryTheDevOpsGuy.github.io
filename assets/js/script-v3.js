
function changeThemeColor(color) {
    document.documentElement.style.setProperty('--theme-color', color);
    localStorage.setItem('themeColor', color);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeToRandomColor() {
    const randomColor = getRandomColor();
    changeThemeColor(randomColor);
}

function changeFontStyle() {
    const fonts = ['Roboto', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana'];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    document.body.style.fontFamily = randomFont;
    localStorage.setItem('fontStyle', randomFont);
}

function changeFontSize() {
    const sizes = ['12px', '14px', '16px', '18px', '20px'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    document.body.style.fontSize = randomSize;
    localStorage.setItem('fontSize', randomSize);
}

// Theme toggle script
function switchTheme() {
    const currentTheme = $('html').attr('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    $('html').attr('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}


function applyStoredSettings() {
    const themeColor = localStorage.getItem('themeColor');
    if (themeColor) {
        document.documentElement.style.setProperty('--theme-color', themeColor);
    }

    const fontStyle = localStorage.getItem('fontStyle');
    if (fontStyle) {
        document.body.style.fontFamily = fontStyle;
    }

    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        document.body.style.fontSize = fontSize;
    }

    const theme = localStorage.getItem('theme');
    $('html').attr('data-theme', theme);
}

document.addEventListener('DOMContentLoaded', applyStoredSettings);