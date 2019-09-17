import React from 'react';
import HouseInfo from "../SelectedHouseComponent/HouseInfo";
import './Favorites.sass';

const Favorites = (props) => {
    return props.favorites.map(e => {
        if(e.select === true){
            return <div key={e.Info.address.street._text} className={'select'}><HouseInfo Info={e.Info}/></div>
        } else return <div onClick={() => props.chooseHouse(e)} key={e.Info.address.street._text} className={'House'}><HouseInfo Info={e.Info}/></div>
    })
};

export default Favorites;