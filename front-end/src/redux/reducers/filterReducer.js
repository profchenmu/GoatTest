let initialState = {
  size: [],
  category: null,
  condition: null,
};
export default (state = initialState, action) => {
  switch (action.type){
    case `filter`:
      // let size = state.size;
      // size.push(action.payload)
      // console.log(size, 'eeeeee')
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}