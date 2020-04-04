import { types } from '../actions/userActions.js';

const defaultState = {
	isLoggedIn:false,
  User_ID:'',
  User_Name:'',
  User_Email:'',
  Organization_ID:'',
  Branch_ID:'',
  forms:[],
  modules:[],
  formSelected:''
}

const userReducer = (state = defaultState, {type,payload}) => {
  switch (type) {
  	case types.USER_LOGIN: {
  		return {
  			...state,
  			isLoggedIn:true,
  			...payload
  		}
  	}

  	case types.USER_LOGOUT: {
  		return {
  			...defaultState
  		}
  	}

  	case types.SELECT_FORM: {
  		return {
  			...state,
  			formSelected:payload
  		}
  	}

    default:
      return state;
  }
};

export default userReducer;