import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";
import _ from "lodash";

export default function(state={}, action) {
  switch(action.type) {
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, "id");
  case FETCH_POST:
  //First we take out all objects from state and put them in a new object and then build another object with the appropriate id and data.
  //The square brackets are for key interpolation to build a key and assign the object as the value.
    return {...state, [action.payload.data.id]: action.payload.data}
  case DELETE_POST:
    return _.omit(state, action.payload);
  default:
    return state;
  }
}
