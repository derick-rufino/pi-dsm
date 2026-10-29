/**
 * Kampi · index.js
 * Comportamentos e interações da página inicial (home).
 * Sem dependências externas.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMenuMobile();
    initBannerCarousel();
});

/* ==========================================================================
   1. MENU MOBILE
   ========================================================================== */
function initMenuMobile() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuClose = document.querySelector('.menu__close');

    if (!menuToggle || !menu) return;

    function toggleMenu(abrir) {
        if (abrir) {
            menu.setAttribute('data-open', '');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            menu.removeAttribute('data-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    menuToggle.addEventListener('click', () => {
        const estaAberto = menu.hasAttribute('data-open');
        toggleMenu(!estaAberto);
    });

    menuClose?.addEventListener('click', () => {
        toggleMenu(false);
        menuToggle.focus();
    });

    // Fecha o menu ao pressionar a tecla Escape
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menu.hasAttribute('data-open')) {
            toggleMenu(false);
            menuToggle.focus();
        }
    });

    // Fecha ao clicar em qualquer link interno do menu
    menu.querySelectorAll('.menu__link').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

/* ==========================================================================
   2. BANNER CARROSSEL (LOOP INFINITO SEMPRE PARA FRENTE & PROGRESS BAR)
   ========================================================================== */
