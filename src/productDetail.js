import { useParams, Link } from "react-router-dom";
import Title from "./Title";
import QuantityBtn from "./quantityBtn";
import { useState, useEffect } from "react";

function ProductDetail() {
  let params = useParams();

  let [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((response) => response.json())
      .then((data) => {
        let productInfo = data.find((element) => {
          return element.id === parseInt(params.id);
        });
        setProductDetail(productInfo);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [params.id]);

  return (
    <div>
      {productDetail && (
        <div className="ProductDetail">
          <Title mainTitle={productDetail.name + "商品介紹"} />
          <table width="100%">
            <tbody>
              <tr>
                <td align="right">
                  <img
                    src={process.env.PUBLIC_URL + "/img/" + productDetail.image}
                    alt={productDetail.name}
                    width="400"
                  />
                </td>
                <td width="45%" padding="10">
                  <p>名稱 : {productDetail.name}</p>
                  <p>售價 : {productDetail.price}元</p>
                  <p>描述 : {productDetail.description}</p>
                  <br />
                  <QuantityBtn productInfo={productDetail} />
                </td>
              </tr>
            </tbody>
          </table>
          <Link to="/"><div className="backToGoodsListBtn">返回商品列表</div></Link>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
