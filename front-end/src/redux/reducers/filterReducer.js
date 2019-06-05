let initialState = {
  filter: ''
};
export default (state = initialState, action) => {
  switch (action.type){
    case `filterBooks`:
      return Object.assign({}, state, {filter: action.payload});
    default:
      return state;
  }
}