import { GET_CLIENTS } from "../action-types";
import axios from 'axios';

export const getClients = () => {
    return async (dispatch) => {
        try{
            const { data } = await axios.get('http://localhost:3000/clients/')
            console.log('clients', data)
            if(data){
                dispatch({
                    type: GET_CLIENTS,
                    payload: data
                })
            }

        }catch(err){
            console.log(err)
        }
    }
}