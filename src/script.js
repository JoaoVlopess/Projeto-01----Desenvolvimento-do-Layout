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
