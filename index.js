//sticky navigation bar
const navBar = document.querySelector(".navbar");

const stickyNavigation = () => {
    if (rootElement.scrollTop > 100) {
        navBar.classList.add("sticky");
    } else {
        navBar.classList.remove("sticky");
    }
};
document.addEventListener("scroll", stickyNavigation);

//mobile navigation
const navSlide = () => {
    const navMobile = document.querySelector(".nav-mobile");
    const navLinks = document.querySelector(".nav-links");
    const navPoints = document.querySelectorAll(".nav-links li");

    navMobile.addEventListener("click", () => {
        navLinks.classList.toggle("nav-active");
        navPoints.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${
                    index / 6 + 0.4
                }s`;
            }
        });
        navMobile.classList.toggle("closeNav");
    });
    navLinks.addEventListener("click", () => {
        navLinks.classList.toggle("nav-active");
        navPoints.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${
                    index / 6 + 0.4
                }s`;
            }
        });
        navMobile.classList.toggle("closeNav");
    });
};
navSlide();

//scroll up button
const rootElement = document.documentElement;
const scrollUpBtn = document.querySelector(".scrollUpBtn");

const scrollUp = () => {
    if (rootElement.scrollTop > 0.8) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
};

const scrollToTop = () => {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

scrollUpBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", scrollUp);

//typing text animation
class TypeWriter {
    constructor(txtElement, words, wait = 1800) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 130;

        if (this.isDeleting) {
            typeSpeed = typeSpeed / 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 200;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// init on DOM Load
document.addEventListener("DOMContentLoaded", init);

// init App
function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// init2 on DOM Load
document.addEventListener("DOMContentLoaded", init2);

// init2 App
function init2() {
    const txtElement = document.querySelector(".txt-type2");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init2 TypeWriter
    new TypeWriter(txtElement, words, wait);
}
