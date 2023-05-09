import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Form, Home, Landing, Detail } from './views/index';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-countries-lak9.onrender.com/';


function App() {

  return (
    <div className="App">
        {useLocation().pathname !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<Form />} />
      </Routes>
      {useLocation().pathname === '/home' && <Footer />}
    </div>
  );
};

export default App;
