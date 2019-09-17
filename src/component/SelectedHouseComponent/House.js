import React from 'react';
import HouseInfo from "./HouseInfo";

const House = (props) => {
    let Info = props.selectedHomeInfo;


    return (
        <div>
            {props.selectedHomeInfoError ?
                <div className={'HouseInfo'}>Інформація по даному дому відсутня</div> :
                <div className={'House'}>
                    <HouseInfo Info={Info}/>
                    <div className={'House__btn'}>
                        <button onClick={props.addToFavorites}>Додати в список Вподобань</button>
                    </div>
                </div>
            }
        </div>
    )
};


export default House;