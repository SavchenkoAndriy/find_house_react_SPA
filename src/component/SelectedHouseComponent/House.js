import React from 'react';
import HouseInfo from "./HouseInfo";

const House = (props) => {
    let Info = props.selectedHomeInfo;

    if (Info === 'Информація відсутня'){
        return <div className={'HouseInfo'}>{Info}</div>;
    }else if (Info){
        return (
            <div className={'House'}>
                <HouseInfo Info={Info}/>
                <div className={'House__btn'}>
                    <button onClick={props.addToFavorites}>Додати в список Вподобань</button>
                </div>
            </div>
        );
    }

    return <></>;
};

export default House;