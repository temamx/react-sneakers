import React from 'react';
import { Link } from 'react-router-dom';
import { useTotal } from './hooks/useTotal';

function Header(props) {
  const {totalPrice} = useTotal();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={process.env.PUBLIC_URL + '/'}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickBasket} className="mr-30 cu-p">
          <img width={18} height={18} src="img/basket.svg" alt="Basket"/>
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/favorites'}> 
            <img className="cu-p mr-20" width={18} height={18} src="img/Heart.svg" alt="Favorites"/>
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/orders'}>
            <img className="cu-p" width={18} height={18} src="img/user.svg" alt="User"/>
          </Link>
        </li>
      </ul>
    </header>
  );
  }
  
  export default Header;