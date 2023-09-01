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
            <div className={style.imageContainer} id={id}>
                <img className={style.selectImage} id={id} src={image} />
            </div>
            <h6 className={style.textCard} id={id}>{name}</h6>
        </div>
    );
};

export default SelectCard;