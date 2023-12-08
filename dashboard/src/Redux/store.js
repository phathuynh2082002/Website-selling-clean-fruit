import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import { productCreateReducer, productDeleteReducer, productEditReducer, productListReducer, productUpdateReducer } from "./Reducers/ProductReducers";
import { orderDeliveredReducer, orderDetailsReducer, orderListReducer } from "./Reducers/OrderReducers";
import { categorizeCreateReducer, categorizeDeleteReducer, categorizeListReducer, categorizeUpdateReducer } from "./Reducers/CategorizeReducer";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDelivered: orderDeliveredReducer,
    categorizeList: categorizeListReducer,
    categorizeCreate: categorizeCreateReducer,
    categorizeDelete: categorizeDeleteReducer,
    categorizeUpdate: categorizeUpdateReducer,
    
});

//Login
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: {
        userInfo: userInfoFromLocalStorage,
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;