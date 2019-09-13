import React from 'react';
import {getCityListTC, setCityTC, getRegionListTC, setRegionTC} from "../../redux/reducers/main";
import {connect} from "react-redux";
import SearchCity from "./SearchCity";
import SearchRegion from "./SearchRegion";


class setCityList extends React.Component {


    // componentDidMount() {
    //     this.props.getCityList('n');
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.cityList !== nextProps.cityList
    // }


    render() {
        return <>
            <SearchCity
                isFetching={this.props.isFetching}
                city={this.props.city}
                cityList={this.props.cityList}
                setCity={this.props.setCity}
                getCityList={this.props.getCityList}
            />
            {this.props.isCitySelected &&
            <SearchRegion
                isFetching={this.props.isFetching}
                regionList={this.props.regionList}
                getRegionList={this.props.getRegionList}
                setRegion={this.props.setRegion}
                region={this.props.region}
            />
            }
        </>
    };
}


let MapStateToProps = (state) => {
    return {
        isFetching: state.Main.isFetching,
        city: state.Main.city,
        cityList: state.Main.cityList,
        region: state.Main.region,
        regionList: state.Main.regionList,
        isCitySelected: state.Main.isCitySelected,
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        getCityList: (data) => {
            dispatch(getCityListTC(data))
        },
        getRegionList: (data) => {
            dispatch(getRegionListTC(data))
        },
        setCity: (city) => {
            dispatch(setCityTC(city))
        },
        setRegion: (region) => {
            dispatch(setRegionTC(region))
        }
    }
};

const SearchContainer = connect(MapStateToProps, MapDispatchToProps)(setCityList);

export default SearchContainer;