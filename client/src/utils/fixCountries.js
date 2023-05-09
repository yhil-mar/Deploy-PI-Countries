const fixCountries = (form) => {
    const newActivity = {...form};
    newActivity.countries = newActivity.countries.split(',');
    newActivity.countries.pop();
    return newActivity;
};

export default fixCountries;