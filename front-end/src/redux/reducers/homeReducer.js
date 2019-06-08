let initialState = {
  sneakers: [],
  isLoading: false
};
export default (state = initialState, action) => {
  switch (action.type){
    case `getBooks`:
      return Object.assign({}, state, { sneakers: action.payload, isLoading: false });
    case `addMore`:
      let data = state.sneakers.concat(action.payload);
      console.log(data);
      return Object.assign({}, state, { sneakers: data, isLoading: false });
    case `loading`:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
}