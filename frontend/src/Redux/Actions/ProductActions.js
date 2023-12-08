import  axios  from "axios";
import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    CATEGORIZE_LIST_REQUEST,
    CATEGORIZE_LIST_SUCCESS,
    CATEGORIZE_LIST_FAIL,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";

// LIST PRODUCTS
export const listProduct = (keyword = ' ', pageNumber = ' ', categorize = ' ') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        if (keyword === ' ') {
            keyword='';
        }
        const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&categorize=${categorize}`
        );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.respone && error.respone.data.message
                ? error.respone.data.message
                : error.message,
        });
    };
};

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.respone && error.respone.data.message
                ? error.respone.data.message
                : error.message,
        });
    };
};

// PRODUCT REVIEW CREATE
export const createProdcutReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST});
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        await axios.post(
            `/api/products/${productId}/review`, 
            review,
            config,
        );

        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
        if((message === 'Not authorized, token failed')) {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
};

// LIST CATEGORIZE 
export const listCategorzie = () => async (dispatch) => {
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
    };
};