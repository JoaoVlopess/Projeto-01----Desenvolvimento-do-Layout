document.addEventListener("DOMContentLoaded", function () {
  console.log("Iniciando Swipers...");

  // Verifica se a biblioteca Swiper foi carregada corretamente
  if (typeof Swiper === "undefined") {
    console.error("Erro: Swiper não foi carregado corretamente.");
    return;
  }

  // Produto base que será usado para gerar os slides
  const produtoBase = {
    img: "public/img/modelo.png",
    titulo: "Lorem ipsum dolor sit amet consectetuer adipiscing elit",
    precoAntigo: "R$ 100,00",
    precoNovo: "R$79,90",
    parcelas: "10x de R$ 7,90",
    desconto: "10% OFF"
  };

  // Seleciona todos os containers que terão carrossel de produtos
  const containers = document.querySelectorAll(".productSlides");

  containers.forEach((container) => {
    // Cria 6 produtos com os dados do produtoBase
    const produtos = Array.from({ length: 6 }, () => produtoBase);

    // Insere os produtos dinamicamente dentro do swiper
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

    // Encontra o container principal do Swiper mais próximo
    const swiperContainer = container.closest(".swiper");

    // Inicializa o Swiper com configurações de responsividade
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
        0: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      },
    });
  });

// Lógica de busca (funciona para mobile e desktop)
document.querySelectorAll('.searchButton').forEach((button) => {
  button.addEventListener('click', () => {
    const parent = button.closest('div');
    const input = parent?.querySelector('.searchInput');
    const result = parent?.parentElement?.querySelector('.searchResult');

    const query = input?.value.trim();
    if (result) {
      result.textContent = query ? `Você buscou por: '${query}'` : '';
    }
  });
});

  // Dropdown simples com ícones alternando (up/down)
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

  // ---------- Dropdown de categorias e departamentos ----------
  const categoriasTrigger = document.getElementById('categoriasTrigger');
  const categoriasIcon = document.getElementById('categoriasIcon');
  const departamentoTriggers = document.querySelectorAll('.departamento-trigger');
  const submenuCategorias = document.getElementById('menuCategorias');
  const submenuDepartamento = document.getElementById('submenuDepartamento');

  let hideTimeout;
  let activeTrigger = null;

  // Mostra submenu e destaca o trigger atual
  const showDropdown = (submenu, trigger) => {
    clearTimeout(hideTimeout);

    submenuCategorias?.classList.add('hidden');
    submenuDepartamento?.classList.add('hidden');
    submenu?.classList.remove('hidden');

    if (activeTrigger) activeTrigger.classList.remove('text-[#005CFF]');
    trigger?.classList.add('text-[#005CFF]');
    activeTrigger = trigger;
  };

  // Esconde submenu com pequeno atraso
  const hideDropdown = () => {
    hideTimeout = setTimeout(() => {
      submenuCategorias?.classList.add('hidden');
      submenuDepartamento?.classList.add('hidden');
      activeTrigger?.classList.remove('text-[#005CFF]');
      activeTrigger = null;
    }, 200);
  };

  // Eventos para mostrar/esconder menu de categorias
  [categoriasTrigger, categoriasIcon].forEach(trigger => {
    trigger?.addEventListener('mouseenter', () => showDropdown(submenuCategorias, categoriasTrigger));
    trigger?.addEventListener('mouseleave', hideDropdown);
  });

  // Evita esconder o menu enquanto o mouse está dentro dele
  submenuCategorias?.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  submenuCategorias?.addEventListener('mouseleave', hideDropdown);
  submenuDepartamento?.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  submenuDepartamento?.addEventListener('mouseleave', hideDropdown);

  // Hover nos departamentos mostra submenu específico
  departamentoTriggers.forEach(trigger => {
    trigger?.addEventListener('mouseenter', () => showDropdown(submenuDepartamento, trigger));
    trigger?.addEventListener('mouseleave', hideDropdown);
  });

  // Gera lista de departamentos
  const departamentosContainer = document.getElementById('listaDepartamentos');
  const totalDepartamentos = 13;

  for (let i = 0; i < totalDepartamentos; i++) {
    departamentosContainer?.insertAdjacentHTML('beforeend', `
      <div class="flex justify-between gap-10 hover:text-[#005CFF] cursor-pointer">
        <p>Departamento ${i + 1}</p>
        <i class="bi bi-caret-right"></i>
      </div>
    `);
  }

  // Lógica de seleção de departamento
  const dropdown = document.getElementById('menuCategorias');
  let departamentoSelecionado = null;

  const departamentos = document.querySelectorAll('#listaDepartamentos .flex.justify-between');

  departamentos.forEach(departamento => {
    departamento.addEventListener('click', () => {
      if (departamentoSelecionado) {
        departamentoSelecionado.classList.remove('text-[#005CFF]');
      }

      departamento.classList.add('text-[#005CFF]');
      departamentoSelecionado = departamento;
    });
  });

  // Reseta seleção se o dropdown for fechado
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (dropdown?.classList.contains('hidden')) {
          if (departamentoSelecionado) {
            departamentoSelecionado.classList.remove('text-[#005CFF]');
            departamentoSelecionado = null;
          }
        }
      }
    }
  });
  dropdown && observer.observe(dropdown, { attributes: true });

  // Geração dinâmica das colunas de categorias (menu principal e submenu)
  const colunasCategoriasContainer = document.getElementById('colunasCategorias');
  const submenuColunasContainer = document.getElementById('submenuColunasCategorias');
  const colunas = 3;
  const categoriasPorColuna = 8;

  for (let i = 0; i < colunas; i++) {
    const coluna = document.createElement('div');
    coluna.className = 'flex flex-col gap-5 flex-1';

    for (let j = 0; j < categoriasPorColuna; j++) {
      coluna.innerHTML += `<p class="hover:text-[#005CFF] cursor-pointer">categoria</p>`;
    }

    colunasCategoriasContainer?.appendChild(coluna);
  }

  for (let i = 0; i < colunas; i++) {
    const coluna = document.createElement('div');
    coluna.className = 'flex flex-col gap-5';

    for (let j = 0; j < categoriasPorColuna; j++) {
      coluna.innerHTML += `<p class="hover:text-[#005CFF] cursor-pointer">categoria</p>`;
    }

    submenuColunasContainer?.appendChild(coluna);
  }
});