import React from 'react';
import Preloader from "../preloader/Preloader";


const SearchCity = (props) => {

    let getCityList = (e) => {
        props.getCityList(e.target.value);
    };


    return (
        <div>
            <p>Почніть вводити назву міста, та клікніть на потрібне</p>
            <input type={'text'} value={props.city} onChange={getCityList}/>
            {props.isFetching ? <Preloader/> :
                <ul>
                    {props.cityList && props.cityList.map(e =>
                        <li onClick={() => props.setCity(e)}>{e.name} штат {e.adminName1}</li>
                    )}
                </ul>
            }
        </div>
    );
};

export default SearchCity;