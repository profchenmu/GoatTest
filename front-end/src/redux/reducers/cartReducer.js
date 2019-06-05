let initialState = {
  cart: [],
  itemCount: 0
};
export default (state = initialState, action) => {
  let {cart, itemCount} = state;
  
  switch (action.type){
    case `addItem`:
      itemCount++;
      let found = false;
      cart = cart.map((e, i) => {
        if(e.isbn === action.payload.isbn){
          e.count++
          found = true;
        }
        return e;
      })
      if(!found){
        action.payload.count = 1
        cart.push(action.payload);
      }
      
      return Object.assign({}, state, {cart: cart, itemCount});
    case `subItem`:
      itemCount--;
      let toRemove = -1;
      cart = cart.map((e, i) => {
        if(e.isbn === action.payload.isbn){
          if(e.count > 1){
            e.count--
          }else{
            toRemove = i;
          }
        }
        return e;
      })
      if(toRemove>=0){
        cart.splice(toRemove, 1)
      }
      return Object.assign({}, state, {cart: cart, itemCount});
    case `getCartFromStorage`:
      return Object.assign({}, state, action.payload);
    case `clearCart`:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}