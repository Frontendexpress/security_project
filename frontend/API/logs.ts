import axios from "axios"
import { URL_API } from "../constant/url_api"
import AsyncCatch from "../helper/AsyncCatch"
export class LogsApi{
    
    static get_logs(params={}){
        const callback=(config:object)=>{
             return axios.get(`${URL_API}/get_logs`,{params:{...params},...config})
         }
         return AsyncCatch(callback)
     }

}