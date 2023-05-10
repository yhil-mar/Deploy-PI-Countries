const cleanForm = (setForm) => {
    setForm({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        countries: '',
    });
    return true;
};

export default cleanForm;