
function changeThemeColor(color) {
    document.documentElement.style.setProperty('--theme-color', color);
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
}

function changeFontSize() {
    const sizes = ['12px', '14px', '16px', '18px', '20px'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    document.body.style.fontSize = randomSize;
}

function toggleTheme() {
    const currentBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
    if (currentBackgroundColor === '#121212') {
        document.documentElement.style.setProperty('--background-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--sidebar-background-color', '#f8f9fa');
        document.documentElement.style.setProperty('--main-content-background-color', '#f8f9fa');
        document.documentElement.style.setProperty('--badge-text-color', '#ffffff');
    } else {
        document.documentElement.style.setProperty('--background-color', '#121212');
        document.documentElement.style.setProperty('--text-color', '#e0e0e0');
        document.documentElement.style.setProperty('--sidebar-background-color', '#1e1e1e');
        document.documentElement.style.setProperty('--main-content-background-color', '#1e1e1e');
        document.documentElement.style.setProperty('--badge-text-color', '#121212');
    }
}

function toggleNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    navbarCollapse.classList.toggle('show');
}