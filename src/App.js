import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./productList";
import CheckOut from "./checkOut";
import ProductDetail from "./productDetail";
import { CartContext } from "./CartContext";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <BrowserRouter>
      <CartContext.Provider value={[cartItems,setCartItems]}>
        {/* Link 組件用於導航 */}
        <nav>
          <Link to="/">首頁</Link>
          <Link to="/checkout">購物車</Link>
        </nav>

        {/* 路由設定 */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<p>找不到頁面</p>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
