import { Link } from "react-router-dom";
import Title from "./Title";
import QuantityBtn from "./quantityBtn";
import { useContext } from "react";
import { CartContext } from "./CartContext";

function CheckOut() {
  let [cartItems] = useContext(CartContext);
  let cartEmpty = cartItems.length <= 0 ? true : false;

  let grandTotal = cartItems.reduce((total, product) => {
    return (total += product.price * product.quantity);
  }, 0);

  const freeShippingPrice = 99;

  return (
    <div>
      <Title mainTitle="購物車" />
      {cartEmpty && (
        <div>
          <h2 >購物車現在沒有商品</h2>
          <Link to="/">
            <div className="backToGoodsListBtn">返回商品列表</div>
          </Link>
        </div>
      )}
      {!cartEmpty && (
        <div className="container">
          <div className="cartSection">
            <table className="checkoutTable">
              <tbody>
                {cartItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <Link to={"/product/" + product.id}>
                        <img
                          src={process.env.PUBLIC_URL + "/img/" + product.image}
                          alt={product.name}
                        />
                      </Link>
                    </td>
                    <td>
                      <p>名稱 : {product.name}</p>
                      <p>售價 : {product.price}元</p>
                    </td>
                    <td width="200">
                      <QuantityBtn productInfo={product} />
                    </td>
                    <td>
                      <div className="productSubTotal">
                        ${product.price * product.quantity}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="checkoutSection">
            <p className="grandTotal">總價：{grandTotal}元</p>
            {grandTotal >= freeShippingPrice ? (
              <div className="freeShipping">已達免運標準</div>
            ) : (
              <div className="noShipping">
                滿${freeShippingPrice}免費送貨
                <br />
                還差${freeShippingPrice - grandTotal}
              </div>
            )}
            <button>結帳付款</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
