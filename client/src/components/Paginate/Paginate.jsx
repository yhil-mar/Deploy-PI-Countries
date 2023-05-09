import { useDispatch } from 'react-redux';
import style from './Paginate.module.css';
import { nextPage, prevPage } from '../../redux/actions';

const Paginate = ({ numPage, amountPages }) => {
    const dispatch = useDispatch();

    const handlePage = (event) => {
        const action = event.target.value;
        if (action === 'next') dispatch(nextPage());
        else dispatch(prevPage());
    };

    return (
        <div className={style.paginateContainer}>
            <span className={style.numbers}>Page {numPage} of {amountPages}</span>
            {
                numPage > 1 &&
                <span>
                    <button className={style.button3} value='prev' onClick={handlePage}>{'<'}</button>
                    {/* <span className={style.numbers}>{numPage - 1}</span> */}
                </span>
            }
            {
                numPage < amountPages &&
                <span>
                    {/* <span className={style.numbers}>{numPage + 1}</span> */}
                    <button className={style.button3} value='next' onClick={handlePage}>{'>'}</button>
                </span>
            }
        </div>
    );
};

export default Paginate;