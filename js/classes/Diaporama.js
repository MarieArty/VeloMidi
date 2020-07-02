export class Diaporama {

    #diaporamaDiv; // la div contenant le diaporama
    
    #carouselDuration;
    #carouselFunction = null; // la fonction de rotation du carousel

    constructor(divSelector, carouselDurationInSeconds) {
        this.#diaporamaDiv = $(divSelector); // on récupère la div qui contient le diaporama
        this.#carouselDuration = carouselDurationInSeconds * 1000; // la durée du carousel

        this.initClasses();
        this.initControls();
        this.listenForKeyboard();
    }

    initClasses() {
        this.#diaporamaDiv.addClass('carousel slide');
        this.#diaporamaDiv.find('ul').addClass('carousel-inner');
        this.#diaporamaDiv.find('li').addClass('carousel-item');
        this.#diaporamaDiv.find('img').addClass('d-block w-100');

        this.#diaporamaDiv.find('li').filter(':first').addClass('active');
    }

    initControls() {
        this.#diaporamaDiv.append(
            '<a class="carousel-control-prev" href="#" role="button" data-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
            '</a>'
        );
        this.#diaporamaDiv.find(".carousel-control-prev").click((e) => {
            e.preventDefault(); // empêcher de suivre le lien
            this.previous(); // on demande à afficher la slide précédente
        });

        this.#diaporamaDiv.append(
            '<a class="carousel-control-next" href="#" role="button" data-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
            '</a>'
        );
        this.#diaporamaDiv.find(".carousel-control-next").click((e) => {
            e.preventDefault();
            this.next(); // on demande à afficher la slide suivante
        });

        this.#diaporamaDiv.find('img').click(() => {
            this.toggle(); // si le carousel est en route, l'arrête, sinon, le démarre
        });
    }

    listenForKeyboard() {
        $("body").keydown((e) => {
            if ((e.keyCode || e.which) == 37) { // left arrow   
                this.previous();
            } else if ((e.keyCode || e.which) == 39) { // right arrow
                this.next();
            } else if ((e.keyCode || e.which) == 32) { // space
                this.toggle();
            }  
        });
    }

    next() {
        var activeLi = this.removeActiveLi();

        var nextLi = activeLi.next();
        if (nextLi.length == 0) {
            nextLi = activeLi.siblings().filter(':first');
        }
        this.setActiveLi(nextLi);
    }

    previous() {
        var activeLi = this.removeActiveLi();

        var prevLi = activeLi.prev();
        if (prevLi.length == 0) {
            prevLi = activeLi.siblings().filter(':last');
        }
        this.setActiveLi(prevLi);
    }

    removeActiveLi() {
        var activeLi = this.#diaporamaDiv.find('.active').filter(':first');
        activeLi.removeClass('active');

        return activeLi;
    }

    setActiveLi(li) {
        li.addClass('active');
    }

    start() {
        this.#carouselFunction = setInterval(() => {
            this.next();
        }, this.#carouselDuration);
    }

    stop() {
        clearInterval(this.#carouselFunction);
        this.#carouselFunction = null;
    }

    toggle() {
        if (this.#carouselFunction == null) {
            this.start();
        } else {
            this.stop();
        }
    }
}
