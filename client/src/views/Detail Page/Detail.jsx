import style from './Detail.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountry, removeCountry } from "../../redux/actions";
import { useParams } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountry(id));
        return () => dispatch(removeCountry());
    }, [id, dispatch]);

    const country = useSelector(state => state.country);

    return (
        <div className={style.detailPage}>
            {country.id ? (
                <div className={style.detailContainer}>
                    <h1 className={style.detailTitle}>{country.name}</h1>
                    <div className={style.imageContainer}>
                        <img src={country.image} className={style.countryImage} alt='' />
                    </div>
                    <h3 className={style.detailText}><u>ID:</u> {country.id}</h3>
                    <h3 className={style.detailText}><u>Continent:</u> {country.continent}</h3>
                    <h3 className={style.detailText}><u>Capital:</u> {country.capital}</h3>
                    {country.subregion !== null && <h3 className={style.detailText}><u>Subregion:</u> {country.subregion}</h3>}
                    {country.area > 0 && <h3 className={style.detailText}><u>Area:</u> {country.area} km²</h3>}
                    <h3 className={style.detailText}><u>Population:</u> {country.population}</h3>
                </div>
            ) : (
                <h4>Loading...</h4>
            )}
        </ div>
    );
};

export default Detail;