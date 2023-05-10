import { Link, useLocation } from 'react-router-dom';
import style from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoute, setSearch, orderSelect, filterSelect } from '../../redux/actions';
import { useState } from 'react';

const NavBar = () => {
    const { searchInput, selectedOptions } = useSelector(state => state);

    const [searching, setSearching] = useState(searchInput);
    const [keepOptions, setKeepOptions] = useState({
        orderOption: '',
        filterOptions: {
            continent: '',
            activity: '',
        },
    });

    const dispatch = useDispatch();
    const location = useLocation()

    const handleBack = () => {
        if (location.pathname === '/create') {
            dispatch(setSearch(searching));
            dispatch(orderSelect(keepOptions.orderOption));
            dispatch(filterSelect(keepOptions.filterOptions));
        };
        setSearching('');
        setKeepOptions({
            orderOption: '',
            filterOptions: {
                continent: '',
                activity: '',
            },
        });
        dispatch(changeRoute(true));
    };

    const handleKeep = () => {
        setSearching(searchInput);
        setKeepOptions({ ...selectedOptions });
    }

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <header className={style.navBarContainer}>
            {
                location.pathname === '/home' ?
                    <div className={style.navBarOptions}>
                        <button id='homeButton' className={style.button1} onClick={handleReload}>Home</button>
                        <SearchBar />
                        <Link to='/create'>
                            <button className={style.button1} onClick={handleKeep}>Create Activity</button>
                        </Link>
                    </div>
                    :
                    <div className={style.navBarBack}>
                        <Link to='/home'>
                            <button className={style.button1} onClick={handleBack}> Back</button>
                        </Link>
                    </div>
            }
        </header >
    );
};

export default NavBar;