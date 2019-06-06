let initialState = {
  sneakers: []
};
export default (state = initialState, action) => {
  switch (action.type){
    case `getBooks`:
      return Object.assign({}, state, { sneakers: action.payload });
    case `addMore`:
      let data = state.sneakers.concat(action.payload)
      return Object.assign({}, state, { sneakers: data });
    default:
      return state;
  }
}