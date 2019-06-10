let initialState = {
  sneakers: [],
  isLoading: false
};
export default (state = initialState, action) => {
  switch (action.type){
    case `getList`:
      return Object.assign({}, state, { sneakers: action.payload, isLoading: false });
    case `showMore`:
      let data = state.sneakers.concat(action.payload);
      return Object.assign({}, state, { sneakers: data, isLoading: false });
    case `loading`:
      return Object.assign({}, state, { isLoading: `loading` });
    case `showMoreLoading`:
      return Object.assign({}, state, { isLoading: `showMoreLoading` });
    default:
      return state;
  }
}