import style from './Landing.module.css';
import ingresarHandler from '../../handlers/ingresarHandler';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Landing = () => {

    const navigate = useNavigate()
    const { allCountries } = useSelector(state => state);

    useEffect(() => {

        // Servirá para recargar y limpiar el estado global cuando se regresa a la landing page
        allCountries.length && window.location.reload();
    }, [allCountries]);

    return (
        <section className={style.landingContainer}>
            <div className={style.loginContainer}>
                <h2 className={style.welcomeText}>¡Welcome to the World!</h2>
                <button className={style.loginButton} onClick={() => ingresarHandler(navigate)}>Let's go</button>
            </div>
            <span className={style.copy}>Powered by yasc ©</span>
        </section>
    );
};

export default Landing;