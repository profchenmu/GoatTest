import axios from 'axios';
import { COMMON } from '../api';

export const getDetails = (id) => {
  return (dispatch) => {
    axios.get(`${COMMON.GET_ITEMS}/${id}`).then((res)=>{
      let data = res.data;
      console.log(data)
      
      dispatch({
        type: `getDetails`,
        payload: data
      });
    })
  }
}