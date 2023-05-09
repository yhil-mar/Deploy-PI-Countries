const activityCountries = (activities, activity) => {
    const arrCountries = [];
    const selectedActivity = activities.find(activityOption => activityOption.name === activity);
    selectedActivity.countries.forEach(country=> {
        arrCountries.push(country.id);
    });
    return arrCountries;
};

export default activityCountries;