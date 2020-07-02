export class Map {
    
    #map;

    constructor(divId, latLng, token) {

        this.#map = L.map(divId).setView(latLng, 14);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: token
        }).addTo(this.#map);
    }

    addMarker(latLng, onClickAction) {
        L.marker(latLng).addTo(this.#map).on('click', onClickAction);
    }
}
