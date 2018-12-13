class Helper{
    static baseURL(){
        return "https://api.foursquare.com/v2";
    }
    // client_id=blah&client_secret=blah&v=blah
    static auth(){
        const keys={
            client_id:'RJXDZ3NCXRVZO1CTXMNENSCCA1NWIGG5SV0DSAUGHAUZ2LMX',
            client_secret:'YPFNNHKRYYOZOD4G4ISWOGRKXILJPYAFTSS5SEYQEIKEX03I',
            v:"20181213"
        };
        return Object.keys(keys)
            .map(key=>`${key}=${keys[key]}`)
            .join('&')
    }
    static urlBuilder(urlParams){
        if(!urlParams){
            return ""
        }
        return Object.keys(urlParams)
            .map(key=>`${key}=${urlParams[key]}`)
            .join('&');
    }
    static headers(){
        return{
            Accept:"application/json"
        }
    }
    static simpleFetch(endPoint,method,urlParams){
        let requestData={
            method,
            headers:Helper.headers()
        };
        return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`,
               requestData
        ).then(res=>res.json())
    }
}
export default class  SquareAPI{
    static search(urlParams){
        return Helper.simpleFetch("/venues/search","GET",urlParams)
    }
    static venueDetails(venue_id){
        return Helper.simpleFetch(`/venues/${venue_id}`,"GET");
    }
    static venuePhotos(venue_id){
        return Helper.simpleFetch(`/venues/${venue_id}/photos`,"GET");
    }
}