let initialState = {
  books: []
};
export default (state = initialState, action) => {
  switch (action.type){
    case `getBooks`:
      const data = { books: action.payload }
      return Object.assign({}, initialState, data);
    default:
      return state;
  }
}