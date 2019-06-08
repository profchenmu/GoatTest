import axios from 'axios';
import { COMMON } from '../api';

export const getBooks = (page, limit) => {
  return (dispatch) => {
    console.log(page, limit)
    axios.get(`${COMMON.GET_ITEMS}?_page=${page}&_limit=${limit}`).then((res)=>{
      dispatch({
        type: `getBooks`,
        payload: res.data
      });
    })
  }
}

export const addMore = (page, limit) => {
  return (dispatch) => {
    axios.get(`${COMMON.GET_ITEMS}?_page=${page}&_limit=${limit}`).then((res)=>{
      dispatch({
        type: `addMore`,
        payload: res.data
      });
    })
  }
}

export const sort = (e) => {
  return (dispatch) => {
    axios.get(`${COMMON.GET_ITEMS}?${e}`).then((res)=>{
      let data = res.data;
      dispatch({
        type: `getBooks`,
        payload: data
      });
    })
  }
}

export const getSneakersFromSize = (size, category, condition, sort, page, needLoading) => {
  let str = '';
  if(size.length>0){
    ((!!category) || (!!condition)) && (str+='&');
    size.forEach((e, i)=>{
      if(i!==0){
        str+='&'
      }
      str+=`size_range_like=((?<![0-9])${e},)|((?<![0-9])${e}$)`
    })
  }
  if(category) {
    ((size.length>0) || (!!condition)) && (str+='&');
    str+=`gender_like=${category}`;
  }
  if(condition) {
    ((size.length>0) || (!!category)) && (str+='&');
    str+=`shoe_condition_like=${condition}`;
  }
  str += `&`;
  str += sort;
  let pageNow = page || 1;
  str += `&_page=${pageNow}&_limit=20`;
  return (dispatch) => {
    if(needLoading){
      dispatch({
        type: `loading`,
        payload: null
      })
    }
    let filter = {size, category};
    dispatch({
      type: `filter`,
      payload: filter
    });
    dispatch({
      type: `sort`,
      payload: sort
    });
    axios.get(`${COMMON.GET_ITEMS}?${str}`).then((res)=>{
      dispatch({
        type: `getBooks`,
        payload: res.data
      });
    })
  }
}

export const getCartFromStorage = () => {
  let data = {
    itemCount: 0,
    cart: []
  }
  let bookCartStr = window.localStorage.getItem('booksCart')
  if(bookCartStr) {
    data = JSON.parse(bookCartStr);
  }
  return {
    type: `getCartFromStorage`,
    payload: data
  }
}
