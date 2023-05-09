import style from './CardsContainer.module.css';
import Card from "../Card/Card";
import Paginate from '../Paginate/Paginate';
import NoResults from '../NoResults/NoResults';
import { useDispatch } from 'react-redux';
import { orderCountries, filterCountries, firstPage, orderSelect, filterSelect } from "../../redux/actions";

const CardsContainer = ({ countries, activities, selectedOptions, numPage }) => {

    const dispatch = useDispatch();

    const since = (numPage - 1) * 10;
    const until = numPage * 10;
    const amountPages = Math.ceil(countries.length / 10);
    const viewCountries = countries.slice(since, until);

    const orderHandler = (event) => {
        const orderType = event.target.value;

        dispatch(orderCountries(orderType));
        dispatch(orderSelect(orderType));
        dispatch(firstPage());
    };

    const filterHandler = (event) => {
        const filterType = event.target.id;
        const filterValue = event.target.value;
        const valuesToFilter = { ...selectedOptions.filterOptions };

        if (filterType === 'continentList') {
            valuesToFilter.continent = filterValue;
            dispatch(filterCountries(valuesToFilter));
        } else {
            valuesToFilter.activity = filterValue;
            dispatch(filterCountries(valuesToFilter));
        };
        dispatch(filterSelect(valuesToFilter));
        dispatch(firstPage());
    };

    return (
        <div>
            <div className={style.selectContainer}>

                <div className={style.sortContainer}>
                    <label className={style.selectText} htmlFor="orderList">Sort by: </label>
                    <select id="orderList" className={style.selectList} value={selectedOptions.orderOption} onChange={orderHandler}>
                        <option hidden>Select...</option>
                        <optgroup label="Country Name">
                            <option value="A-Z">Country Name: A to Z</option>
                            <option value="Z-A">Country Name: Z to A</option>
                        </optgroup>
                        <optgroup label="Population">
                            <option value="H-L">Population: High to Low</option>
                            <option value="L-H">Population: Low to High</option>
                        </optgroup>
                    </select>
                </div>

                <div className={style.filterByContinent}>
                    <label className={style.selectText} htmlFor='continentList'>Filter by Continent: </label>
                    <select id="continentList" className={style.selectList} value={selectedOptions.filterOptions.continent} onChange={filterHandler}>
                        <option hidden>Select...</option>
                        <option value='None'>None</option>
                        <option value='Africa'>Africa</option>
                        <option value='Antarctica'>Antarctica</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='North America'>North America</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='South America'>South America</option>
                    </select>
                </div>

                <div className={style.filterByTouristic}>
                    <label className={style.selectText} htmlFor='activitiesList'>Filter by Touristic Activity: </label>
                    <select id='activitiesList' className={style.selectList} value={selectedOptions.filterOptions.activity} onChange={filterHandler}>
                        <option hidden>Select...</option>
                        <option value='None'>None</option>
                        {Array.isArray(activities) && activities.map(activity => {
                            return <option key={activity.id} value={activity.name}>{activity.name}</option>
                        })}
                    </select>
                </div>

                <div>
                    {
                        countries.length ? <Paginate numPage={numPage} amountPages={amountPages} />
                            : null
                    }
                </div>

            </div>

            <div className={style.cardsContainer}>
                {viewCountries.map(country => {
                    return <Card
                        key={country.id}
                        id={country.id}
                        name={country.name}
                        continent={country.continent}
                        image={country.image}
                    />
                })}
            </div>
            {
                !countries.length
                    ? <NoResults />
                    : null
            }
        </div>
    );
};

export default CardsContainer;