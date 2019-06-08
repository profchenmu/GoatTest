let initialState = {
  details: {},
  isLoading: false
};
export default (state = initialState, action) => {
  switch (action.type){
    case `getDetails`:
      const data = {details: action.payload, isLoading: false}
      return Object.assign({}, state, data);
    case `loading`:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
}