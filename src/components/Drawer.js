import React from 'react';
import Info from "./Info";
import axios from 'axios';
import AppContext from '../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({items = [], onClose, onRemove}) {
  const {setBasketItems, basketItems} = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post("https://6331c413cff0e7bf70f617e8.mockapi.io/orders", {items:basketItems});
      setOrderId(data.id);
      setIsOrderComplete(true);
      setBasketItems([]);
      for (let i=0; i < basketItems.length; i++){
        const item = basketItems[i];
        await axios.delete("https://6331c413cff0e7bf70f617e8.mockapi.io/basket" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(")
    }
    setIsLoading(false);
  }
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {
          items.length > 0 ? (
            <div className="d-flex flex-column flex">
              <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="basketItem d-flex align-center mb-20">
                <div
                  style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  className="basketItemImg"></div>

                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                </div>
                ))}
              </div>
              <div className="basketTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб. </b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                  Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <Info 
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-basket.jpg"}
            />
          )
        }
        
      </div>
    </div>
  );
  }
  
  export default Drawer;