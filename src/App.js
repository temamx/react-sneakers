import React from "react";
import axios from "axios";
import {Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [basketItems, setBasketItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [basketOpened, setBasketOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onAddToBasket = async (obj) => {
    try {
      const findItem = basketItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) { 
        setBasketItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6331c413cff0e7bf70f617e8.mockapi.io/basket/${findItem.id}`);
      } else {
        setBasketItems(prev => [...prev, obj]);
        const {data} = await axios.post("https://6331c413cff0e7bf70f617e8.mockapi.io/basket", obj);
        setBasketItems(prev => prev.map(item => {
          if (item.parentId === data.parentId){
            return {
              ...item,
              id: data.id
            };
          } else {
            return item;
          }
        }));
      }
    } catch (error) {
      alert("Ошибка при добавлении товара в корзину");
      console.error(error);
    }
  };

  const isItemAdded = (id) => {
    return basketItems.some(obj => Number(obj.parentId) === Number(id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onRemoveItem = (id) =>{
    try {
      axios.delete(`https://6331c413cff0e7bf70f617e8.mockapi.io/basket/${id}`);
      setBasketItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Ошибка при удалении товара");
      console.error(error);
    }
  }
  
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://6331c413cff0e7bf70f617e8.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post("https://6331c413cff0e7bf70f617e8.mockapi.io/favorites", obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
      console.error(error);
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [basketResponse, favoritesResponse, itemsResponse] = await Promise.all([
        axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/basket"),
        axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/favorites"),
        axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/items")
      ]);

        setIsLoading(false);

        setBasketItems(basketResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных ;(");
        console.error(error);
      } 
    }
    fetchData();
    }, []);


  return (
    <AppContext.Provider value={{ basketItems, favorites, items, isItemAdded, onAddToFavorite, setBasketOpened, setBasketItems, onAddToBasket}}>
      <div className="wrapper clear">
        <Drawer onRemove={onRemoveItem} items={basketItems} onClose={() => setBasketOpened(false)} opened={basketOpened}/>
        <Header onClickBasket={() => setBasketOpened(true)}
        />

        <Routes>
          <Route exact path="/" element={
            <Home 
            items={items}
            basketItems={basketItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToBasket={onAddToBasket}
            isLoading={isLoading}
            />
          }/>
            
          <Route exact path="favorites" element={
            <Favorites/>
          }/>

          <Route exact path="orders" element={
            <Orders/>
          }/>

          </Routes>
        </div>
    </AppContext.Provider>
  );
}

export default App;

