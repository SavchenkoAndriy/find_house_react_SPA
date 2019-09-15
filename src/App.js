import React from 'react';
import './App.sass';
import SearchContainer from "./component/searchComponent/SearchContainer";
import GoogleApiWrapper from "./component/mapComponent/GoogleMapContainer";
import SelectedHouseContainer from "./component/SelectedHouseComponent/SelectedHouseContainer";
import FavoritesContainer from "./component/favoritesComponent/favoritesContainer";


function App() {
    return (
        <>
            <div className={'AppWrap'}>
                <SearchContainer/>
                <SelectedHouseContainer/>
                <FavoritesContainer/>
            </div>
            <div className={'google__maps'}>
                <GoogleApiWrapper/>
            </div>
        </>
    );
}

export default App;
