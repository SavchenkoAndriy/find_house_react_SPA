import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://www.zillow.com/webservice/',
});


const location = axios.create({
    baseURL: 'http://api.geonames.org/',
});



export const API = {
    getRegion(loc) {

        let State = loc.adminCode1;
        let City = loc.name;
        return instance('GetRegionChildren.htm?zws-id=X1-ZWz1hbzthq340b_8qndf&state='+State+'&city='+City+'&childtype=neighborhood').then(
            response => response.data
        )
    },
    selectHouse(address) {

        let arr = address.split(',');

        let Address = arr[0];
        let City = arr[1];
        let State = arr[2].slice(1,3);

        return instance('GetDeepSearchResults.htm?zws-id=X1-ZWz1hbzthq340b_8qndf&address='+Address+'&citystatezip='+City+State).then(
            response => response.data
        )
    },
    getCityList(name) {

        let filter = '&featureClass=P&featureCode=PPLC&featureCode=PPL&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLA3&featureCode=PPLA4';

        return location('searchJSON?username=andriysavchenko1994&country=us&maxRows=5'+filter+'&name_startsWith='+name).then(
            response => response.data
        )
    },
};
