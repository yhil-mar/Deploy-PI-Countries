import axios from 'axios';
import {
    GET_COUNTRIES,
    GET_COUNTRY,
    GET_ACTIVITIES,
    ORDER_COUNTRIES,
    REMOVE_COUNTRY,
    FILTER_COUNTRIES,
    SEARCH_COUNTRIES,
    SET_SEARCH,
    CLEAN_SEARCH,
    SHOW_ALL,
    ORDER_SELECT,
    FILTER_SELECT,
    CLEAN_ORDER,
    CLEAN_FILTERS,
    NEXT_PAGE,
    PREV_PAGE,
    FIRST_PAGE,
    CHANGE_ROUTE
} from './typeActions';

export const getCountries = () => {
    return async (dispatch) => {
        const response = await axios.get('/countries');
        const countries = response.data;
        dispatch({ type: GET_COUNTRIES, payload: countries });
    };
};

export const getCountry = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/countries/${id}`);
        const country = response.data;
        dispatch({ type: GET_COUNTRY, payload: country });
    };
};

export const getActivities = () => {
    return async (dispatch) => {
        const response = await axios.get('/activities');
        const activities = response.data;
        dispatch({ type: GET_ACTIVITIES, payload: activities });
    };
}

export const removeCountry = () => {
    return { type: REMOVE_COUNTRY };
};

export const orderCountries = (order) => {
    return { type: ORDER_COUNTRIES, payload: order };
};

export const filterCountries = (valuesToFilter) => {
    return { type: FILTER_COUNTRIES, payload: valuesToFilter };
};

export const searchCountries = (input) => {
    return { type: SEARCH_COUNTRIES, payload: input };
};

export const setSearch = (search) => {
    return { type: SET_SEARCH, payload: search };
};

export const cleanSearch = () => {
    return { type: CLEAN_SEARCH };
};

export const showAll = () => {
    return { type: SHOW_ALL };
};

export const orderSelect = (orderType) => {
    return { type: ORDER_SELECT, payload: orderType };
};

export const filterSelect = (filterOptions) => {
    return { type: FILTER_SELECT, payload: filterOptions };
};

export const cleanOrder = () => {
    return { type: CLEAN_ORDER };
};

export const cleanFilters = () => {
    return { type: CLEAN_FILTERS };
};

export const nextPage = () => {
    return { type: NEXT_PAGE }
};

export const prevPage = () => {
    return { type: PREV_PAGE }
};

export const firstPage = () => {
    return { type: FIRST_PAGE }
};

export const changeRoute = (changeRoute) => {
    return { type: CHANGE_ROUTE, payload: changeRoute };
};