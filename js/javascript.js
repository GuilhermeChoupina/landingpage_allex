const LINKS = {
    treinamentoOnline: "#",
    consultoriaIndividualizada: "#",
    presencial: "#",
    packsExercicios: "#",
    mentoria: "#",
    hotmart: "#",
    whatsapp: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
};

const ATLETAS = [
    {
        nome: "Helena Alves",
        categoria: "Juvenil Competitivo",
        foto: "assets/images/helena_alves.png",
    },
    {
        nome: "Diana Shnaider",
        categoria: "Profissional",
        foto: "assets/images/diana.png",
    },
    {
        nome: "Manuela Banietti",
        categoria: "Juvenil Competitivo",
        foto: "assets/images/manuela_banietti.png",
    },
    {
        nome: "Magda Linette",
        categoria: "Profissional",
        foto: "assets/images/magda.png",
    },
    {
        nome: "Caio Silva",
        categoria: "Amador",
        foto: "assets/images/caio_silva.png",
    },
    {
        nome: "Tiago lopes",
        categoria: "Amador",
        foto: "assets/images/tiago_lopes.png",
    },
];

document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
    initCarrossel();
    initAccordion();
    initScrollReveal();
    initFooterTopBtn();
    initSmoothScroll();
});

function initNavbar() {
    const burgerMenu = document.getElementById("burgerMenu");
    const navMenu = document.getElementById("navMenu");
    const navbar = document.querySelector(".navbar");

    if (!burgerMenu || !navMenu || !navbar) return;

    burgerMenu.addEventListener("click", function () {
        this.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    const navLinks = navMenu.querySelectorAll(".navbar__link");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            burgerMenu.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    document.addEventListener("click", function (event) {
        if (
            !burgerMenu.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {
            burgerMenu.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

function initCarrossel() {
    const carrosselContainer = document.getElementById("carrossel");
    const btnPrev = document.getElementById("carrosselPrev");
    const btnNext = document.getElementById("carrosselNext");

    if (!carrosselContainer || !btnPrev || !btnNext) return;

    renderCarrosselCards();

    btnPrev.addEventListener("click", function () {
        const cardWidth = carrosselContainer.querySelector(".carrossel__card")?.offsetWidth || 280;
        carrosselContainer.scrollBy({
            left: -(cardWidth + 32),
            behavior: "smooth",
        });
    });

    btnNext.addEventListener("click", function () {
        const cardWidth = carrosselContainer.querySelector(".carrossel__card")?.offsetWidth || 280;
        carrosselContainer.scrollBy({
            left: cardWidth + 32,
            behavior: "smooth",
        });
    });
}

function renderCarrosselCards() {
    const carrosselContainer = document.getElementById("carrossel");

    if (!carrosselContainer) return;

    carrosselContainer.innerHTML = "";

    ATLETAS.forEach((atleta) => {
        const card = document.createElement("div");
        card.className = "carrossel__card";

        card.innerHTML = `
            <img src="${atleta.foto}" alt="${atleta.nome}" loading="lazy">
            <div class="carrossel__info">
                <div class="carrossel__name">${atleta.nome}</div>
                <div class="carrossel__categoria">${atleta.categoria}</div>
            </div>
        `;

        carrosselContainer.appendChild(card);
    });
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll(
        "[data-accordion-toggle]"
    );

    if (accordionHeaders.length === 0) return;

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
            const accordionItem = this.closest(".accordion__item");
            const isActive = accordionItem.classList.contains("active");

            closeAllAccordionItems();

            if (!isActive) {
                accordionItem.classList.add("active");
            }
        });
    });
}

function closeAllAccordionItems() {
    const accordionItems = document.querySelectorAll(".accordion__item");
    accordionItems.forEach((item) => {
        item.classList.remove("active");
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(".scroll-reveal");

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = Array.from(revealElements).indexOf(
                        entry.target
                    );
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, delay * 50);

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
        }
    );

    revealElements.forEach((el) => {
        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (href === "#" || href === "") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector(".navbar")?.offsetHeight || 80;
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });
}

function initFooterTopBtn() {
    const topBtn = document.getElementById("footerTopBtn");

    if (!topBtn) return;

    topBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}