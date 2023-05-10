import style from './Form.module.css';
import ChooseCountries from '../../components/ChooseCountries/ChooseCountries';
import { useEffect, useState } from "react";
import { changeHandler, addHandler, removeCountriesHandler } from '../../handlers/index';
import { useModal } from '../../hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import { cleanForm, fixCountries, indexFound } from '../../utils';
import { cleanFilters, cleanSearch, getCountries } from '../../redux/actions';

const Form = () => {

    const { allCountries, countries } = useSelector(state => state);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        countries: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        countries: '',
    });

    const [visButton, setVisButton] = useState(false);

    const [select, setSelect] = useState(false);

    const { isOpen, openModel, closeModel } = useModal(false);

    useEffect(() => {
        dispatch(getCountries());
        dispatch(cleanSearch());
        dispatch(cleanFilters())
    }, [dispatch]);

    const handleChange = (event) => {
        changeHandler(event, form, setForm, setErrors, setVisButton);
    };

    const handleAdd = async (event) => {
        await addHandler(event, form) && cleanForm(setForm);
    };

    const handleRemoveCountries = (event) => {
        removeCountriesHandler(event, form, setForm, setErrors, setVisButton);
        setSelect(false);
    };

    return (
        <div className={style.pageContainer}>
            <div className={style.boxForm}>
                <h1 className={style.formTitle}>¡Create an activity!</h1>
                <form className={style.formContainer} autoComplete='off'>

                    <label htmlFor="name">Name: </label>
                    <input className={style.formInput} type="text" name="name" value={form.name} onChange={handleChange} />

                    <span className={style.warning}>{errors.name}</span>

                    <label htmlFor="duration">Duration (hours): </label>
                    <input
                        className={style.formInput}
                        type="number"
                        name="duration"
                        value={form.duration}
                        min={1}
                        max={24}
                        onChange={handleChange} />
                    <span className={style.warning}>{errors.duration}</span>

                    <label htmlFor="difficult">Difficult (min 1 - max 5): </label>
                    <select className={style.formSelect} name='difficult' value={form.difficult} onChange={handleChange}>
                        <option hidden>...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <span className={style.warning}>{errors.difficult}</span>

                    <label htmlFor="season">Season: </label>
                    <select className={style.formSelect} name='season' value={form.season} onChange={handleChange}>
                        <option hidden>Select...</option>
                        <option>Summer</option>
                        <option>Fall</option>
                        <option>Winter</option>
                        <option>Spring</option>
                    </select>
                    <span className={style.warning}>{errors.season}</span>

                    <label htmlFor="countries">Countries: </label>
                    <div className={style.flagsContainer}>
                        {fixCountries(form).countries.map(country => {
                            return < div className={style.imageContainer} key={country}>
                                <img
                                    key={country}
                                    id={allCountries[indexFound(allCountries, country)].id}
                                    className={style.imagesSelected}
                                    onClick={handleRemoveCountries}
                                    src={allCountries[indexFound(allCountries, country)].image}
                                    alt='' />
                            </div>
                        })}
                    </div>
                    <button className={style.selectButton} onClick={openModel}>Select Countries...</button>
                    <ChooseCountries
                        isOpen={isOpen}
                        closeModel={closeModel}
                        form={form}
                        countries={countries}
                        allCountries={allCountries}
                        setForm={setForm}
                        setErrors={setErrors}
                        setVisButton={setVisButton}
                        select={select}
                        setSelect={setSelect} />
                    <span className={style.warning}>{errors.countries}</span>

                    <div className={style.addContainer}>
                        <button className={style.submitButton} disabled={!visButton} onClick={handleAdd}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default Form;