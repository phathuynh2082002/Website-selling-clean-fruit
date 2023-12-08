import axios from "axios";
import {
  CATEGORIZE_CREATE_FAIL,
  CATEGORIZE_CREATE_REQUEST,
  CATEGORIZE_CREATE_SUCCESS,
  CATEGORIZE_DELETE_FAIL,
  CATEGORIZE_DELETE_REQUEST,
  CATEGORIZE_DELETE_SUCCESS,
  CATEGORIZE_LIST_FAIL,
  CATEGORIZE_LIST_REQUEST,
  CATEGORIZE_LIST_SUCCESS,
  CATEGORIZE_UPDATE_FAIL,
  CATEGORIZE_UPDATE_REQUEST,
  CATEGORIZE_UPDATE_SUCCESS,
} from "../Constants/CategorizeConstants";
import { logout } from "./userActions";

// LIST CATEGORIZE
export const listCategorize = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIZE_LIST_REQUEST });
    const { data } = await axios.get(`/api/categorizes/all`);
    dispatch({ type: CATEGORIZE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORIZE_LIST_FAIL,
      payload:
        error.respone && error.respone.data.message
          ? error.respone.data.message
          : error.message,
    });
  }
};

// CREATE CATEGORIZE
export const createCategorize = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIZE_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(name);
    const data = await axios.post(`/api/categorizes/`, { name }, config);
    dispatch({ type: CATEGORIZE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORIZE_CREATE_FAIL,
      payload: message,
    });
  }
};

// DELETE CATEGORIZE
export const deleteCategorize = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIZE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/categorizes/${id}`, config);

    dispatch({ type: CATEGORIZE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORIZE_DELETE_FAIL,
      payload: message,
    });
  }
};

// UPDATE CATEGORIZE
export const updateCategorize = (id, name) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIZE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(id);
    const { data } = await axios.put(`/api/categorizes/${id}`, {name}, config);
    dispatch({ type: CATEGORIZE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORIZE_UPDATE_FAIL,
      payload: message,
    });
  }
};
