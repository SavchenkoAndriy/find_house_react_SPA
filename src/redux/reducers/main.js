import {API} from "../../API/api";
import convert from 'xml-js';


const GET_CITY_LIST = 'GET_CITY_LIST';
const IS_FETCHING = 'IS_FETCHING';
const SET_CITY = 'SET_CITY';
const SET_CITY_INPUT_VALUE = 'SET_CITY_INPUT_VALUE';
const SET_REGION_CHILDREN_LIST = 'SET_REGION_CHILDREN_LIST';
const SET_REGION_INPUT_VALUE = 'SET_REGION_INPUT_VALUE';
const FILTER_REGION_LIST = 'FILTER_REGION_LIST';
const SET_REGION = 'SET_REGION';
const SELECT_HOUSE = 'SELECT_HOUSE';
const ADD_MARKER = 'ADD_MARKER';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const GET_FAVORITES = 'GET_FAVORITES';
const CHOOSE_HOUSE = 'CHOOSE_HOUSE';



let initialState = {
    isFetching: false,
    isCitySelected: false,
    isRegionSelected: false,
    population: 10000,
    city: '',
    cityList: [],
    regionChildrenList: [],
    region: '',
    regionList: [],
    center:{
        lat: 50.9071953,
        lng: 34.7991894
    },
    selectedHomeInfo: undefined,
    selectHouseMarker: [],
    favorites: [],
    showFavorites: false,
};

const Main = (state = initialState, action) => {

    switch (action.type) {

        case GET_CITY_LIST: {

            let cityList = action.list.geonames.filter(e => e.population > state.population);

            return {
                ...state,
                cityList: cityList
            };
        }

        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case SET_CITY_INPUT_VALUE: {
            return {
                ...state,
                city: action.value,
                region: '',
                regionList: [],
                isCitySelected: false
            }
        }

        case SET_CITY: {
            return {
                ...state,
                city: action.city.name,
                cityList: [],
                isCitySelected: true};
        }

        case SET_REGION_CHILDREN_LIST: {

            let xml = action.regionChildrenList;
            let result = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));

            let regionChildrenList = result['RegionChildren:regionchildren'].response.list.region;

            return {
                ...state,
                regionChildrenList: regionChildrenList
            };
        }


        case FILTER_REGION_LIST: {
            let NewState = {...state};
            let filterLength = NewState.region.length;

            if (NewState.regionChildrenList !== undefined){
                NewState.regionList = NewState.regionChildrenList.filter(
                    e => e.name._text.slice(0,filterLength).toString().toLowerCase() === NewState.region.toString().toLowerCase()
                );
            }


            if (NewState.regionList.length > 5){
                NewState.regionList.splice(5,NewState.regionList.length)
            }

            return {...NewState};
        }

        case SET_REGION_INPUT_VALUE: {
            return {
                ...state,
                region: action.value,
                regionList: [],
                isRegionSelected: false,
            }
        }

        case SET_REGION: {
            let center = {
                lat: Number(action.region.latitude._text),
                lng: Number(action.region.longitude._text)
            };

            return {
                ...state,
                center:center,
                isRegionSelected: true,
                selectedHomeInfo: undefined,
            };
        }

        case SELECT_HOUSE: {
            let NewState = {...state};
            NewState.favorites = [...state.favorites];
            if (NewState.favorites.length >0){
                NewState.favorites.map(e => {
                    return e.mouseover = false
                });
            }
            let xml = action.house;
            let result = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));
            if (result['SearchResults:searchresults'].response !== undefined){
                let homeInfo = result['SearchResults:searchresults'].response.results.result;
                return {...NewState,selectedHomeInfo: homeInfo}
            }



            return {
                ...NewState,
                selectedHomeInfo: 'Информація відсутня'
            }
        }

        case ADD_MARKER: {
            let NewState = {...state};
            NewState.selectHouseMarker = [];
            NewState.selectHouseMarker.push(action.coordinates);

            return {...NewState};
        }

        case ADD_TO_FAVORITES: {
            let NewState = {...state};
            NewState.favorites = [...state.favorites];
            let Favorites = {
                id: state.favorites.length+1,
                Info: state.selectedHomeInfo,
                Marker: state.selectHouseMarker,
                mouseover: false,
            };

            NewState.favorites.push(Favorites);
            NewState.selectHouseMarker = [];

            return {...NewState};
        }

        case GET_FAVORITES: {
            return {
                ...state,
                showFavorites: true
            };
        }

        case CHOOSE_HOUSE: {
            let NewState = {...state};
            NewState.favorites = [...state.favorites];
            NewState.favorites.map(e => {
                if (e.id === action.house.id){
                    return e.mouseover = true
                } else return e.mouseover = false
            });
            return {...NewState}
        }

        default:
            return state;
    }
};


const isFetchingAC = (isFetching) => {
    return {
        type: IS_FETCHING,
        isFetching
    }
};


export const getCityListTC = (data) => {
    return (dispatch) => {
        dispatch(isFetchingAC(true));
        dispatch(setCityValueAC(data));
        API.getCityList(data).then(response => {
            dispatch(getCityListAC(response));
            dispatch(isFetchingAC(false));
        });
    }
};

const getCityListAC = (list) => {
    return {
        type: GET_CITY_LIST,
        list
    }
};

const setCityValueAC = (value) => {
    return {
        type: SET_CITY_INPUT_VALUE,
        value
    }
};

const setCityAC = (city) => {
    return {
        type: SET_CITY,
        city
    }
};

const setRegionChildrenListAC = (regionChildrenList) => {
    return {
        type: SET_REGION_CHILDREN_LIST,
        regionChildrenList
    }
};


export const setCityTC = (city) => {
    return (dispatch) => {
        dispatch(isFetchingAC(true));
        dispatch(setCityAC(city));
        API.getRegion(city).then(response => {
            dispatch(setRegionChildrenListAC(response));
            dispatch(isFetchingAC(false));
        });
    }
};


export const getRegionListTC = (data) => {
    return (dispatch) => {

        dispatch(setRegionValueAC(data));
        dispatch(filterRegionListAC(data));
    }
};

const setRegionValueAC = (value) => {
    return {
        type: SET_REGION_INPUT_VALUE,
        value
    }
};

const filterRegionListAC = (filter) => {
    return {
        type: FILTER_REGION_LIST,
        filter
    }
};


export const setRegionTC = (region) => {
    return (dispatch) => {
        dispatch(setRegionValueAC(region.name._text));
        dispatch(setRegionAC(region));
    }
};

const setRegionAC = (region) => {
    return {
        type: SET_REGION,
        region
    }
};

const selectHouseAC = (house) => {
    return {
        type: SELECT_HOUSE,
        house
    }
};

export const addMarkerAC = (coordinates) => {
    return {
        type: ADD_MARKER,
        coordinates
    }
};

export const selectHouseTC = (address) => {
    return (dispatch) => {
        dispatch(isFetchingAC(true));
        API.selectHouse(address).then(response => {
            dispatch(selectHouseAC(response));
            dispatch(isFetchingAC(false));
        });
    }
};


export const addToFavoritesAC = () => {
    return {
        type: ADD_TO_FAVORITES,
    }
};

export const getFavoritesAC = () => {
    return {
        type: GET_FAVORITES,
    }
};

export const chooseHouseAC = (house) => {
    return {
        type: CHOOSE_HOUSE,
        house
    }
};



export default Main;