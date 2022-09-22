function Header() {
    return(
        <header> 
            <div className="headerLeft">
                <img width={40} height={40} src="/img/logo.png" alt="logo"/>
                <div className="headerInfo">
                    <h3>react sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="headerRight">
                <li> 
                    <img width={18} height={18} src="/img/basket.svg" alt="basket" /> 
                    <span>1205 руб.</span>
                </li>
                <li> 
                    <img src="/img/user.svg" alt="user" /> 
                </li>
            </ul>
      </header>
    )
}
export default Header;