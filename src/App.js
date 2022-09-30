import React from "react";
import axios from "axios";
import {Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [basketItems, setBasketItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [basketOpened, setBasketOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onAddToBasket = (obj) => {
    if (basketItems.find(item => Number(item.id) === Number(obj.id))) { 
      setBasketItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`https://6331c413cff0e7bf70f617e8.mockapi.io/basket/${obj.id}`);
    } else {
      axios.post("https://6331c413cff0e7bf70f617e8.mockapi.io/basket", obj);
      setBasketItems(prev => [...prev, obj]);
    }
  }

  const isItemAdded = (id) => {
    return basketItems.some(obj => Number(obj.id) === Number(id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onRemoveItem = (id) =>{
    axios.delete(`https://6331c413cff0e7bf70f617e8.mockapi.io/basket/${id}`);
    setBasketItems(prev => prev.filter(item => item.id !== id));
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
      alert("Не удалось добавить в избранное")
    }
  }



  React.useEffect(() => {
    async function fetchData() {
      const basketResponse = await axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/basket")
      const favoritesResponse = await axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/favorites")
      const itemsResponse = await axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/items"); 

      setIsLoading(false);

      setBasketItems(basketResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
    }, []);


  return (
    <AppContext.Provider value={{ basketItems, favorites, items, isItemAdded, onAddToFavorite, setBasketOpened, setBasketItems}}>
      <div className="wrapper clear">
        {basketOpened ? <Drawer onRemove={onRemoveItem} items={basketItems} onClose={() => setBasketOpened(false)}/> : null}
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
            
          <Route exact path="/favorites" element={
            <Favorites/>
          }/>
          </Routes>
        </div>
    </AppContext.Provider>
  );
}

export default App;

