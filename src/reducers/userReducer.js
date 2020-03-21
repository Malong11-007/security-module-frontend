const defaultState = {
  loggedIn : false,
  id:'1234',
  type : '1234',
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default userReducer;