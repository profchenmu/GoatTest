import axios from 'axios';
import { COMMON } from '../api';

export const getDetails = (id) => {
  return (dispatch) => {
    dispatch({
      type: `loading`,
      payload: null
    })
    axios.get(`${COMMON.GET_ITEMS}/${id}`).then((res)=>{
      let data = res.data;
      
      dispatch({
        type: `getDetails`,
        payload: data
      });
    })
  }
}