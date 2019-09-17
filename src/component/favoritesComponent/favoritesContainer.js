import React from 'react';
import {chooseHouseAC, getFavoritesAC} from "../../redux/reducers/main";
import {connect} from "react-redux";
import Favorites from "./favorites";

class FavoritesList extends React.Component {
    render() {
        return (
            <div className={'favorites__wrap'}>
                {this.props.favorites.length > 0 &&
                <button onClick={this.props.getFavorites}>{this.props.showFavorites ? 'Сховати' : 'Показати'} Вибрані</button>
                }
                {this.props.showFavorites &&
                <div>Клікнувши на мітку на карті чи на блок з інформацією, мітка на карті та будинок виділяться</div>
                }
                {this.props.showFavorites && <Favorites chooseHouse={this.props.chooseHouse} favorites={this.props.favorites}/>}
            </div>
        )
    };
}

let MapStateToProps = (state) => {
    return {
        showFavorites: state.Main.showFavorites,
        favorites: state.Main.favorites,
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        getFavorites: () => {
            dispatch(getFavoritesAC())
        },
        chooseHouse: (house) => {
            dispatch(chooseHouseAC(house))
        },
    }
};

const FavoritesContainer = connect(MapStateToProps, MapDispatchToProps)(FavoritesList);

export default FavoritesContainer;