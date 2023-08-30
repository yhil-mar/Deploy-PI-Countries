import style from './ChargingScreen.module.css';
import { } from "../../redux/actions";
import { useEffect, useState } from 'react';

const ChargingScreen = () => {

    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 30000);
    });

    return (

        <section className={style.chargingScreenContainer}>

            <h1 className={style.chargingTitle}>Loading Countries...</h1>
            <svg className={style.spinnerCharge} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" stroke="none">
                    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
                </path>
            </svg>
            <h5 className={style.waitText}>Please wait a bit while the server starts.</h5>

            {
                showText && <h5 className={style.problemText}>If the countries do not load, it is due to a problem with our free server, sorry for the inconvenience :(</h5>
            }


        </section>

    );

};

export default ChargingScreen;