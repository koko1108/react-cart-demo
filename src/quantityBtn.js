import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

function QuantityBtn({ productInfo }) {
  const [cartItems, setCartItems] = useContext(CartContext);

  // 查看購物車裡是否有該商品
  let productIndexInCart = cartItems.findIndex((e) => {
    return e.id === productInfo.id;
  });

  let [numInCart, setNumInCart] = useState(
    productIndexInCart === -1 ? 0 : cartItems[productIndexInCart].quantity
  );

  const handleAdd = () => {
    if (productIndexInCart === -1) {
      setCartItems([
        ...cartItems,
        {
          id: productInfo.id,
          name: productInfo.name,
          image: productInfo.image,
          price: productInfo.price,
          description: productInfo.description,
          quantity: 1,
        },
      ]);
    } else {
      let newCartArray=[...cartItems];
      newCartArray[productIndexInCart].quantity++;
      setCartItems(newCartArray);
    }
    setNumInCart(numInCart + 1);
  };

  const handleSubtract = () => {
    if(cartItems[productIndexInCart].quantity===1){
      let newCartArray = [...cartItems];
      newCartArray.splice(productIndexInCart,1);
      setCartItems(newCartArray);
    }else{
      let newCartArray=[...cartItems];
      newCartArray[productIndexInCart].quantity--;
      setCartItems(newCartArray);
    }
    setNumInCart(numInCart - 1);
  };

  return (
    <div className="addToCart">
      {numInCart === 0 ? (
        <div className="addToCartBtn" onClick={handleAdd}>加入購物車</div>
      ) : (
        <div>
          <span className="subtractBtn" onClick={handleSubtract}>-</span>
          {numInCart}
          <span className="addBtn" onClick={handleAdd}>+</span>
        </div>
      )}
    </div>
  );
}
export default QuantityBtn;
