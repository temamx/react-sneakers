import React from "react";
import axios from "axios";
import {Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
  const [items, setItems] = React.useState([]);
  const [basketItems, setBasketItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [basketOpened, setBasketOpened] = React.useState(false);

  const onAddToBasket = (obj) => {
    axios.post("https://6331c413cff0e7bf70f617e8.mockapi.io/basket", obj);
    setBasketItems(prev => [...prev, obj]);
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
      } else {
        const {data} = await axios.post("https://6331c413cff0e7bf70f617e8.mockapi.io/favorites", obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное")
    }
  }

  React.useEffect(() => {
    axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/items")
    .then((res) => {
      setItems(res.data);
    });
    axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/basket")
    .then((res) => {
      setBasketItems(res.data);
    });
    axios.get("https://6331c413cff0e7bf70f617e8.mockapi.io/favorites")
    .then((res) => {
      setFavorites(res.data);
    });
    }, []);


  return (
    <div className="wrapper clear">
      {basketOpened ? <Drawer onRemove={onRemoveItem} items={basketItems} onClose={() => setBasketOpened(false)}/> : null}
      <Header onClickBasket={() => setBasketOpened(true)}
      />

      <Routes>
        <Route exact path="/" element={
          <Home 
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToBasket={onAddToBasket}
          />
        }/>
          
        <Route exact path="/favorites" element={
          <Favorites 
          items={favorites}
          onAddToFavorite={onAddToFavorite}
          />
        }/>
         </Routes>

    </div>
  );
}

export default App;

