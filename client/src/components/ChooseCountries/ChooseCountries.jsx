import style from './ChooseCountries.module.css';
import SelectCard from '../SelectCard/SelectCard';
import SearchBar from '../SearchBar/SearchBar';
import { fixCountries, indexFound } from '../../utils';
import { removeCountriesHandler } from '../../handlers';

const ChooseCountries = ({ isOpen, closeModel, countries, allCountries, form, setForm, setErrors, setVisButton, select, setSelect }) => {


    const handleRemoveCountries = (event) => {
        removeCountriesHandler(event, form, setForm, setErrors, setVisButton);
    };

    return (
        <div className={`${style.modal} ${isOpen && style.isOpen}`}>

            <div className={style.modalContainer}>

                <div className={style.modalHeader}>

                    <div className={style.headerOptions}>
                        <button onClick={closeModel} className={style.modalButton}>Ok</button>
                        <SearchBar />
                    </div>

                    <div className={style.flagsContainer}>
                        {fixCountries(form).countries.map(country => {
                            return <div key={country} className={style.imageContainer}>
                                <img
                                    key={country}
                                    id={allCountries[indexFound(allCountries, country)].id}
                                    className={style.images}
                                    onClick={handleRemoveCountries}
                                    src={allCountries[indexFound(allCountries, country)].image}
                                    alt='' />
                            </div>
                        })}
                    </div>

                </div>


                <div className={style.selectCardsContainer}>
                    {countries.map(countrie => {
                        return <SelectCard
                            key={countrie.id}
                            id={countrie.id}
                            name={countrie.name}
                            image={countrie.image}
                            form={form}
                            setForm={setForm}
                            setErrors={setErrors}
                            setVisButton={setVisButton}
                            select={select}
                            setSelect={setSelect}
                        />
                    })}
                </div>

            </div>
        </div>
    );
};

export default ChooseCountries;