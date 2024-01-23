import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./productList.module.css";
import Title from "./Title";
import QuantityBtn from "./quantityBtn";

function ProductList() {
  let [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((response) => response.json())
      .then((data) => setProductList(data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    console.log(productList);
  }, []); // 第二個參數為空依賴數組時，表示這個效果只在組件掛載時運行一次

  return (
    <div>
      <Title mainTitle="請選擇要購買的水果" />

      <div className={styles.container}>
        {productList.map((product) => (
          <div key={product.id} className={styles.containerItem}>
            <Link to={"/product/" + product.id}>
              <img
                src={process.env.PUBLIC_URL + "/img/" + product.image}
                alt={product.name}
              ></img>
            </Link>
            <div className={styles.productName}>
              {product.name} <br/> {product.price}元/件
            </div>
            <QuantityBtn productInfo={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
