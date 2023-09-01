import style from './Card.module.css';
import { Link } from 'react-router-dom'

const Card = ({ id, name, continent, image }) => {
    return (
        <Link to={`/detail/${id}`}>
            <div className={style.card}>
                <h3 className={style.cardTitle}>{name}</h3>
                <img className={style.cardImage} src={image} alt="" />
                <span className={style.cardText}>Continent: {continent}</span>
            </div>
        </Link>
    );
};

export default Card;