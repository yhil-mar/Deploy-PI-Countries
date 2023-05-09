import style from './NoResults.module.css';

const NoResults = () => {
    return (
        <div className={style.NoResultsContainer}>
            <h3>No results found...</h3>
        </div>
    );
};

export default NoResults;