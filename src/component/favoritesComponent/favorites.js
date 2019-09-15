import React from 'react';
import HouseInfo from "../SelectedHouseComponent/HouseInfo";
import './Favorites.sass';

const Favorites = (props) => {

    return props.favorites.map(e => {
        if(e.mouseover === true){
            return (
                <div className={'select'}>
                    <HouseInfo Info={e.Info}/>
                </div>
            )
        } else return (
            <div className={'House'}>
                <HouseInfo Info={e.Info}/>
            </div>
        )
    })

};

export default Favorites;