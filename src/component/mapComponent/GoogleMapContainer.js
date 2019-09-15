import React from 'react';
import {selectHouseTC, addMarkerAC,chooseHouseAC} from "../../redux/reducers/main";
import {connect} from "react-redux";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
let iconURL = 'http://labs.google.com/ridefinder/images/mm_20_green.png';


class setGoogleMap extends React.Component {


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
                this.props.selectHouseMarker.map(e =>{
                    return <Marker
                        position={{lat: e.lat, lng: e.lng}}
                    />
                })
                }
                {this.props.favorites.length > 0 &&
                this.props.favorites.map(e =>{
                    return <Marker
                        icon={{
                            url: iconURL,
                            scaledSize: new this.props.google.maps.Size(32,32)
                        }}
                        onClick={()=>this.props.chooseHouse(e)}
                        position={{lat: e.Marker[0].lat, lng: e.Marker[0].lng}}
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
        favorites: state.Main.favorites,
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        selectHouse: (address) => {
            dispatch(selectHouseTC(address))
        },
        addMarker: (coordinates) => {
            dispatch(addMarkerAC(coordinates))
        },
        chooseHouse: (house) => {
            dispatch(chooseHouseAC(house))
        }
    }
};

const GoogleMapContainer = connect(MapStateToProps, MapDispatchToProps)(setGoogleMap);


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCWOrzHAfEH5-EBA_rkz0uc4YbnTcyKxCg'
})(GoogleMapContainer);