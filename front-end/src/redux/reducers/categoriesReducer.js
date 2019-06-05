let initialState = {
  categories: []
};
export default (state = initialState, action) => {
  switch (action.type){
    case `getCategories`:
      const data = {categories: action.payload}
      return Object.assign({}, state, data);
    default:
      return state;
  }
}