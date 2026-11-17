// Active nav link on scroll
const nav_links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            nav_links.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-40% 0px -55% 0px"
});

sections.forEach(section => observer.observe(section));


// Mobile menu toggle
let menu_btn = document.getElementById('btn-menu');
let menu = document.querySelector('nav ul');

menu_btn.onclick = function(){
    menu_btn.classList.toggle('fa-times');
    menu.classList.toggle('active');
}



// Close mobile menu on scroll

window.onscroll = function(){
    menu_btn.classList.remove('fa-times')
    menu.classList.remove('active')
}



// Demo form submit
const form = document.querySelector("form");
form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! This is a demo form.");
    e.target.reset();
});