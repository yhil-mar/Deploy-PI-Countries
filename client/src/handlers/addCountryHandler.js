import validationForm from "../validations/validationForm";

const addCountryHandler = (event, form, setForm, setErrors, setVisButton) => {
    const id = [...event.target.id + ','].join('');

    const addCountry = (prevState) => ({
        ...prevState,
        // countries: prevState.countries + id,
        countries: id + prevState.countries,
    });

    const removeCountry = (prevState) => ({
        ...prevState,
        countries: prevState.countries.replace(id, ''),
    });

    if (!form.countries.includes(id)) {
        setForm(prevState => ({
            ...prevState,
            // countries: prevState.countries + id,
            countries: id + prevState.countries,
        }));
        setErrors(validationForm(addCountry(form), 'errors'));
        setVisButton(validationForm(addCountry(form)));
    } else {
        setForm(prevState => ({
            ...prevState,
            countries: prevState.countries.replace(id, ''),
        }));
        setErrors(validationForm(removeCountry(form), 'errors'));
        setVisButton(validationForm(removeCountry(form)));
    };
};

export default addCountryHandler;