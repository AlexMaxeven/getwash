
// - Scroll to block - - -

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset- document.querySelector('header').offsetHeight;
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }
            window.scrollTo({
                top:gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

// menu - - - 

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
    
}

// slick-carousel (slider)

import $ from "jquery";
import "slick-carousel";

$(".review__inner").slick({
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
});

// dark theme - - - 

window.addEventListener("load", windowLoad);

function windowLoad() {
    const htmlBlock = document.documentElement;
    const saveUserTheme = localStorage.getItem('user-theme');

    let userTheme;
    if (window.matchMedia) {
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        !saveUserTheme ? changeTheme() : null;
    });

    const themeButton = document.querySelector('.page__theme');
    const resetButton = document.querySelector('.page__reset');
    if (themeButton) {
        themeButton.addEventListener("click", function (e) {
            resetButton.classList.add('active');
            changeTheme(true);
        });
    }
    if (resetButton) {
        resetButton.addEventListener("click", function (e) {
            resetButton.classList.remove('active');
            localStorage.setItem('user-theme', '');
        });
    }

    function setThemeClass() {
        if (saveUserTheme) {
            htmlBlock.classList.add(saveUserTheme)
            resetButton.classList.add('active');
        } else {
            htmlBlock.classList.add(userTheme);
        }
    }

    setThemeClass();

    function changeTheme(saveUserTheme = false) {
        let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
        let newTheme;

        if (currentTheme === 'light') {
            newTheme = 'dark';
        } else if (currentTheme === 'dark') {
            newTheme = 'light';
        }
        htmlBlock.classList.remove(currentTheme);
        htmlBlock.classList.add(newTheme);
        saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
    }
    
}