import axios from 'axios';
import { COMMON } from '../api';

export const getSneakersFromSize = (size, category, condition, sort, page, loadingType, isShowMore) => {
  let str = '';
  if(size.length>0){
    size.forEach((e, i)=>{
      if(i!==0){
        str+='&'
      }
      str+=`size_range_like=((?<![0-9])${e},)|((?<![0-9])${e}$)`
    })
  }
  if(category) {
    (str.length>0) && (str+='&')
    str+=`gender_like=${category}`;
  }
  if(condition) {
    (str.length>0) && (str+='&')
    str+=`shoe_condition_like=${condition}`;
  }
  if(sort) {
    (str.length>0) && (str+='&')
    str += sort;
  }
  let pageNow = page || 1;
  (str.length>0) && (str+='&')
  str += `_page=${pageNow}&_limit=20`;
  return (dispatch) => {
    if(loadingType){
      console.log(loadingType, 'lllllll')
      dispatch({
        type: loadingType,
        payload: null
      })
    }
    let filter = {size, category, condition};
    dispatch({
      type: `filter`,
      payload: filter
    });
    dispatch({
      type: `sort`,
      payload: sort
    });
    axios.get(`${COMMON.GET_ITEMS}?${str}`).then((res)=>{
      let type = isShowMore?`showMore`:`getList`;
      dispatch({
        type,
        payload: res.data
      });
    })
  }
}