function initBannerCarousel() {
    const banner = document.querySelector('.banner');
    if (!banner) return;

    const slidesContainer = banner.querySelector('.banner__slides');
    if (!slidesContainer) return;

    const originalSlides = Array.from(slidesContainer.children);
    const dots = Array.from(banner.querySelectorAll('.banner__dot'));
    const total = originalSlides.length;
    if (total === 0) return;

    const duracaoSlide = 5000; // 5 segundos por slide
    banner.style.setProperty('--slide-duration', `${duracaoSlide}ms`);

    // Clones para permitir transição contínua sem quebras:
    // Clone do último slide antes do início (para navegação prev suave)
    // Clones dos dois primeiros ao final (garantem visualização completa + peek do próximo card)
    const cloneUltimo = originalSlides[total - 1].cloneNode(true);
    cloneUltimo.setAttribute('aria-hidden', 'true');
    cloneUltimo.removeAttribute('data-active');

    const clonePrimeiro = originalSlides[0].cloneNode(true);
    clonePrimeiro.setAttribute('aria-hidden', 'true');
    clonePrimeiro.removeAttribute('data-active');

    const cloneSegundo = originalSlides[1].cloneNode(true);
    cloneSegundo.setAttribute('aria-hidden', 'true');
    cloneSegundo.removeAttribute('data-active');

    slidesContainer.insertBefore(cloneUltimo, slidesContainer.firstChild);
    slidesContainer.appendChild(clonePrimeiro);
    slidesContainer.appendChild(cloneSegundo);

    // O slide 1 original fica no índice DOM 1
    let indiceAtual = 1;
    let ultimoIndiceReal = -1;
    let emTransicao = false;
    let timerAutoplay = null;
    let tempoInicio = null;
    let tempoRestante = duracaoSlide;
    let estaPausado = false;

    // Define o estado ativo (opacity: 1 no ativo; opacity: 0.45 no posterior/demais)
    function atualizarEstados(forcarReiniciarProgresso = false) {
        const todosSlides = Array.from(slidesContainer.children);

        // Define quais slides estão no estado ativo
        // Sincroniza os clones para que o slide e seu clone tenham a mesma opacidade
        todosSlides.forEach((slide, idx) => {
            let ativo = false;

            if (idx === indiceAtual) {
                ativo = true;
            } else if (indiceAtual === total + 1 && idx === 1) {
                // Durante a transição para o clone do slide 1, mantém o slide 1 original também com opacidade 1
                ativo = true;
            } else if (indiceAtual === 0 && idx === total) {
                // Durante a transição para o clone do último slide, mantém o último slide original também ativo
                ativo = true;
            }

            if (ativo) {
                slide.setAttribute('data-active', 'true');
            } else {
                slide.removeAttribute('data-active');
            }
        });

        // Índice real de 0 a (total - 1)
        const indiceReal = (indiceAtual - 1 + total) % total;
        const mudouSlideReal = (indiceReal !== ultimoIndiceReal);

        // Só reinicia o progresso da barra do dot se o slide real realmente mudou ou foi forçado
        if (mudouSlideReal || forcarReiniciarProgresso) {
            ultimoIndiceReal = indiceReal;
            dots.forEach((dot, i) => {
                if (i === indiceReal) {
                    dot.removeAttribute('aria-current');
                    void dot.offsetWidth; // Força reflow para reiniciar a animação CSS
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.setAttribute('aria-current', 'false');
                }
            });
        }
    }

    function irParaSlide(indice, animar = true, forcarReiniciarProgresso = false) {
        indiceAtual = indice;
        if (!animar) {
            slidesContainer.classList.add('banner__slides--no-transition');
        } else {
            slidesContainer.classList.remove('banner__slides--no-transition');
        }
        banner.style.setProperty('--slide-index', indiceAtual);
        atualizarEstados(forcarReiniciarProgresso);
    }

    function avancar() {
        if (emTransicao) return;
        emTransicao = true;
        tempoRestante = duracaoSlide;
        irParaSlide(indiceAtual + 1, true, true);
        reiniciarAutoplay();
    }

    function retroceder() {
        if (emTransicao) return;
        emTransicao = true;
        tempoRestante = duracaoSlide;
        irParaSlide(indiceAtual - 1, true, true);
        reiniciarAutoplay();
    }

    // Ao terminar o movimento, se chegou em clone, reposiciona sem animação
    slidesContainer.addEventListener('transitionend', (e) => {
        if (e.target !== slidesContainer) return;
        emTransicao = false;

        // Se ultrapassou o último original (chegou no clone do primeiro)
        if (indiceAtual >= total + 1) {
            irParaSlide(1, false, false);
            void slidesContainer.offsetWidth; // Força reflow
            slidesContainer.classList.remove('banner__slides--no-transition');
        }
        // Se retrocedeu antes do primeiro original (chegou no clone do último)
        else if (indiceAtual <= 0) {
            irParaSlide(total, false, false);
            void slidesContainer.offsetWidth;
            slidesContainer.classList.remove('banner__slides--no-transition');
        }
    });

    // Se o usuário clicar no card posterior (fade-out) que está espiando à direita, navega para ele
    slidesContainer.addEventListener('click', (e) => {
        const slideClicado = e.target.closest('.slide');
        if (!slideClicado || emTransicao) return;

        // Se clicou no card posterior (que não é o ativo)
        if (slideClicado.getAttribute('data-active') !== 'true') {
            const todosSlides = Array.from(slidesContainer.children);
            const idxClicado = todosSlides.indexOf(slideClicado);
            if (idxClicado > indiceAtual) {
                e.preventDefault();
                avancar();
            } else if (idxClicado < indiceAtual) {
                e.preventDefault();
                retroceder();
            }
        }
    });

    // Controles Próximo e Anterior
    banner.querySelector('[data-banner="next"]')?.addEventListener('click', () => {
        avancar();
    });

    banner.querySelector('[data-banner="prev"]')?.addEventListener('click', () => {
        retroceder();
    });

    // Indicadores (dots)
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            if (emTransicao) return;
            const destino = Number(dot.dataset.slide);
            tempoRestante = duracaoSlide;
            irParaSlide(destino + 1, true, true);
            reiniciarAutoplay();
        });
    });

    // Gerenciamento de tempo e pausa inteligente (hover e visibilidade de aba)
    function iniciarCiclo(tempo = duracaoSlide) {
        pararCiclo();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        tempoInicio = performance.now();
        tempoRestante = tempo;

        timerAutoplay = setTimeout(() => {
            avancar();
        }, tempo);
    }

    function pararCiclo() {
        if (timerAutoplay) {
            clearTimeout(timerAutoplay);
            timerAutoplay = null;
        }
    }

    function pausar() {
        if (estaPausado) return;
        estaPausado = true;
        if (tempoInicio !== null) {
            const decorrido = performance.now() - tempoInicio;
            tempoRestante = Math.max(200, tempoRestante - decorrido);
        }
        pararCiclo();
    }

    function despausar() {
        if (!estaPausado) return;
        estaPausado = false;
        iniciarCiclo(tempoRestante);
    }

    function reiniciarAutoplay() {
        estaPausado = false;
        iniciarCiclo(duracaoSlide);
    }

    // Pausa no hover do banner
    banner.addEventListener('mouseenter', pausar);
    banner.addEventListener('mouseleave', despausar);

    // Pausa quando a aba perde o foco e retoma quando visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pausar();
        } else {
            despausar();
        }
    });

    // Inicialização
    irParaSlide(1, false, true);
    reiniciarAutoplay();
}
