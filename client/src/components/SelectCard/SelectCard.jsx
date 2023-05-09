import style from './SelectCard.module.css';
import { addCountryHandler } from '../../handlers/index';
import { fixCountries } from '../../utils';

const SelectCard = ({ id, name, image, form, setForm, setErrors, setVisButton, select, setSelect }) => {

    const handleAddCountry = (event) => {
        addCountryHandler(event, form, setForm, setErrors, setVisButton);
        setSelect(!select);
    };

    return (
        <div id={id} name='countries' className={`${style.card} ${fixCountries(form).countries.includes(id) && style.cardChecked}`} onClick={handleAddCountry}>
            <img className={style.selectCard} id={id} src={image} alt="" width='40rem' />
            <span className={style.textCard} id={id}>{name}</span>
        </div>
    );
};

export default SelectCard;