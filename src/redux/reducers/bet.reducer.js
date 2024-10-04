const initialState = {
    activeBets: [],
    betHistory: [],
    error: null,
  };
  
  const betsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ACTIVE_BETS':
        return {
          ...state,
          activeBets: action.payload,
        };
      case 'SET_BET_HISTORY':
        return {
          ...state,
          betHistory: action.payload,
        };
      case 'BET_OPERATION_FAILURE':
        return {
          ...state,
          error: action.error,
        };
        case 'UPDATE_BET_SUCCESS':
          return {
            ...state,
            activeBets: state.activeBets.map((bet) =>
              bet.id === action.payload.id ? action.payload : bet
            ),
          };
      default:
        return state;
    }
  };
  
  export default betsReducer;
  