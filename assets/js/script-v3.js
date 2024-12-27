
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


// function toggleTheme() {
//     const currentBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
//     if (currentBackgroundColor === '#000') {
//         websiteTheme('light');
//         localStorage.setItem('theme', 'light');
//     } else {
//         websiteTheme('dark');
//         localStorage.setItem('theme', 'dark');
//     }
// }


// function websiteTheme(theme) {
//     if (theme === 'light') {
//         document.documentElement.style.setProperty('--background-color', '#ffffff');
//         document.documentElement.style.setProperty('--text-color', '#000000');
//         document.documentElement.style.setProperty('--sidebar-background-color', '#f8f9fa');
//         document.documentElement.style.setProperty('--main-content-background-color', '#f8f9fa');
//         document.documentElement.style.setProperty('--badge-text-color', '#ffffff'); 
//         document.documentElement.style.setProperty('--resume-body-background-color', '#ffffff');
//     } else {
//         document.documentElement.style.setProperty('--background-color', '#000');
//         document.documentElement.style.setProperty('--text-color', '#e0e0e0');
//         document.documentElement.style.setProperty('--sidebar-background-color', '#1e1e1e');
//         document.documentElement.style.setProperty('--main-content-background-color', '#1e1e1e');
//         document.documentElement.style.setProperty('--badge-text-color', '#121212');
//         document.documentElement.style.setProperty('--resume-body-background-color', '#1c2d34');

//     }
// }


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
    // websiteTheme(theme);
    $('html').attr('data-theme', theme);
}

document.addEventListener('DOMContentLoaded', applyStoredSettings);