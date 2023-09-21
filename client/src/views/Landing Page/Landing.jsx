import style from './Landing.module.css';
import ingresarHandler from '../../handlers/ingresarHandler';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const Landing = () => {

    const navigate = useNavigate();

    const { allCountries } = useSelector(state => state);

    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = () => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 2000);
    };

    useEffect(() => {
        // Servirá para recargar y limpiar el estado global cuando se regresa a la landing page
        allCountries.length && window.location.reload();

    }, [allCountries]);

    return (

        <section className={`${style.landingSection}`}>

            <LoadingScreen isLoaded={isLoaded} />

            <div className={`${style.landingContainer} ${isLoaded ? style.loaded : ''}`}>
                <img className={style.wallpaperImg} src='/images/countries-minimalist.jpg' onLoad={handleLoad} />
                <div className={style.loginContainer}>
                    <h2 className={style.welcomeText}>¡Welcome to the World!</h2>
                    <button className={style.loginButton} onClick={() => ingresarHandler(navigate)}>Let's go</button>
                </div>

                <span className={style.copy}>Powered by yasc ©</span>
            </div>


        </section>

    );
};

export default Landing;