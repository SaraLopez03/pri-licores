import LoginPage from './pages/Login/LoginPage';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CashierPage from './pages/Cashier/CashierPage';
// import InventoryPage from './pages/Inventory/InventoryPage';
// import SalesPage from './pages/Sales/SalesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route exact path="/cashier" element={<CashierPage/>}/>
        {/* <Route exact path="/inventory" element={<InventoryPage/>}/> */}
        {/* <Route exact path="/sales" element={<SalesPage/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
