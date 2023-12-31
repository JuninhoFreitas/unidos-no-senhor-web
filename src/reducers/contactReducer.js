const initialState = {
  membros: [],
  membro: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_CONTACTS":{
      console.log('state', state)
      console.log('action', action)
        return { ...state, membros: action.payload };
      }
    case "GET_CONTACT":
      return { ...state, membro: action.payload };
    case "DELETE_CONTACT":
      return {
        ...state,
        membros: state.membros.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return { ...state, membros: [action.payload, ...state.contacts] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        membros: state.membros.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
}
