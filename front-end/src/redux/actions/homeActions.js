import axios from 'axios';
import { COMMON } from '../api';

export const getBooks = (page, limit) => {
  return (dispatch) => {
    console.log(page, limit)
    axios.get(`${COMMON.GET_ITEMS}?_page=${page}&_limit=${limit}`).then((res)=>{
      let data = res.data;
      console.log(data)
      
      dispatch({
        type: `getBooks`,
        payload: data
      });
      let temp = [];
      data.forEach(e => {
        if(e.categories) {
          temp = new Set([...temp, ...e.categories]);
          temp = [...temp]
        }
      });
      window.localStorage.setItem('categories', JSON.stringify(temp))
      dispatch({
        type: `getCategories`,
        payload: temp
      });
    })
  }
}

export const addMore = (page, limit) => {
  return (dispatch) => {
    console.log(page, limit)
    axios.get(`${COMMON.GET_ITEMS}?_page=${page}&_limit=${limit}`).then((res)=>{
      let data = res.data;
      console.log(data)
      
      dispatch({
        type: `addMore`,
        payload: data
      });
    })
  }
}

export const sort = (e) => {
  return (dispatch) => {
    axios.get(`${COMMON.GET_ITEMS}?${e}`).then((res)=>{
      let data = res.data;
      console.log(data)
      dispatch({
        type: `getBooks`,
        payload: data
      });
    })
  }
}

export const getSneakersFromSize = (e) => {
  let str = '';
  e.forEach((e, i)=>{
    if(e.selected) {
      if(i!==0){
        str+='&'
      }
      str+=`size_range_like=(${e.size},)|(${e.size}$)`
    }
  })
  console.log(str)
  return (dispatch) => {
    axios.get(`${COMMON.GET_ITEMS}?${str}`).then((res)=>{
      console.log(res)
  //     let data = res.data;
  //     console.log(data)
  //     dispatch({
  //       type: `getBooks`,
  //       payload: data
  //     });
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
