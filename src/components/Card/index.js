import React from 'react';
import styles from './Card.module.scss';

function Card({id, imageUrl, title, price, onFavorite, onClickPlus, favorited = false}) {
    const [isAdded, setIsAdded] = React.useState(false)
    const [isFavorite, setIsFavorite] = React.useState(favorited)

    const onClickAdd = () => {
        onClickPlus({imageUrl, title, price});
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () =>{
        onFavorite({id, imageUrl, title, price})
        setIsFavorite(!isFavorite);
    }
    return(
    <div className={styles.card}>
        <div className={styles.favorite} onClick={onClickFavorite} >
            <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Heart-unliked" />
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
                favorited={true}
            />
        </div>
    </div>
    )
}
export default Card;