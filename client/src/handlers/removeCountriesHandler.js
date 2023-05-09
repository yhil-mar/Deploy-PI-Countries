import validationForm from "../validations/validationForm";

const removeCountriesHandler = (event, form, setForm, setErrors, setVisButton) => {
    const id = [...event.target.id + ','].join('');

    const removeCountry = (prevState) => ({
        ...prevState,
        countries: prevState.countries.replace(id, ''),
    });

    setForm(prevState => ({
        ...prevState,
        countries: prevState.countries.replace(id, '')
    }));
    setErrors(validationForm(removeCountry(form), 'errors'));
    setVisButton(validationForm(removeCountry(form)));
};

export default removeCountriesHandler;