import { Link, useLocation } from 'react-router-dom';
import style from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoute, setSearch } from '../../redux/actions';
import { useState } from 'react';

const NavBar = () => {
    const { searchInput } = useSelector(state => state);
    const [searching, setSearching] = useState(searchInput)
    const dispatch = useDispatch();
    const location = useLocation()

    const handleBack = () => {
        location.pathname === '/create' && dispatch(setSearch(searching));
        setSearching('');
        dispatch(changeRoute(true));
    };

    const handleKeep = () => {
        setSearching(searchInput);
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