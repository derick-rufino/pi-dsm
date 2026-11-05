/**
 * Kampi · menu.js
 * Menu mobile compartilhado por todas as páginas.
 * Uso: <script src="menu.js" defer></script> (nas pastas: ../menu.js)
 */

document.addEventListener('DOMContentLoaded', initMenuMobile);

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
