export class BikeReservationManager {

    #currentReservation = null;

    constructor() {
        this.retrieveFromSession();
    }

    retrieveFromSession() {
        let reservation = window.sessionStorage.getItem('reservation');

        if(reservation != null) {
            this.#currentReservation = JSON.parse(reservation);

            this.showReservation();
        }
    }

    makeReservation(station, name, durationInMinutes = 20) {
        let validUntil = new Date();
        validUntil.setMinutes(validUntil.getMinutes() + durationInMinutes);

        this.#currentReservation = {
            station: station,
            renter: name,
            validUntil: validUntil.getTime()
        };

        window.sessionStorage.setItem('reservation', JSON.stringify(this.#currentReservation));

        this.showReservation();
    }

    showReservation() {

        if (this.#currentReservation == null) {
            return;
        }

        $('#reservation-station-name').html(this.#currentReservation.station.name);
        $('#reservation-first-name').html(this.#currentReservation.renter.firstName);
        $('#reservation-last-name').html(this.#currentReservation.renter.lastName);

        this.launchReservationTimer();
        $('#reservation').show();
    }

    launchReservationTimer() {

        this.updateTimerInformation();
        let timer = setInterval(() => {
            if (this.updateTimerInformation() < 0) {
                clearInterval(timer);
                $('#reservation').hide();
                this.#currentReservation = null;
                window.sessionStorage.setItem('reservation', null);
            }
        }, 1000);
    }

    updateTimerInformation() {
        let now = new Date().getTime();
        let timeleft = this.#currentReservation.validUntil - now;
        
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            
        $("#reservation-remaining-time").html(minutes+'min '+seconds+'s');

        return timeleft;
    }
}