let initialState = {
  sort: `_sort=release_date_unix&_order=desc`
};
export default (state = initialState, action) => {
  switch (action.type){
    case `sort`:
      return Object.assign({}, state, {sort: action.payload});
    default:
      return state;
  }
}