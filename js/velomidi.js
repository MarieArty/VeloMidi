import { Diaporama } from './classes/Diaporama.js';
import { Map } from './classes/Map.js';
import { BikeStationDisplay } from './classes/BikeStationDisplay.js';
import { BikeReservationManager } from './classes/BikeReservationManager.js';
import { BikeReservationForm } from './classes/BikeReservationForm.js';

// diaporama variables
let diaporamaDivSelector = '#diaporama';
let diaporamaDurationInSeconds = 5;

// map variables
let mapDivId = 'map';
let latLng = [ 43.6038333, 1.4419812 ]; // capitole coord
let myMapBoxToken = 'pk.eyJ1IjoicmVtaS1zYW4iLCJhIjoiY2thejAwZXY3MDh0bjJ5cWtmenJvMGkydSJ9.hclc6yA73k1eHUqhJBqzOQ';

// JcDecaux variables
let jcDecauxApiKey = 'bd2828fd25e57a045abb00865462edddcac90de8';
let contract = 'toulouse';

$(document).ready(() => {
    let diaporama = new Diaporama(diaporamaDivSelector, diaporamaDurationInSeconds);
    diaporama.start();

    let map = new Map(mapDivId, latLng, myMapBoxToken);
    let reservationManager = new BikeReservationManager();
    let reservationForm = new BikeReservationForm(reservationManager);
    let bikeStationDisplay = new BikeStationDisplay(map, reservationForm, jcDecauxApiKey, contract);
    bikeStationDisplay.displayAllStations();
});
