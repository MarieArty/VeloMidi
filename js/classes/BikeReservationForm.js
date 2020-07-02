import { SignatureDialog } from './SignatureDialog.js';
import { Alert } from './Alert.js';

export class BikeReservationForm {

    #bikeReservationManager;
    #currentStation = null;
    #name = {
        lastName : null,
        firstName : null
    };

    constructor(bikeReservationManager) {
        this.#bikeReservationManager = bikeReservationManager;

        this.retrieveFromLocalStorage();

        $('#reservation-form').submit((e) => {
            e.preventDefault();
            this.showSignatureDialog();
        });
    }

    retrieveFromLocalStorage() {
        var name = window.localStorage.getItem('name');

        if (name != null) {
            this.#name = JSON.parse(name);

            $('#reservation-last-name-field').val(this.#name.lastName);
            $('#reservation-first-name-field').val(this.#name.firstName);
        }
    }

    changeStation(station) {
        this.#currentStation = station;
    }

    showSignatureDialog()
    {
        if (!this.checkFormFields()) {
            return;
        }

        new SignatureDialog(() => this.saveReservation());
    }

    saveReservation()
    {
        if (!this.checkFormFields()) {
            return;
        }

        var lastName = $('#reservation-last-name-field').val();
        var firstName = $('#reservation-first-name-field').val();

        this.#name = {
            lastName : lastName,
            firstName : firstName
        };
        
        window.localStorage.setItem('name', JSON.stringify(this.#name));

        this.#bikeReservationManager.makeReservation(this.#currentStation, this.#name, 20);
    }

    checkFormFields()
    {
        var lastName = $('#reservation-last-name-field').val();
        var firstName = $('#reservation-first-name-field').val();

        if (lastName == '' || firstName == '') {
            new Alert('Entrez votre nom complet !');
            return false;
        }

        if (this.#currentStation == null) {
            new Alert('Vous devez choisir une station !');
            return false;
        }

        if (this.#currentStation.totalStands.availabilities.bikes == 0) {
            new Alert('Plus de vélos disponibles !');
            return false;
        }

        return true;
    }
}