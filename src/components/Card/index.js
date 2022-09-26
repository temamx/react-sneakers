import React from 'react';
import styles from './Card.module.scss';

function Card({ imageUrl, title, price, onClickFavorite, onClickPlus}) {
    const [isAdded, setIsAdded] = React.useState(false)

    const onClickAdd = () => {
        onClickPlus({imageUrl, title, price});
        setIsAdded(!isAdded)
    }
    return(
    <div className={styles.card}>
        <div className={styles.favorite}>
            <img onClick={onClickFavorite} src="/img/heart-unliked.svg" alt="Heart-unliked" />
        </div>
        <img width={133} height={112} src={imageUrl} alt="sneakers" />
        <p> {title} </p>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price}</b>
            </div>
            <img 
                className={styles.plus}
                onClick={onClickAdd} 
                src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                alt="plus" 
            />
        </div>
    </div>
    )
}
export default Card;