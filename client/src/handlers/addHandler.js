import axios from 'axios';
import { fixCountries, fixDuration } from "../utils";
const addHandler = async (event, form) => {
    event.preventDefault();

    let newActivity = fixCountries(form);
    newActivity = fixDuration(newActivity);

    let clean = false;

    await axios.post('/activities', newActivity)
        .then(response => {
            if (response.data[1]) {
                alert('Activity created!');
                clean = true;
            } else {
                alert('Activity already exists!');
            }
        })
        .catch(() => {
            alert('Something was wrong :(');
            return false;
        });

    return clean;
};

export default addHandler;