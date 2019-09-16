import React from 'react';
import './HouseInfo.sass';

const HouseInfo = ({Info}) => {
    return (
        <div className={'HouseInfo'}>
            {Info.address.street && <p>Адресса {Info.address.street._text}</p>}
            {Info.bathrooms && <p>Ванних кімнат {Number(Info.bathrooms._text)}</p>}
            {Info.bedrooms && <p>Спалень {Info.bedrooms._text}</p>}
            {Info.useCode && <p>Тип {Info.useCode._text}</p>}
            {Info.yearBuilt && <p>Рік забудови {Info.yearBuilt._text}</p>}
            {Info.links.homedetails && <a target="_blank" href={Info.links.homedetails._text}>Більше інформації про дім</a>}
        </div>
    );
};

export default HouseInfo;