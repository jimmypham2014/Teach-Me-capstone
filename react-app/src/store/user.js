const LOAD_OTHER_USERS = "user/LOAD_OTHER_USERS";

const loadOtherUsers = (users) => {
  return {
    type: LOAD_OTHER_USERS,
    payload: users,
  };
};

export const getOneUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(loadOtherUsers([user]));
    return user;
  }
};

export const getAllUsers =() =>async(dispatch)=>{
    const res = await fetch(`/api/users/`);

    if(res.ok){
        const users = await res.json()
        dispatch(loadOtherUsers(users))
    }
}


const defaultState = {};

const otherUsersReducer = (state = defaultState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOAD_OTHER_USERS:
      Object.values(action.payload.users).forEach((user) => {
        newState[user.id] = user;
      });

      return newState;

    default:
      return state;
  }
};

export default otherUsersReducer;
