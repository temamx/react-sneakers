import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {
  const [items, setItems] = React.useState([]);
  const [basketItems, setBasketItems] = React.useState([]);
  const [basketOpened, setBasketOpened] = React.useState(false);

  const onAddToBasket = (obj) => {
    setBasketItems(prev => [...prev, obj]);
  }

  React.useEffect(() => {
    fetch("https://6331c413cff0e7bf70f617e8.mockapi.io/items")
      .then(res => res.json())
      .then(json => setItems(json))
    }, [])
  return (
    <div className="wrapper clear">
      {basketOpened ? <Drawer items={basketItems} onClose={() => setBasketOpened(false)}/> : null}
      <Header onClickBasket={() => setBasketOpened(true)}
      />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <Card
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          onClickPlus={(obj) => onAddToBasket(obj)}
          onClickFavorite={() => console.log("Нажали сердечко")}
          />
        )
        )}
      </div>
        
        



      </div>
    </div>
  );
}

export default App;

