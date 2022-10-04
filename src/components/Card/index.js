import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
import AppContext from "../../context";

function Card({
    id,
    imageUrl,
    title,
    price,
    onFavorite,
    onClickPlus,
    favorited = false,
    loading = false
}) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, imageUrl, title, price};

    const onClickAdd = () => {
        onClickPlus(obj);
    }

    const onClickFavorite = () =>{
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }
    return(
    <div className={styles.card}>
        {loading ? 
        <ContentLoader 
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
            <rect x="0" y="167" rx="5" ry="5" width="150" height="15" /> 
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
            <rect x="0" y="234" rx="5" ry="5" width="80" height="24" /> 
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> : 
        <>
            {onFavorite && 
            <div className={styles.favorite} onClick={onClickFavorite} >
                <img src={isFavorite ? "img/liked.svg" : "img/unliked-new.svg"} alt="Heart-unliked" />
            </div>}
            <img width="100%" height={135} src={imageUrl} alt="sneakers" />
            <p> {title} </p>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                {onClickAdd && <img 
                    className={styles.plus}
                    onClick={onClickAdd} 
                    src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} 
                    alt="plus"
                />}
            </div>
        </> 
        }
    </div>
    )
}
export default Card;