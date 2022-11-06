import LoginPage from './pages/Login/LoginPage';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CashierPage from './pages/Cashier/CashierPage';
import NavBar from './components/NavBar';
import { useState } from 'react';
import InventoryPage from './pages/Inventory/InventoryPage';
import SalesPage from './pages/Sales/SalesPage';
import ClosedCashierPage from './pages/ClosedCashier/ClosedCashierPage';
import { getUserData } from './utils/utils';


function App() {
  const[name, setName] = useState(getUserData()?.name || '');

  const getName = (userName) => {
    setName(userName)
  }

  return (
      <Router>
        <NavBar name={name}/>
        <Routes>
          <Route exact path="/" element={<LoginPage bringUser={getName}/>}/>
          <Route exact path="/caja" element={<CashierPage/>}/>
          <Route exact path="/inventario" element={<InventoryPage/>}/>
          <Route exact path="/total-ventas" element={<SalesPage/>}/>
          <Route exact path="/cierre-caja" element={<ClosedCashierPage/>}/>
        </Routes>
      </Router>
  );
}

export default App;
