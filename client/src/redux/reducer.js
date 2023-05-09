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
    CHANGE_ROUTE,
} from './typeActions';
import { organiceCountries, activityCountries } from "../utils";

const initialState = {
    allCountries: [],
    countries: [],
    country: {},
    activities: [],
    searchInput: '',
    selectedOptions: {
        orderOption: '',
        filterOptions: {
            continent: '',
            activity: '',
        }
    },
    numPage: 1,
    changeRoute: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };

        case GET_COUNTRY:
            return { ...state, country: action.payload };

        case GET_ACTIVITIES:
            return { ...state, activities: action.payload };

        case REMOVE_COUNTRY:
            return { ...state, country: {} }

        case ORDER_COUNTRIES:
            if (action.payload === 'A-Z') return {
                ...state,
                countries: organiceCountries(state, 'countries', 'name', 'L-H'),
                allCountries: organiceCountries(state, 'allCountries', 'name', 'L-H')
            }
            else if (action.payload === 'Z-A') return {
                ...state,
                countries: organiceCountries(state, 'countries', 'name', 'H-L'),
                allCountries: organiceCountries(state, 'allCountries', 'name', 'H-L')
            };
            else if (action.payload === 'H-L') return {
                ...state,
                countries: organiceCountries(state, 'countries', 'population', 'H-L'),
                allCountries: organiceCountries(state, 'allCountries', 'population', 'H-L')
            };
            else return {
                ...state,
                countries: organiceCountries(state, 'countries', 'population', 'L-H'),
                allCountries: organiceCountries(state, 'allCountries', 'population', 'L-H')
            };

        case FILTER_COUNTRIES:
            if (action.payload.continent && action.payload.continent !== 'None') {
                if (state.searchInput) {
                    state = {
                        ...state,
                        countries: state.allCountries.filter(country => country.name.toLowerCase().includes(state.searchInput)),
                    };
                    state = {
                        ...state,
                        countries: state.countries.filter(country => country.continent === action.payload.continent),
                    };
                }

                else state = {
                    ...state,
                    countries: state.allCountries.filter(country => country.continent === action.payload.continent),
                };

            } else if (action.payload.continent === 'None') {
                if (state.searchInput) {
                    state = {
                        ...state,
                        countries: state.allCountries.filter(country => country.name.toLowerCase().includes(state.searchInput)),
                    };
                }

                else state = {
                    ...state,
                    countries: state.allCountries,
                };
            };

            const countries = action.payload.continent ? state.countries : state.allCountries;

            if (action.payload.activity && action.payload.activity !== 'None') {
                if (state.searchInput) {
                    state = {
                        ...state,
                        countries: countries.filter(country => country.name.toLowerCase().includes(state.searchInput)),
                    };
                    state = {
                        ...state,
                        countries: state.countries.filter(country => activityCountries(state.activities, action.payload.activity).includes(country.id)),
                    };
                }
                else state = {
                    ...state,
                    countries: countries.filter(country => activityCountries(state.activities, action.payload.activity).includes(country.id)),
                };
            } else if (action.payload.activity === 'None') {
                if (state.searchInput) {
                    state = {
                        ...state,
                        countries: countries.filter(country => country.name.toLowerCase().includes(state.searchInput)),
                    };
                }
                else state = {
                    ...state,
                    countries: countries,
                };
            };

            return { ...state };

        case SEARCH_COUNTRIES:
            if (state.selectedOptions.filterOptions.continent || state.selectedOptions.filterOptions.activity) {
                if (state.selectedOptions.filterOptions.continent && state.selectedOptions.filterOptions.continent !== 'None') {
                    state = {
                        ...state,
                        countries: state.allCountries.filter(country => country.continent === state.selectedOptions.filterOptions.continent),
                    };
                } else if (state.selectedOptions.filterOptions.continent === 'None') {
                    state = {
                        ...state,
                        countries: state.allCountries,
                    };
                }

                const countries = state.selectedOptions.filterOptions.continent ? state.countries : state.allCountries;

                if (state.selectedOptions.filterOptions.activity && state.selectedOptions.filterOptions.activity !== 'None') {
                    state = {
                        ...state,
                        countries: countries.filter(country => activityCountries(state.activities, state.selectedOptions.filterOptions.activity).includes(country.id)),
                    };
                } else if (state.selectedOptions.filterOptions.activity === 'None') {
                    state = {
                        ...state,
                        countries: countries,
                    };
                };

                return {
                    ...state,
                    countries: state.countries.filter(country => country.name.toLowerCase().includes(action.payload.toLowerCase())),
                };
            }
            else {
                return {
                    ...state,
                    countries: state.allCountries.filter(country => country.name.toLowerCase().includes(action.payload.toLowerCase())),
                };
            }

        case SET_SEARCH:
            return {
                ...state,
                searchInput: action.payload,
            };

        case CLEAN_SEARCH:
            return {
                ...state,
                searchInput: '',
            };

        case SHOW_ALL:
            return {
                ...state,
                countries: state.allCountries,
            };

        case ORDER_SELECT:
            return {
                ...state,
                selectedOptions: { ...state.selectedOptions, orderOption: action.payload },
            };

        case FILTER_SELECT:
            if (action.payload.continent) {
                state = {
                    ...state,
                    selectedOptions: { ...state.selectedOptions, filterOptions: { ...state.selectedOptions.filterOptions, continent: action.payload.continent } },
                };
            };
            if (action.payload.activity) {
                state = {
                    ...state,
                    selectedOptions: { ...state.selectedOptions, filterOptions: { ...state.selectedOptions.filterOptions, activity: action.payload.activity } },
                };
            }
            return { ...state };

        case CLEAN_ORDER:
            return {
                ...state,
                selectedOptions: { ...state.selectedOptions, orderOption: '', filterOptions: { ...state.selectedOptions.filterOptions } },
            };

        case CLEAN_FILTERS:
            return {
                ...state,
                selectedOptions: { ...state.selectedOptions, orderOption: state.selectedOptions.orderOption, filterOptions: { continent: '', activity: '' } },
            };

        case NEXT_PAGE:
            return {
                ...state,
                numPage: state.numPage + 1,
            };

        case PREV_PAGE:
            return {
                ...state,
                numPage: state.numPage - 1,
            };

        case FIRST_PAGE:
            return {
                ...state,
                numPage: 1,
            };

        case CHANGE_ROUTE:
            return {
                ...state,
                changeRoute: action.payload,
            };

        default:
            return { ...state };
    };
};

export default rootReducer;