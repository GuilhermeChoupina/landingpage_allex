// Header background on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Placeholder Hotmart links — replace the URLs below with the real
// Hotmart checkout links for each package before publishing.
const hotmartLinks = {
    "1": "#",
    "2": "#",
    "3": "#"
};
document.querySelectorAll('[data-hotmart-link]').forEach(btn => {
    const key = btn.getAttribute('data-hotmart-link');
    if (hotmartLinks[key] && hotmartLinks[key] !== "#") {
        btn.setAttribute('href', hotmartLinks[key]);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener');
    }
});