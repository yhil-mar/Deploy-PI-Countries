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
        <header className={style.navBarSection}>

            {
                location.pathname === '/home' ?
                    <section className={style.navBarContainerMain}>
                        <button id='homeButton' className={style.desktopButton} onClick={handleReload}>Home</button>
                        <div className={style.mobileButton} onClick={handleReload}>
                            <svg className={style.iconButton} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
                            </svg>
                        </div>
                        <SearchBar />
                        <Link to='/create'>
                            <button className={style.desktopButton} onClick={handleKeep}>Create Activity</button>
                            <div className={style.mobileButton} onClick={handleKeep}>
                                <svg className={style.iconButton} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z"></path>
                                </svg>
                            </div>
                        </Link>
                    </section>
                    :
                    <section className={style.navBarContainerAlt}>
                        <Link to='/home'>
                            <button className={style.desktopButton} onClick={handleBack}> Back</button>
                            <div className={style.mobileButton} onClick={handleBack}>
                                <svg className={style.iconButton} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                                </svg>
                            </div>
                        </Link>
                    </section>
            }

        </header >
    );
};

export default NavBar;