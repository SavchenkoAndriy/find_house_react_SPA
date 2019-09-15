import React from 'react';
import {addToFavoritesAC} from "../../redux/reducers/main";
import {connect} from "react-redux";
import House from "./House";


class selectHouse extends React.Component {



    render() {
        return (
            <div>
                {this.props.isRegionSelected &&
                    <House {...this.props}/>
                }
            </div>
            )
    };
}


let MapStateToProps = (state) => {
    return {
        selectedHomeInfo: state.Main.selectedHomeInfo,
        isRegionSelected: state.Main.isRegionSelected,
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addToFavorites: () => {
            dispatch(addToFavoritesAC())
        },
    }
};

const SelectedHouseContainer = connect(MapStateToProps, MapDispatchToProps)(selectHouse);

export default SelectedHouseContainer;