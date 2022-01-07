
const Reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN_START" :
      return {
        user: null,
        isFeatching: true,
        error: false
      }
    case "LOGIN_SUCCESS" : 
      return {
        user: action.payload,
        isFeatching: true,
        error: false
      }
    case "LOGIN_FAIL" : 
      return {
        user: null, 
        isFeatching: false,
        error: true
      }
    case "LOGOUT" : 
      return {
        user: null,
        isFeatching: false,
        error: false
      }
    default: 
      return state; 
  }
}

export default Reducer; 