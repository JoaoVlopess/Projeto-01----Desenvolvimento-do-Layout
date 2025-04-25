document.addEventListener("DOMContentLoaded", function () {
    console.log("Iniciando Swipers...");

    if (typeof Swiper === "undefined") {
        console.error("Erro: Swiper não foi carregado corretamente.");
        return;
    }

    const produtoBase = {
        img: "/public/img/modelo.png",
        titulo: "Lorem ipsum dolor sit amet consectetuer adipiscing elit",
        precoAntigo: "R$ 100,00",
        precoNovo: "R$79,90",
        parcelas: "10x de R$ 7,90",
        desconto: "10% OFF"
    };

    const containers = document.querySelectorAll(".productSlides");

    containers.forEach((container) => {
        const produtos = Array.from({ length: 6 }, () => produtoBase);

        produtos.forEach((produto) => {
            container.innerHTML += `
                <div class="swiper-slide">
                    <div class="border pt-2 pb-3 rounded-2xl font-['Nunito'] relative flex flex-col items-center justify-center">
                        <img class="w-56 h-56" src="${produto.img}" alt="Imagem do produto">
                        <p class="bg-[#00264E] text-white absolute -top-1 left-0 m-3 px-1.5 py-1 rounded-md text-xs">NOVO</p>
                        <div class="px-2 flex flex-col">
                            <h3 class="text-sm py-1.5">${produto.titulo}</h3>
                            <div class="flex gap-2">
                                <div class="flex flex-col justify-center">
                                    <p class="text-xs text-gray-800"><s>${produto.precoAntigo}</s></p>
                                    <p class="text-base font-medium">${produto.precoNovo}</p>
                                </div>
                                <p class="self-center text-white bg-[#5EC0BE] px-2 py-0.5 rounded-md text-xs">
                                    <u>${produto.desconto}</u>
                                </p>
                            </div>
                            <p>Ou em até <span class="font-bold text-sm ">${produto.parcelas}</span></p>
                            <button class="px-5 py-2 bg-[#005CFF] text-white rounded-lg mt-2">Comprar</button>
                        </div>
                    </div>
                </div>
            `;
        });

        // Pegando o swiper container pai (pode ser o avô do container de slides)
        const swiperContainer = container.closest(".swiper");

        // Inicializando Swiper individualmente
        new Swiper(swiperContainer, {
            speed: 400,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: swiperContainer.querySelector(".swiper-button-next"),
                prevEl: swiperContainer.querySelector(".swiper-button-prev"),
            },
            pagination: {
                el: swiperContainer.querySelector(".swiper-pagination"),
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                1280: {
                    slidesPerView: 5,
                },
            },
        });
    });
});

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchResult.textContent = `Você buscou por: '${query}'`;
    } else {
        searchResult.textContent = ''; // limpa se o campo estiver vazio
    }
});

document.querySelectorAll('[data-toggle]').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const key = toggle.getAttribute('data-toggle');
        const content = document.querySelector(`[data-content="${key}"]`);
        const iconDown = document.querySelector(`[data-icon="${key}-down"]`);
        const iconUp = document.querySelector(`[data-icon="${key}-up"]`);

        if (content && iconDown && iconUp) {
            content.classList.toggle('hidden');
            content.classList.toggle('flex');

            iconDown.classList.toggle('hidden');
            iconUp.classList.toggle('hidden');
        }
    });
});

const categoriasTrigger = document.getElementById('categoriasTrigger');
const categoriasIcon = document.getElementById('categoriasIcon'); // novo ícone
const departamentoTriggers = document.querySelectorAll('.departamento-trigger');
const submenuCategorias = document.getElementById('menuCategorias');
const submenuDepartamento = document.getElementById('submenuDepartamento');

let hideTimeout;
let activeTrigger = null;

const showDropdown = (submenu, trigger) => {
  clearTimeout(hideTimeout);

  submenuCategorias?.classList.add('hidden');
  submenuDepartamento?.classList.add('hidden');
  submenu.classList.remove('hidden');

  if (activeTrigger) activeTrigger.classList.remove('text-[#005CFF]');
  trigger.classList.add('text-[#005CFF]');
  activeTrigger = trigger;
};

const hideDropdown = () => {
  hideTimeout = setTimeout(() => {
    submenuCategorias?.classList.add('hidden');
    submenuDepartamento?.classList.add('hidden');
    if (activeTrigger) activeTrigger.classList.remove('text-[#005CFF]');
    activeTrigger = null;
  }, 200);
};

// Gatilhos de "Todas as Categorias" e ícone
[categoriasTrigger, categoriasIcon].forEach(trigger => {
  trigger.addEventListener('mouseenter', () => showDropdown(submenuCategorias, categoriasTrigger));
  trigger.addEventListener('mouseleave', hideDropdown);
});

submenuCategorias?.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
submenuCategorias?.addEventListener('mouseleave', hideDropdown);

// Triggers de departamentos
departamentoTriggers.forEach(trigger => {
  trigger.addEventListener('mouseenter', () => showDropdown(submenuDepartamento, trigger));
  trigger.addEventListener('mouseleave', hideDropdown);
});

submenuDepartamento.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
submenuDepartamento.addEventListener('mouseleave', hideDropdown);

// Marca item selecionado ao clicar
const departamentos = document.querySelectorAll('#menuCategorias .flex > .flex.justify-between');
const dropdown = document.getElementById('menuCategorias');

departamentos.forEach(departamento => {
  departamento.addEventListener('click', () => {
    departamentos.forEach(dep => dep.classList.remove('text-[#005CFF]'));
    departamento.classList.add('text-[#005CFF]');
  });
});

// Observa mudanças na classe do dropdown
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      if (dropdown.classList.contains('hidden')) {
        departamentos.forEach(dep => dep.classList.remove('text-[#005CFF]'));
      }
    }
  }
});

observer.observe(dropdown, { attributes: true });

const departamentosContainer = document.getElementById('listaDepartamentos');
const totalDepartamentos = 13;

for (let i = 0; i < totalDepartamentos; i++) {
    departamentosContainer.innerHTML += `
        <div class="flex justify-between gap-10 hover:text-[#005CFF] cursor-pointer">
            <p class="">Departamento</p>
            <i class="bi bi-caret-right"></i>
        </div>
    `;
}

// Gerar as colunas de categorias
const colunasCategoriasContainer = document.getElementById('colunasCategorias');
const colunas = 3;
const categoriasPorColuna = 8;

for (let i = 0; i < colunas; i++) {
    const coluna = document.createElement('div');
    coluna.className = 'flex flex-col gap-5 flex-1';

    for (let j = 0; j < categoriasPorColuna; j++) {
        coluna.innerHTML += `<p class="hover:text-[#005CFF] cursor-pointer">categoria</p>`;
    }

    colunasCategoriasContainer.appendChild(coluna);
}


const submenuColunasContainer = document.getElementById('submenuColunasCategorias');
const totalColunas = 3;
const categoriasPorColuna2 = 8;

for (let i = 0; i < totalColunas; i++) {
    const coluna = document.createElement('div');
    coluna.className = 'flex flex-col gap-5';

    for (let j = 0; j < categoriasPorColuna2; j++) {
        coluna.innerHTML += `<p class="hover:text-[#005CFF] cursor-pointer">categoria</p>`;
    }

    submenuColunasContainer.appendChild(coluna);
}
