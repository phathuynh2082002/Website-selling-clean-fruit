import { 
    CATEGORIZE_CREATE_FAIL,
    CATEGORIZE_CREATE_REQUEST,
    CATEGORIZE_CREATE_RESET,
    CATEGORIZE_CREATE_SUCCESS,
    CATEGORIZE_DELETE_FAIL,
    CATEGORIZE_DELETE_REQUEST,
    CATEGORIZE_DELETE_SUCCESS,
    CATEGORIZE_LIST_FAIL,
    CATEGORIZE_LIST_REQUEST, 
    CATEGORIZE_LIST_SUCCESS,
    CATEGORIZE_UPDATE_FAIL,
    CATEGORIZE_UPDATE_REQUEST,
    CATEGORIZE_UPDATE_RESET,
    CATEGORIZE_UPDATE_SUCCESS,

} from "../Constants/CategorizeConstants";


// LIST CATEGORIZE
export const categorizeListReducer = ( state = { categorizes: [] }, action ) => {
    switch (action.type) {
        case CATEGORIZE_LIST_REQUEST:
            return { loading: true, categorizes: []};
        case CATEGORIZE_LIST_SUCCESS:
            return {
                loading: false,
                categorizes: action.payload,
            };
        case CATEGORIZE_LIST_FAIL:
            return { loading: false, error: action.payload };    
        default:
            return state;
    }
};

// CREATE CATOGORIZE
export const categorizeCreateReducer = ( state = {}, action ) => {
    switch (action.type) {
        case CATEGORIZE_CREATE_REQUEST:
            return { loading: true };
        case CATEGORIZE_CREATE_SUCCESS:
            return { loading: false, success: true, categorize: action.payload };
        case CATEGORIZE_CREATE_FAIL:
            return { loading: false, error: action.payload };    
        case CATEGORIZE_CREATE_RESET:
            return {};    
        default:
            return state;
    }
};

// DELETE CATEGORIZE
export const categorizeDeleteReducer = ( state = {}, action ) => {
    switch (action.type) {
        case CATEGORIZE_DELETE_REQUEST:
            return { loading: true};
        case CATEGORIZE_DELETE_SUCCESS:
            return { loading: false, success: true } ;
        case CATEGORIZE_DELETE_FAIL:
            return { loading: false, error: action.payload };    
        default:
            return state;
    }
};

// UPDATE PRODUCT
export const categorizeUpdateReducer = ( state = { categorize: {} }, action ) => {
    switch (action.type) {
        case CATEGORIZE_UPDATE_REQUEST:
            return { loading: true };
        case CATEGORIZE_UPDATE_SUCCESS:
            return { loading: false, success: true, categorize: action.payload };
        case CATEGORIZE_UPDATE_FAIL:
            return { loading: false, error: action.payload };    
        case CATEGORIZE_UPDATE_RESET:
            return { categorize: {} };    
        default:
            return state;
    }
};