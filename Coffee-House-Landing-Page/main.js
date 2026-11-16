const nav_links = document.querySelectorAll(".nav_links a");
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





let nav_btn = document.getElementById('nav-btn');
let nav = document.querySelector('.nav_links');



nav_btn.onclick = function(){
    nav_btn.classList.toggle('fa-times');
    nav.classList.toggle('active');
}

window.onscroll = function(){
    nav_btn.classList.remove('fa-times');
    nav.classList.remove('active');
}




document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your table has been booked.");
    e.target.reset();
});