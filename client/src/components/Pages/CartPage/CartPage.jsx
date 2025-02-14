import React from "react";
import { Link } from "react-router-dom";
import Card from "../../Feauters/Cards/Cards";
import { HeartFilled } from "@ant-design/icons";
import { Grid } from "@material-ui/core";
import {
  getCartProducts,
  addProductToCart,
  decrementProductFromCart,
  deleteProductFromCart,
} from "../../../Service/cart-service";
import { getAllProducts } from "../../../Service/productService";
import { getFavoritesProducts } from "../../../Service/favorites-service";
import { useState, useEffect } from "react";

import "./styles.css";
import { useMyContext } from "../../context";

export default function CartPage() {
  const [cartProducts, setCartProduct] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const { updateToggleCart, toggleCart, user } = useMyContext();

  useEffect(() => {
    if (user) {
      getCartProducts(user._id).then(async (cartProductsRes) => {
        const allProducts = await getAllProducts();

        const correctProduct = cartProductsRes.map((cartProduct) => {
          const product = allProducts.find(
            (p) => p._id === cartProduct.productId
          );
          return { quantity: cartProduct.quantity, ...product };
        });
        setCartProduct(correctProduct);
      });
      getFavoritesProducts(user._id).then(async (favoritesProductsRes) => {
        const allProducts = await getAllProducts();
        const correctProduct = favoritesProductsRes.map((favorite) => {
          return allProducts.find((p) => p._id === favorite.productId);
        });
        console.log({ correctProduct });
        setFavourites(correctProduct);
      });
    }
  }, [user]);

  const totalPrice = cartProducts.reduce((price, product) => {
    price = price + product.price * product.quantity;
    return price;
  }, 0);

  return (
    <>
      {user ? (
        <>
          {" "}
          <div className="cartDiv">
            <h2 style={{ marginRight: "80%" }}> Bag</h2>
            {totalPrice === 0 ? (
              <h3 style={{ marginTop: "15px", marginRight: "20%" }}>
                There is no items in your bag
              </h3>
            ) : (
              <h3
                style={{
                  marginTop: "15px",
                  marginRight: "73%",
                  borderBottom: "solid 0.6px",
                }}
              >
                Total price : ${totalPrice}
              </h3>
            )}
            <Grid
              container
              justify="center"
              spacing={4}
              style={{ flexDirection: "row" }}
            >
              {cartProducts.map((product, index) => (
                <Grid
                  item
                  key={`${product.id}-${index}`}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card
                    isCart={true}
                    product={product}
                    index={index}
                    remove={async () => {
                      await deleteProductFromCart(product._id, user._id);
                      updateToggleCart();
                    }}
                    addOne={async () => {
                      await addProductToCart(product._id, user._id);
                      updateToggleCart();
                    }}
                    removeOne={async () => {
                      await decrementProductFromCart(product._id, user._id);
                      updateToggleCart();
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="favDiv">
            <h2 style={{ marginRight: "78%",marginBottom:"55px" }}> Favourites</h2>
            <Grid
              container
              justify="center"
              spacing={4}
              style={{ flexDirection: "row" }}
            >
              {favourites.map((product, index) => (
                <Grid
                  item
                  key={`${product.id}-${index}`}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  

                  <Link to={`/mensShoe/${product._id}`}>
                    <img src={product.images[0]} width="300" />
                  </Link>
                  <h3 style={{ color: "rgb(117, 117, 117)" ,marginLeft:"20%"}}>
                    {product.name}

                  </h3>
                  <h4 style={{ color: "rgb(117, 117, 117)",marginLeft:"26%" }}>
                    {product.category}
                  </h4>
                  <HeartFilled style={{marginLeft:"36%",fontSize:"18px"}}/>


                 
                

                </Grid>
              ))}
            </Grid>
          </div>
          <div className="mightAlso">
            <h2 style={{ marginRight: "78%", fontSize: "15px" }}>
              YOU MIGHT ALSO LIKE
            </h2>
            <Grid
              container
              justify="center"
              spacing={4}
              style={{ flexDirection: "row" }}
            >
              <div className="img">
                <Link to="/MenShoes">
                  <img
                    src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/350e7f3a-979a-402b-9396-a8a998dd76ab/air-force-1-07-shoe-ZLZpmn.png"
                    width="350"
                  />
                </Link>

                <h4>Nike Air Force 1 '07</h4>
                <h5>Men's Shoes</h5>
                <h6>275$</h6>
              </div>
              <div className="img">
                <Link to="/MenShoes">
                  <img
                    src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/748a9f2b-4d80-4bf4-805b-594288fed313/air-max-90-shoe-HzscVW.png"
                    width="350"
                  />
                </Link>

                <h4>Nike Air Max 90</h4>
                <h5>Men's Shoes</h5>
                <h6>285$</h6>
              </div>
            </Grid>
          </div>
        </>
      ) : (
        <div className="cartDiv">
          <h3 style={{ marginTop: "15px" }}>To buy shoes you must login!</h3>
        </div>
      )}
    </>
  );
}
