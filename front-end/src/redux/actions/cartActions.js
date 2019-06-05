export const addItem = (data) => {
  return (dispatch) => {
      dispatch({
        type: `addItem`,
        payload: data
      })
  }
}
export const subItem = (data) => {
  return (dispatch) => {
      dispatch({
        type: `subItem`,
        payload: data
      })
  }
}
export const clearCart = () => {
  return {
    type: `clearCart`,
    payload: {
      itemCount: 0,
      cart: []
    }
  }
}