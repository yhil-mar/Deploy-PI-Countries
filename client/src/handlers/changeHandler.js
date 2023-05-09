import validationForm from "../validations/validationForm";

const changeHandler = (event, form, setForm, setErrors, setVisButton) => {

    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    setErrors(validationForm({ ...form, [property]: value }, 'errors'));
    setVisButton(validationForm({ ...form, [property]: value }));
};

export default changeHandler;