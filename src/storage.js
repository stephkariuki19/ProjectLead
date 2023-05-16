export default class Storage{
    static addToStorage(data){
        let storage = localStorage.setItem("planner",JSON.stringify(data));//add to local storage
        return storage
    }
    static getStorage(){//get from local storage or use empty array if none
        let storage = localStorage.getItem("planner") ===null? [] : JSON.parse(localStorage.getItem("planner"));
        return storage
    }
}