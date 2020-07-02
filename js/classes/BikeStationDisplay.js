export class BikeStationDisplay {

    #map;
    #reservationForm;
    #apiKey;
    #contract;

    constructor(map, reservationForm, apiKey, contract) {
        this.#map = map;
        this.#reservationForm = reservationForm;
        this.#apiKey = apiKey;
        this.#contract = contract;
    }

    displayAllStations() {
        $.ajax({
            dataType: 'json',
            url: 'https://api.jcdecaux.com/vls/v3/stations?contract='+this.#contract+'&apiKey='+this.#apiKey,
            context: this
        }).done((stations) => {
            stations.forEach(station => {
                this.#map.addMarker(
                    [ station.position.latitude, station.position.longitude ],
                    () => this.displayOneStation(station)
                );
            });
        });
    }

    displayOneStation(station) {
        $('#station-name').html(station.name);
        $('#station-address').html(station.address);
        $('#station-nb-available-spots').html(station.totalStands.availabilities.stands);
        $('#station-nb-available-bikes').html(station.totalStands.availabilities.bikes);

        this.#reservationForm.changeStation(station);
    }
}