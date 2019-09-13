import React from 'react';
import './App.sass';
import SearchContainer from "./component/searchComponent/SearchContainer";
import GoogleApiWrapper from "./component/mapComponent/GoogleMapContainer";
import SelectedHouseContainer from "./component/SelectedHouse/SelectedHouseContainer";


function App() {
    return (
        <>
            <div className={'AppWrap'}>
                <SearchContainer/>
                <SelectedHouseContainer/>
            </div>
            <div className={'google__maps'}>
                <GoogleApiWrapper/>
            </div>
        </>
    );
}

export default App;
