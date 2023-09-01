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

    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        dispatch(getCountries());
        dispatch(cleanSearch());
        dispatch(cleanFilters())
    }, [dispatch]);

    const handleChange = (event) => {
        changeHandler(event, form, setForm, setErrors, setVisButton);
    };

    const handleAdd = async (event) => {
        setShowLoading(true);
        await addHandler(event, form) && cleanForm(setForm) && setVisButton(!visButton);
        setShowLoading(false);
    };

    const handleRemoveCountries = (event) => {
        removeCountriesHandler(event, form, setForm, setErrors, setVisButton);
        setSelect(false);
    };

    return (
        <div className={style.pageContainer}>

            <form className={style.formContainer} autoComplete='off'>

                <h1 className={style.formTitle}>¡Create an activity!</h1>

                <div className={style.formField}>
                    <label className={style.labelField} htmlFor="name">Name: </label>
                    <input className={style.formInput} type="text" name="name" value={form.name} onChange={handleChange} />
                    <span className={style.warning}>{errors.name}</span>
                </div>

                <div className={style.formField}>
                    <label className={style.labelField} htmlFor="duration">Duration (hours): </label>
                    <input
                        className={style.formInput}
                        type="number"
                        name="duration"
                        value={form.duration}
                        min={1}
                        max={24}
                        onChange={handleChange} />
                    <span className={style.warning}>{errors.duration}</span>
                </div>

                <div className={style.formField}>
                    <label className={style.labelField} htmlFor="difficult">Difficult (min 1 - max 5): </label>
                    <select className={style.formSelect} name='difficult' value={form.difficult} onChange={handleChange}>
                        <option hidden>...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <span className={style.warning}>{errors.difficult}</span>
                </div>

                <div className={style.formField}>
                    <label className={style.labelField} htmlFor="season">Season: </label>
                    <select className={style.formSelect} name='season' value={form.season} onChange={handleChange}>
                        <option hidden>Select...</option>
                        <option>Summer</option>
                        <option>Fall</option>
                        <option>Winter</option>
                        <option>Spring</option>
                    </select>
                    <span className={style.warning}>{errors.season}</span>
                </div>

                <div className={`${style.formField} ${style.countriesField}`}>
                    <label className={style.labelField} htmlFor="countries">Countries: </label>
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
                </div>

                <button className={style.submitButton} disabled={!visButton} onClick={handleAdd}>Add</button>

                <div className={`${style.sendLoading} ${showLoading ? style.sending : ''}`}>
                    <div className={style.sendLoadingContainer}>
                        <h4 className={style.chargingTitle}>Creating Activity...</h4>
                        <svg className={style.spinnerCharge} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" stroke="none">
                                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
                            </path>
                        </svg>
                    </div>
                </div>

            </form>
        </div>
    );

};

export default Form;