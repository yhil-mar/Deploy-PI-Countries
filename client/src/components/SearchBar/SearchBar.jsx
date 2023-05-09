import style from './SearchBar.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanFilters, cleanSearch, firstPage, searchCountries, setSearch, showAll } from "../../redux/actions";

const SearchBar = () => {

    const { changeRoute, searchInput } = useSelector(state => state);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setSearch(event.target.value));
        // dispatch(cleanFilters());
        dispatch(firstPage());
    };
    const handleShowAll = (event) => {
        event.preventDefault();
        dispatch(showAll());
        dispatch(cleanFilters());
        dispatch(cleanSearch());
    };

    useEffect(() => {
        if (!changeRoute) {
            dispatch(searchCountries(searchInput));
        };
    }, [searchInput]);

    return (
        <div className={style.searchBar}>
            <input className={style.searchInput} type="search" value={searchInput} placeholder="Search country..." onChange={handleChange} />
            <button className={style.button2} onClick={handleShowAll}>Show All</button>
        </ div>
    );
};

export default SearchBar;