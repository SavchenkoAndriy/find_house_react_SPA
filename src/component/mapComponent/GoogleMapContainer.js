import React from 'react';
import {selectHouseTC,addMarkerAC} from "../../redux/reducers/main";
import {connect} from "react-redux";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';


class setGoogleMap extends React.Component {

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //
    // }


    mapClicked = (mapProps, map, clickEvent) => {


        let geocoder = new mapProps.google.maps.Geocoder();
        let lat = clickEvent.latLng.lat();
        let lng = clickEvent.latLng.lng();


        let geocodeLatLng = (geocoder) => {
            let coordinates = lat + ',' + lng;
            let arrCoordinates = coordinates.split(',', 2);
            let latlng = {lat: parseFloat(arrCoordinates[0]), lng: parseFloat(arrCoordinates[1])};
            this.props.addMarker(latlng);
            geocoder.geocode({'location': latlng}, (results) => {
                this.props.selectHouse(results[0].formatted_address);
            });
        };

        geocodeLatLng(geocoder);


        //    console.log(clickEvent.latLng.lat()); координаты кликаемого места!!!!!!!!!!!!!!!!
        //    console.log(clickEvent.latLng.lng());
    };


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={17}
                initialCenter={this.props.center}
                center={this.props.center}
                onClick={this.mapClicked}
            >
                {this.props.selectHouseMarker &&
                this.props.selectHouseMarker.map(e => {
                    return <Marker
                        position={{lat: e.lat, lng: e.lng}}
                    />
                })
                }
            </Map>
        )
    };
}


let MapStateToProps = (state) => {
    return {
        center: state.Main.center,
        selectHouseMarker: state.Main.selectHouseMarker,
        // cityList: state.Main.cityList,
        // region: state.Main.region,
        // regionList: state.Main.regionList,
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        selectHouse: (address) => {
            dispatch(selectHouseTC(address))
        },
        addMarker: (coordinates) => {
            dispatch(addMarkerAC(coordinates))
        }
    }
};

const GoogleMapContainer = connect(MapStateToProps, MapDispatchToProps)(setGoogleMap);


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCWOrzHAfEH5-EBA_rkz0uc4YbnTcyKxCg'
})(GoogleMapContainer);