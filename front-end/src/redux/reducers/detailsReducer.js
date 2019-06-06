let initialState = {
  details: {}
};
export default (state = initialState, action) => {
  switch (action.type){
    case `getDetails`:
      const data = {details: action.payload}
      return Object.assign({}, state, data);
    default:
      return state;
  }
}