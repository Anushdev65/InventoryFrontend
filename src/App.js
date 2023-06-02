import Home from './pages/home'
import AddProduct from './pages/AddProduct';
import Navbar from './components/NavBar';

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
