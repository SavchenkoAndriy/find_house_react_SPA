import React from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
// import { GoogleComponent } from 'react-google-location';


const MapComponent = (props) => {

    const mapStyles = {
        width: '500px',
        height: '500px',
    };



    let mapClicked = (mapProps, map, clickEvent) => {


        let geocoder = new mapProps.google.maps.Geocoder();
        let a = clickEvent.latLng.lat();
        let b = clickEvent.latLng.lng();

        let geocodeLatLng = (geocoder) => {
            let latlngf = a+','+b;
            let latlngStr = latlngf.split(',', 2);
            let latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
            geocoder.geocode({'location': latlng}, (results) => {
                console.log(results[0].formatted_address);
            });
        };

        geocodeLatLng(geocoder);



        //    console.log(clickEvent.latLng.lat()); координаты кликаемого места!!!!!!!!!!!!!!!!
        //    console.log(clickEvent.latLng.lng());
    };

    console.log(props.initialCenter);



    return (
        <Map
            google={props.google}
            zoom={17}
            style={mapStyles}
            initialCenter={props.initialCenter}
            onClick={mapClicked}
        />

    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCWOrzHAfEH5-EBA_rkz0uc4YbnTcyKxCg'
})(MapComponent);

// export default MapComponent;