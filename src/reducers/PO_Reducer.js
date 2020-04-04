import { types } from '../actions/PO_Actions.js';

const defaultState = {
  lines:[]
}

const PO_Reducer = (state = defaultState, {type,payload}) => {
  switch (type) {
  	case types.ADD_LINE: {
  		return {
        ...state,
        lines:[...state.lines,payload]
  		}
  	}

    case types.EDIT_LINE: { // to be done
      return {
        ...state
      }
    }

    case types.REMOVE_LINE: {
      return {
        ...state,
        lines: state.lines.filter(line => line.Item_ID !== payload)
      }
    } 

    case types.CLEAR_LINES: {
      return {
        ...defaultState
      }
    } 

    default:
      return state;
  }
};

export default PO_Reducer;