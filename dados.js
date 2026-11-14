/**
 * Kampi · dados.js
 * Lê os JSON de /dados e monta no HTML: banner da home e listagens.
 *
 * Como funciona:
 * - Home: troca os slides de exemplo do banner pelos de dados/banner.json.
 *   O index.js espera kampiDados.banner antes de ligar o carrossel.
 * - Listagens: qualquer <ul data-dados="cena"> ou <ul data-dados="comer">
 *   recebe os cards do JSON com o mesmo nome. Sem o atributo, nada muda.
 *   O item com "destaque": true preenche o <article class="feature"> da seção.
 * - Instagram: o post só carrega quando a pessoa clica em "ver post".
 *
 * Se o JSON não carregar (sem servidor local, arquivo aberto direto do disco,
 * sem internet), a página fica com o HTML que já existe.
 * Regra do projeto: HTML só com createElement e textContent (o CI bloqueia o resto).
 */
(function () {
    'use strict';

    // Caminho da raiz do site, calculado a partir deste arquivo
    const raiz = new URL('.', document.currentScript.src);
    const cache = {};

    function carregar(nome) {
        if (!cache[nome]) {
            cache[nome] = fetch(new URL('dados/' + nome + '.json', raiz))
                .then((r) => (r.ok ? r.json() : null))
                .catch(() => null);
        }
        return cache[nome];
    }

    // Cria um elemento com classes, atributos e filhos (texto ou nós)
    function el(tag, opcoes, filhos) {
        const no = document.createElement(tag);
        const o = opcoes || {};
        if (o.classe) no.className = o.classe;
        if (o.texto != null) no.textContent = o.texto;
        if (o.attrs) {
            Object.entries(o.attrs).forEach(([k, v]) => {
                if (v != null) no.setAttribute(k, v);
            });
        }
        (filhos || []).forEach((f) => {
            if (f == null) return;
            no.append(typeof f === 'string' ? document.createTextNode(f) : f);
        });
        return no;
    }

    function setaSvg() {
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const p = document.createElementNS(ns, 'path');
        p.setAttribute('d', 'M5 12h14M13 6l6 6-6 6');
        svg.append(p);
        return svg;
    }

    const MESES = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    function dataCurta(iso) {
        const [a, m, d] = iso.split('-').map(Number);
        return d + ' ' + MESES[m - 1] + ' ' + a;
    }

    // Preço inteiro sem centavos (R$ 15); quebrado com centavos (R$ 18,90)
    const brl0 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    const brl2 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
    const moeda = (v) => (Number.isInteger(v) ? brl0 : brl2).format(v);
    function faixaPreco(min, max) {
        if (min == null) return 'a confirmar';
        if (min === 0 && (max === 0 || max == null)) return 'Grátis';
        if (min === 0) return 'até ' + moeda(max);
        if (min === max || max == null) return moeda(min);
        return moeda(min) + '–' + moeda(max).replace('R$', '').trim();
    }

    const UNIDADE = { entrada: '/ entrada', refeicao: '/ refeição' };

    // Link para fora: abre em nova aba e avisa o leitor de tela
    function linkExterno(texto, href, opcoes) {
        const o = opcoes || {};
        return el('a', {
            classe: o.classe,
            attrs: { href: href, target: '_blank', rel: o.rel || 'noopener' }
        }, [texto, el('span', { classe: 'sr-only', texto: ' (abre em nova aba)' })]);
    }

    /* ---------- imagens ---------- */

    async function catalogoImagens() {
        const dados = await carregar('imagens');
        const mapa = {};
        (dados && dados.itens ? dados.itens : []).forEach((i) => { mapa[i.id] = i; });
        return mapa;
    }

    // Foto com licença aberta (dados/imagens.json) ou imagem local opcional.
    // decorativa: foto genérica da cidade, não do lugar; o leitor de tela pula.
    // lazy: false para fotos do banner (o carrossel move os slides, o lazy
    // do navegador às vezes não carrega a tempo)
    function imagem(item, catalogo, classe, opcoes) {
        const o = opcoes || {};
        const reg = item.imagem && catalogo[item.imagem];
        const src = reg ? reg.arquivo : item.imagem_local;
        if (!src) return null;
        const img = el('img', {
            classe: classe,
            attrs: {
                src: new URL(src, raiz).href,
                alt: !o.decorativa && reg ? reg.alt || '' : '',
                loading: o.lazy === false ? 'eager' : 'lazy',
                decoding: o.lazy === false ? 'auto' : 'async'
            }
        });
        // Imagem local é opcional: se o arquivo não existe, some sem quebrar o card
        img.addEventListener('error', () => img.remove());
        // Só entra nos créditos a foto que de fato apareceu
        // (escondida por CSS, como no tablet e no celular, não conta)
        if (reg) img.addEventListener('load', () => { if (img.getClientRects().length) registrarCredito(reg); });
        return img;
    }

    /* ---------- créditos das fotos (rodapé) ----------
       CC BY e CC BY-SA pedem crédito "de maneira razoável": em vez de
       etiqueta em cima de cada foto, uma linha só no rodapé, no mesmo
       estilo de "feito em Marília", com autor e licença de cada foto da página. */

    const creditos = new Map();
    let linhaCreditos = null;

    function registrarCredito(reg) {
        if (reg.licenca === 'CC0') return;
        const chave = reg.autor + '|' + reg.licenca;
        if (creditos.has(chave)) return;
        creditos.set(chave, reg);

        const marca = document.querySelector('.footer__brand');
        if (!marca) return;
        if (!linhaCreditos) {
            linhaCreditos = el('p', { classe: 'footer__credit footer__photos' });
            marca.append(linhaCreditos);
        }
        const partes = ['fotos: '];
        [...creditos.values()].forEach((r, i) => {
            if (i) partes.push(' · ');
            partes.push(r.autor + ' (', linkExterno(r.licenca, r.licenca_url, { rel: 'license noopener' }), ')');
        });
        linhaCreditos.replaceChildren(...partes.map((p) => (typeof p === 'string' ? document.createTextNode(p) : p)));
    }

    /* ---------- Instagram (carrega só no clique) ---------- */

    let scriptInstagram = null;
    function processarInstagram() {
        if (window.instgrm && window.instgrm.Embeds) {
            window.instgrm.Embeds.process();
            return;
        }
        if (!scriptInstagram) {
            scriptInstagram = el('script', { attrs: { src: 'https://www.instagram.com/embed.js', async: '' } });
            scriptInstagram.addEventListener('load', () => window.instgrm && window.instgrm.Embeds.process());
            document.body.append(scriptInstagram);
        }
    }

    function blocoInstagram(item) {
        if (item.instagram_post) {
            const botao = el('button', {
                classe: 'pill pill--md social-btn',
                texto: 'ver post no Instagram',
                attrs: { type: 'button' }
            });
            botao.addEventListener('click', () => {
                const quadro = el('div', {
                    classe: 'embed-ig',
                    attrs: { tabindex: '-1', role: 'region', 'aria-label': 'post do Instagram: ' + item.nome }
                }, [
                    el('blockquote', {
                        classe: 'instagram-media',
                        attrs: { 'data-instgrm-permalink': item.instagram_post, 'data-instgrm-version': '14' }
                    }, [linkExterno('abrir o post no Instagram', item.instagram_post)])
                ]);
                botao.replaceWith(quadro);
                // O botão sumiu: o foco vai para o post, não para o topo da página
                quadro.focus();
                processarInstagram();
            });
            return botao;
        }
        if (item.instagram) {
            return linkExterno('perfil no Instagram', item.instagram, { classe: 'pill pill--md social-btn' });
        }
        return null;
    }

    /* ---------- banner da home ---------- */

    let bannerLiberado = true;

    // Como no Figma: a foto fica recortada dentro do burst, à direita.
    // A data vai numa pill ao lado do rótulo (lida pelo leitor de tela e
    // visível no celular), em vez do selo por cima da foto.
    function slide(item, catalogo) {
        const media = imagem(item, catalogo, 'slide__media', { decorativa: true, lazy: false });
        const li = el('li', { classe: 'slide slide--' + (item.variante || 'scene') + (media ? ' slide--photo' : '') });

        li.append(el('div', { classe: 'slide__body' }, [
            el('div', { classe: 'slide__tags' }, [
                el('span', { classe: 'pill pill--ink', texto: item.rotulo }),
                item.selo ? el('span', { classe: 'pill pill--ink', texto: item.selo.join(' · ') }) : null
            ]),
            el('h3', { classe: 'slide__title', texto: item.titulo }),
            el('p', { classe: 'slide__text', texto: item.texto })
        ]));

        const cta = el('a', { classe: 'pill pill--ink cta', attrs: { href: new URL(item.link.href, raiz).href } }, [
            item.link.texto + ' ',
            el('span', { classe: 'round-btn', attrs: { 'aria-hidden': 'true' } }, [setaSvg()])
        ]);
        li.append(cta);
        li.append(el('span', { classe: 'burst', attrs: { 'aria-hidden': 'true' } }, [media]));
        // Sem a foto, o burst volta a ser liso
        if (media) media.addEventListener('error', () => li.classList.remove('slide--photo'));
        return li;
    }

    async function montarBanner() {
        const lista = document.querySelector('.banner .banner__slides');
        if (!lista) return;
        const [dados, catalogo] = await Promise.all([carregar('banner'), catalogoImagens()]);
        if (!bannerLiberado || !dados || !dados.itens || dados.itens.length < 2) return;

        const slides = dados.itens.map((item) => slide(item, catalogo));
        slides[0].setAttribute('data-active', 'true');
        lista.replaceChildren(...slides);

        const dots = document.querySelector('.banner .banner__dots');
        if (dots) {
            dots.replaceChildren(...slides.map((_, i) => el('li', {}, [
                el('button', {
                    classe: 'banner__dot',
                    attrs: {
                        type: 'button',
                        'data-slide': String(i),
                        'aria-label': 'Slide ' + (i + 1) + ' de ' + slides.length,
                        'aria-current': i === 0 ? 'true' : null
                    }
                })
            ])));
        }

        // Troca o aviso "dados de exemplo" pela data de verificação
        const aviso = document.querySelector('.banner .banner__title .tag');
        if (aviso) aviso.textContent = 'verificado em ' + dataCurta(dados.versao);
    }

    /* ---------- listagens (comer bem, cena & rolê) ---------- */

    // Miolo do card, igual para o card comum e para o destaque (.feature)
    function conteudoCard(item, catalogo, destaque) {
        const idTitulo = 'titulo-' + item.id;
        const nos = [];

        // Destaque não leva foto: o burst + selo de preço ocupam o lugar (Figma)
        const media = destaque ? null : imagem(item, catalogo, 'card__media');
        if (media) nos.push(media);

        nos.push(el('div', { classe: 'card__top' }, [
            el('span', { classe: 'category', texto: item.categoria }),
            el('span', { classe: 'verified', texto: 'verificado' })
        ]));
        nos.push(el('h3', { classe: 'card__title', texto: item.nome, attrs: { id: idTitulo } }));

        // Sem preço conhecido, o selo de preço some; o texto fica na linha de informação
        const temPreco = item.preco_min != null;
        if (destaque && temPreco) {
            nos.push(el('p', { classe: 'seal feature__seal', texto: faixaPreco(item.preco_min, item.preco_max) }));
        }
        nos.push(el('p', { classe: 'card__desc', texto: item.descricao }));
        if (!destaque && temPreco) {
            nos.push(el('p', { classe: 'price' }, [
                el('span', { classe: 'price__value', texto: faixaPreco(item.preco_min, item.preco_max) }),
                UNIDADE[item.unidade] ? el('span', { classe: 'price__unit', texto: UNIDADE[item.unidade] }) : null
            ]));
        }

        nos.push(el('ul', { classe: 'meta' }, [
            el('li', {}, [el('span', { classe: 'icon icon--pin', attrs: { 'aria-hidden': 'true' } }), [item.bairro, item.endereco].filter(Boolean).join(' · ')]),
            item.horario ? el('li', {}, [el('span', { classe: 'icon icon--clock', attrs: { 'aria-hidden': 'true' } }), item.horario]) : null,
            item.preco_texto ? el('li', {}, [el('span', { classe: 'icon icon--info', attrs: { 'aria-hidden': 'true' } }), item.preco_texto]) : null
        ]));

        if (item.etiquetas && item.etiquetas.length) {
            nos.push(el('ul', { classe: 'chips' }, item.etiquetas.map((t) => el('li', { classe: 'chip', texto: t }))));
        }

        const social = blocoInstagram(item);
        if (social) nos.push(el('div', { classe: 'card__social' }, [social]));

        nos.push(el('div', { classe: 'card__footer' }, [
            el('p', { classe: 'card__date' }, [
                'verificado em ' + dataCurta(item.verificado_em) + ' · ',
                linkExterno(item.fonte.nome, item.fonte.url)
            ])
        ]));

        if (destaque) {
            nos.push(el('span', { classe: 'burst', attrs: { 'aria-hidden': 'true' } }));
        }
        return nos;
    }

    function card(item, catalogo) {
        return el('li', {}, [el('article', { classe: 'card' }, conteudoCard(item, catalogo, false))]);
    }

    // Hero: número de opções e data de verificação no lugar do "dados de exemplo"
    function atualizarHero(total, versao) {
        const valor = document.querySelector('.page-hero .stat__value');
        if (valor) valor.textContent = String(total);
        const aviso = document.querySelector('.page-hero .tag');
        if (aviso && versao) aviso.textContent = 'verificado em ' + dataCurta(versao);
    }

    async function montarListas() {
        const alvos = document.querySelectorAll('[data-dados]');
        if (!alvos.length) return;
        const catalogo = await catalogoImagens();
        await Promise.all([...alvos].map(async (alvo) => {
            const dados = await carregar(alvo.getAttribute('data-dados'));
            if (!dados || !dados.itens) return;
            const itens = dados.itens.filter((i) => i.ativo !== false);
            const secao = alvo.closest('section');

            // Item com "destaque": true vai para o <article class="feature"> da seção
            const feature = secao && secao.querySelector('.feature');
            const destaque = feature ? itens.find((i) => i.destaque) : null;
            if (destaque) {
                feature.replaceChildren(...conteudoCard(destaque, catalogo, true));
            } else if (feature) {
                feature.remove();
            }

            alvo.replaceChildren(...itens.filter((i) => i !== destaque).map((i) => card(i, catalogo)));
            const vivo = secao && secao.querySelector('[aria-live]');
            if (vivo) vivo.textContent = itens.length + (itens.length === 1 ? ' resultado' : ' resultados');
            atualizarHero(itens.length, dados.versao);
        }));
    }

    /* ---------- API pública ---------- */

    const espera = (ms) => new Promise((r) => setTimeout(r, ms));

    window.kampiDados = {
        carregar: carregar,
        // O carrossel espera no máximo 2,5 s; se o JSON chegar depois, o banner fica como está
        banner: Promise.race([montarBanner(), espera(2500).then(() => { bannerLiberado = false; })]),
        listas: montarListas(),
        custos: () => carregar('custos')
    };
})();
