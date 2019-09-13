import React from 'react';

const House = (props) => {

    if (props.selectedHomeInfo === 'Информація відсутня'){
        return (
            <div>
                {props.selectedHomeInfo}
            </div>
        );
    }else if (props.selectedHomeInfo){
        return (
            <div>
                {props.selectedHomeInfo.address.street &&
                    <p>Адресса {props.selectedHomeInfo.address.street._text}</p>
                }
                {props.selectedHomeInfo.bathrooms &&
                    <p>Ванних кімнат {Number(props.selectedHomeInfo.bathrooms._text)}</p>
                }
                {props.selectedHomeInfo.bedrooms &&
                    <p>Спалень {props.selectedHomeInfo.bedrooms._text}</p>
                }
                {props.selectedHomeInfo.useCode &&
                    <p>Тип {props.selectedHomeInfo.useCode._text}</p>
                }
                {props.selectedHomeInfo.yearBuilt &&
                    <p>Рік забудови {props.selectedHomeInfo.yearBuilt._text}</p>
                }
                {props.selectedHomeInfo.links.homedetails &&
                    <a target="_blank" href={props.selectedHomeInfo.links.homedetails._text}>Більше інформації про дім</a>
                }
                <div>
                    <button onClick={props.addToFavorites}>Додати в список Вподобань</button>
                </div>
            </div>
        );
    }

    return (
        <>
        </>
    );
};

export default House;