import style from './LoadingScreen.module.css';

const LoadingScreen = ({ isLoaded }) => {

    return (

        <section className={`${style.loadingScreenContainer} ${!isLoaded ? style.show : ''}`}>

            <section className={style.contentContainer}>

                <h2 className={style.loadingTitle}>Loading...</h2>

                <svg className={style.loadingSpinner} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" stroke="none">
                        <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
                    </path>
                </svg>

            </section>

        </section>
    );

};

export default LoadingScreen;