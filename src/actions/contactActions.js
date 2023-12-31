import axios from "axios";

export const getContacts = () => async dispatch => {
  const response = await axios.get(
    "http://127.0.0.1:3000/membros", {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }

    }
  );
  console.log(response.data)
  dispatch({
    type: "GET_CONTACTS",
    payload: response.data
  });
};

export const getContact = id => async dispatch => {
  const response = await axios.get(
    `http://localhost:3000/membros/${id}`
  );
  dispatch({
    type: "GET_CONTACT",
    payload: response.data
  });
};

export const deleteContact = id => async dispatch => {
  await axios.delete(`http://localhost:3000/membros/${id}`);
  dispatch({
    type: "DELETE_CONTACT",
    payload: id
  });
};

export const addContact = contact => async dispatch => {
  const response = await axios.post(
    "http://localhost:3000/membros/",
    contact
  );
  dispatch({
    type: "ADD_CONTACT",
    payload: response.data
  });
};

export const updateContact = contact => async dispatch => {
  const response = await axios.put(
    `http://localhost:3000/membros/${contact.id}`,
    contact
  );
  dispatch({
    type: "UPDATE_CONTACT",
    payload: response.data
  });
};
