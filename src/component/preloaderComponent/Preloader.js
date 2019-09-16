import React from 'react';
import Preload from '../../img/Spinner-1s-200px.gif';
import './Prelader.sass';

const Preloader = () => {
    return <div className={'wrap'}><img alt={'Loading'} src={Preload}/></div>;
};

export default Preloader;