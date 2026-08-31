/* ================================================= */
/* JavaScript - GA PERFORMANCE Landing Page (v2)   */
/* ================================================= */

/* ================================================= */
/* VARIÁVEIS GLOBAIS                                */
/* ================================================= */

// TODO: Substituir pelos links reais do Hotmart
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

// Dados de atletas para o carrossel
// TODO: Substituir com dados reais e fotos verdadeiras
const ATLETAS = [
    {
        nome: "João Silva",
        categoria: "Juvenil Competitivo",
        foto: "assets/images/atleta-01.jpg",
    },
    {
        nome: "Marina Costa",
        categoria: "Profissional",
        foto: "assets/images/atleta-02.jpg",
    },
    {
        nome: "Lucas Santos",
        categoria: "Juvenil Competitivo",
        foto: "assets/images/atleta-03.jpg",
    },
    {
        nome: "Beatriz Oliveira",
        categoria: "Profissional",
        foto: "assets/images/atleta-04.jpg",
    },
    {
        nome: "Rafael Mendes",
        categoria: "Amador",
        foto: "assets/images/atleta-05.jpg",
    },
];

/* ================================================= */
/* INICIALIZAÇÃO                                     */
/* ================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
    initCarrossel();
    initAccordion();
    initScrollReveal();
    initFooterTopBtn();
});

/* ================================================= */
/* NAVBAR - HAMBURGER MENU MOBILE                   */
/* ================================================= */

function initNavbar() {
    const burgerMenu = document.getElementById("burgerMenu");
    const navMenu = document.getElementById("navMenu");
    const navbar = document.querySelector(".navbar");
    
    if (!burgerMenu || !navMenu || !navbar) return;
    
    // Toggle menu hamburger
    burgerMenu.addEventListener("click", function () {
        this.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll(".navbar__link");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            burgerMenu.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener("click", function (event) {
        if (
            !burgerMenu.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {
            burgerMenu.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
    
    // Adicionar classe 'scrolled' ao navbar ao fazer scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

/* ================================================= */
/* CARROSSEL DE ATLETAS                             */
/* ================================================= */

function initCarrossel() {
    const carrosselContainer = document.getElementById("carrossel");
    const btnPrev = document.getElementById("carrosselPrev");
    const btnNext = document.getElementById("carrosselNext");
    
    if (!carrosselContainer || !btnPrev || !btnNext) return;
    
    // Renderizar cards
    renderCarrosselCards();
    
    // Scroll amount (largura do card + gap)
    const scrollAmount = 300;
    
    btnPrev.addEventListener("click", function () {
        carrosselContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    });
    
    btnNext.addEventListener("click", function () {
        carrosselContainer.scrollBy({
            left: scrollAmount,
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

/* ================================================= */
/* ACCORDION - FAQ                                   */
/* ================================================= */

function initAccordion() {
    const accordionHeaders = document.querySelectorAll(
        "[data-accordion-toggle]"
    );
    
    if (accordionHeaders.length === 0) return;
    
    accordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
            const accordionItem = this.closest(".accordion__item");
            const isActive = accordionItem.classList.contains("active");
            
            // Fechar outros items
            closeAllAccordionItems();
            
            // Toggle current
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

/* ================================================= */
/* SCROLL REVEAL - ANIMAÇÕES AO SCROLL              */
/* ================================================= */

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

/* ================================================= */
/* SMOOTH SCROLL PARA LINKS INTERNOS                */
/* ================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        
        if (href === "#" || href === "") return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

/* ================================================= */
/* BOTÃO VOLTAR AO TOPO                             */
/* ================================================= */

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

/* ================================================= */
/* LOG DE INICIALIZAÇÃO                             */
/* ================================================= */

console.log("GA Performance Landing Page (v2 Editorial) - Script iniciado");
console.log("Links configurados:", LINKS);
console.log("Atletas carregados:", ATLETAS.length);

/* ================================================= */
/* GUIA DE PERSONALIZAÇÃO                           */
/* ================================================= */

/*
 * SUBSTITUIÇÕES NECESSÁRIAS:
 * 
 * 1. LINKS DO HOTMART:
 *    - Edite o objeto LINKS no topo
 *    - Exemplo: treinamentoOnline: "https://hotmart.com/seu-link"
 * 
 * 2. DADOS DE ATLETAS:
 *    - Edite o array ATLETAS com nomes e caminhos de fotos reais
 *    - As fotos devem estar em: assets/images/atleta-01.jpg, etc
 * 
 * 3. IMAGENS (HTML):
 *    - Procure por "assets/images/" no index.html
 *    - Substitua pelos nomes reais dos arquivos
 *    - Remova os comentários <!-- TODO: --> após confirmar
 * 
 * 4. RESPONSIVIDADE:
 *    - Testar em mobile, tablet e desktop
 *    - Ajustar grid-columns se necessário
 *    - CSS usa clamp() para tipografia fluida
 * 
 * 5. PERFORMANCE:
 *    - Comprimir imagens em P&B
 *    - Considerar webp para imagens
 *    - Usar CDN para hosting
 */
