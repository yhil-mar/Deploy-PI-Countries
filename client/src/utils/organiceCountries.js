const organiceCountries = (state, subState, prop, order) => {
    if (order === 'H-L') {
        return state[subState].sort((a, b) => {
            if (a[prop] > b[prop]) return -1;
            if (a[prop] < b[prop]) return 1;
            return 0;
        });
    } else
        return state[subState].sort((a, b) => {
            if (a[prop] < b[prop]) return -1;
            if (a[prop] > b[prop]) return 1;
            return 0;
        });
};

export default organiceCountries