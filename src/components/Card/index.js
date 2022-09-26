import styles from './Card.module.scss';

function Card(props) {
    return(
    <div className={styles.card}>
        <div className={styles.favorite}>
            <img src="/img/heart-unliked.svg" alt="Heart-unliked" />
        </div>
        <img width={133} height={112} src={props.imageUrl} alt="sneakers" />
        <p> {props.title} </p>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{props.price}</b>
            </div>
            <button className="button"
                    onClick={props.onClick}>
                <img width={11} height={11} src="/img/plus.svg" alt="plus" />
            </button>
        </div>
    </div>
    )
}
export default Card;