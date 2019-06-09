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
      console.log(data);
      return Object.assign({}, state, { sneakers: data, isLoading: false });
    case `loading`:
      return Object.assign({}, state, { isLoading: `loading` });
    case `showMoreLoading`:
      console.log('aaaaaaaaa')
      return Object.assign({}, state, { isLoading: `showMoreLoading` });
    default:
      return state;
  }
}