import React from 'react';
import {getFavoritesAC} from "../../redux/reducers/main";
import {connect} from "react-redux";
import Favorites from "./favorites";

class FavoritesList extends React.Component {
    render() {
        return (
            <div className={'favorites__wrap'}>
                {this.props.favorites.length > 0 && <button onClick={this.props.getFavorites}>Показати/Сховати Вибрані</button>}
                {this.props.showFavorites && <Favorites favorites={this.props.favorites}/>}
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
    }
};

const FavoritesContainer = connect(MapStateToProps, MapDispatchToProps)(FavoritesList);

export default FavoritesContainer;