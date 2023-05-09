const validationForm = (form, state) => {
    const regex = /^[A-Z ]+$/i;
    const errors = {};
    let visButton = true;

    if (!form.name) errors.name = '*Required field!';
    else if (!regex.test(form.name)) errors.name = "*Just must have letters!";
    else if (form.name.length < 3) errors.name = '*Must have at least 3 characters!';
    else if (form.name.length > 25) errors.name = '*25 characters maximum!';
    else if (form.name.includes('  ')) errors.name = "*Can not have more than 2 spaces in a row!";
    else if (form.name[0] === ' ' || form.name[form.name.length - 1] === ' ') errors.name = "*Can not have leading and trailing spaces!";

    if (!form.difficult) errors.difficult = '*Required field!';

    if (!form.duration) errors.duration = '*Required field!';
    else if (form.duration < 0) errors.duration = '*Must be a possitive number!';
    else if (form.duration <= 0) errors.duration = '*1 hour minimum!';
    else if (form.duration > 24) errors.duration = '*24 hours maximum!';

    if (!form.season) errors.season = '*Required field!';

    if (!form.countries) errors.countries = '*Must have at least 1 country!';

    if (Object.keys(errors).length) visButton = false;

    if (state === 'errors') return errors;
    else return visButton;
};

export default validationForm;