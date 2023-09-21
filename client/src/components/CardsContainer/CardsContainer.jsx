import style from './CardsContainer.module.css';
import Card from "../Card/Card";
import Paginate from '../Paginate/Paginate';
import NoResults from '../NoResults/NoResults';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderCountries, filterCountries, firstPage, orderSelect, filterSelect } from "../../redux/actions";

const CardsContainer = ({ countries, activities, selectedOptions, numPage }) => {

    const dispatch = useDispatch();

    const since = (numPage - 1) * 12;
    const until = numPage * 12;
    const amountPages = Math.ceil(countries.length / 12);
    const viewCountries = countries.slice(since, until);

    const [visibleFilters, setVisibleFilters] = useState(false);

    const openFilters = () => {
        setVisibleFilters(true);
    };

    const closeFilters = () => {
        setVisibleFilters(false);
    };

    const orderHandler = (event) => {
        const orderType = event.target.value;

        dispatch(orderCountries(orderType));
        dispatch(orderSelect(orderType));
        dispatch(firstPage());

        setVisibleFilters(false);
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

        setVisibleFilters(false);
    };

    return (
        <section className={style.cardsContainer}>

            <div className={style.optionsContainer}>

                <div className={`${style.filtersMenuContainer} ${visibleFilters ? style.isVisible : ''}`}>

                    <div className={style.filtersMenu}>

                        <div className={style.exitMenuButton} onClick={closeFilters}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>

                        <div className={style.filterSortContainer}>
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

                        <div className={style.filterSortContainer}>
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

                        <div className={style.filterSortContainer}>
                            <label className={style.selectText} htmlFor='activitiesList'>Filter by Activity: </label>
                            <select id='activitiesList' className={style.selectList} value={selectedOptions.filterOptions.activity} onChange={filterHandler}>
                                <option hidden>Select...</option>
                                <option value='None'>None</option>
                                {Array.isArray(activities) && activities.map(activity => {
                                    return <option key={activity.id} value={activity.name}>{activity.name}</option>
                                })}
                            </select>
                        </div>

                    </div>

                </div>

                <div className={style.filtersMobile} onClick={openFilters}>
                    <svg className={style.filterIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path></svg>
                    <span className={style.filterText}>Sort and Filter</span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg> */}
                </div>

                {
                    countries.length ? <Paginate numPage={numPage} amountPages={amountPages} />
                        : null
                }

            </div>

            <div className={style.countriesContainer}>
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
        </section>
    );
};

export default CardsContainer;