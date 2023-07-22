import './App.css';
import Header from './components/Header';
import CoinDetails from './components/CoinDetails';
import Coins from './components/Coins';
import Home from './components/Home';
import Exchanges from './components/Exchanges';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Button colorScheme={'cyan'} >click</Button> */}
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Coins' element={<Coins/>} />
          <Route path='/exchanges' element={<Exchanges/>} />
          <Route path="/coins/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
