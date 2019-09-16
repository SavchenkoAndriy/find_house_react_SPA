import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://www.zillow.com/webservice/',
});

const location = axios.create({
    baseURL: 'http://api.geonames.org/',
});

export const API = {
    async getRegion(loc) {
        const State = loc.adminCode1;
        const City = loc.name;
        const response = await instance('GetRegionChildren.htm?zws-id=X1-ZWz1hbzthq340b_8qndf&state='+State+'&city='+City+'&childtype=neighborhood');
        return response.data;
    },
    async selectHouse(address) {
        const arr = address.split(',');
        const Address = arr[0];
        const City = arr[1];
        const State = arr[2].slice(1,3);
        const response = await instance('GetDeepSearchResults.htm?zws-id=X1-ZWz1hbzthq340b_8qndf&address='+Address+'&citystatezip='+City+State);
        return response.data;
    },
    async getCityList(name) {
        const filter = '&featureClass=P&featureCode=PPLC&featureCode=PPL&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLA3&featureCode=PPLA4';
        const response = await location('searchJSON?username=andriysavchenko1994&country=us&maxRows=5'+filter+'&name_startsWith='+name);
        return response.data;
    },
};
