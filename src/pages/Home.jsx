import Card from "../components/Card";
import React from "react";

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToBasket, isLoading}) {
    const renderItems = () => {
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
                <Card
                key={index}
                onClickPlus={(obj) => onAddToBasket(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
                loading={isLoading}
                {...item}
                />
            ));
    };
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="search" />
                    {searchValue && <img 
                    onClick={() => setSearchValue("")} 
                    className="clear cu-p" 
                    src="img/btn-remove.svg" 
                    alt="Clear" 
                    />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>

        <div className="d-flex flex-wrap">
            {renderItems()}
        </div>
    </div>
    )
}

export default Home;