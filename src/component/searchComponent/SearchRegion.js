import React from 'react';

const SearchRegion = (props) => {
    let getRegionList = (e) => {
        props.getRegionList(e.target.value);
    };

    return (
        <div className={'input__wrap'}>
            <p>Почніть вводити назву району</p>
            <input type={'text'} value={props.region} onChange={getRegionList}/>
            <ul>
                {props.regionList && props.regionList.map(e =>
                    <li onClick={() => props.setRegion(e)}>{e.name._text}</li>
                )}
            </ul>
        </div>
    );
};

export default SearchRegion;