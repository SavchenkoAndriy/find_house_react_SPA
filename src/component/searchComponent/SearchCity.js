import React from 'react';
import Preloader from "../preloaderComponent/Preloader";

const SearchCity = (props) => {
    let getCityList = (e) => {
        props.getCityList(e.target.value);
    };

    return (
        <div className={'input__wrap'}>
            <p>Почніть вводити назву міста, та виберіть потрібне</p>
            <p>Для полів вводу використовуйте Англійську мову</p>
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