import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  return (
    <div className="wrapper clear">
      <Drawer/>
      <Header/>
      <div className="content">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search" />
            <input placeholder="Поиск" />
          </div>
        </div>

      <div className="sneakers">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
        
        



      </div>
    </div>
  );
}

export default App;
