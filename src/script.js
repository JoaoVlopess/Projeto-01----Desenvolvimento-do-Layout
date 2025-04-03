document.addEventListener("DOMContentLoaded", function () {
    console.log("Iniciando Swiper..."); // Teste para ver se o script está carregando

    if (typeof Swiper === "undefined") {
        console.error("Erro: Swiper não foi carregado corretamente.");
        return;
    }

    const swiper = new Swiper(".swiper", {
        speed: 400,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        slidesPerView: 5,
    });

    console.log("Swiper inicializado:", swiper);
});