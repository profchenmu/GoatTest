import axios from 'axios';
import { COMMON } from '../api';

export const getBooks = () => {
  return (dispatch) => {
    axios.get(COMMON.GET_ITEMS).then((res)=>{
      let data = res.data;
      window.localStorage.setItem('books', JSON.stringify(data))
      let temp = [];
      dispatch({
        type: `getBooks`,
        payload: data
      });
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

export const filter = (e) => {
  return {
    type: `filterBooks`,
    payload: e
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
