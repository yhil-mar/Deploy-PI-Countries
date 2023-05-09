import style from './Landing.module.css';
import ingresarHandler from '../../handlers/ingresarHandler';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Landing = () => {

    const navigate = useNavigate()
    const { allCountries } = useSelector(state => state);
    useEffect(() => {
        allCountries.length && window.location.reload();
    }, [allCountries]);

    return (
        <div className={style.landingContainer}>
            <div className={style.loginContainer}>
                <h1 className={style.welcome}>¡Welcome to the World!</h1>
                <button className={style.loginButton} onClick={() => ingresarHandler(navigate)}>Log In</button>
            </div>
            <span className={style.copy}>Powered by yasc ©</span>
        </div>
    );
};

export default Landing;