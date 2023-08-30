import style from './Home.module.css'
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeRoute, filterCountries, getActivities, getCountries, orderCountries, searchCountries } from "../../redux/actions";
import ChargingScreen from '../../components/ChargingScreen/ChargingScreen';

const Home = () => {

    const dispatch = useDispatch();

    const { allCountries, countries, activities, selectedOptions, searchInput, numPage } = useSelector(state => state);

    useEffect(() => {
        !countries.length && dispatch(getCountries());
        dispatch(changeRoute(false));
        dispatch(searchCountries(searchInput));
        dispatch(getActivities());

        selectedOptions.orderOption && dispatch(orderCountries(selectedOptions.orderOption));
        Object.keys(selectedOptions.filterOptions).length && dispatch(filterCountries(selectedOptions.filterOptions));

    }, [dispatch]);

    return (

        <div className={style.homeContainer}>

            {
                allCountries.length
                    ? <CardsContainer
                        countries={countries}
                        activities={activities}
                        selectedOptions={selectedOptions}
                        numPage={numPage} />
                    : <ChargingScreen />
            }

        </ div>

    );
};

export default Home;