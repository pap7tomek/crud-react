export const getServerPath = () => {
    const hostname = window && window.location && window.location.hostname;
    if(hostname === 'localhost'){
        return "http://localhost:5000/";
    }else {
        return "https://crud-tomek.herokuapp.com/";
    }
}