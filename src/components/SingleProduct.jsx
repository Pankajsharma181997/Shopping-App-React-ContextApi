import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "./context/Context";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <>
      <div className="product">
        <Card>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>Rs. {product.price.split(".")[0]}</span>
              {product.fastDelivery ? (
                <div>Fast Delivery</div>
              ) : (
                <div>4 Days Delivery</div>
              )}
              <Rating rating={product.ratings} />
            </Card.Subtitle>
            {cart.some((item) => item.id === product.id) ? (
              <Button variant="danger" onClick={() => {dispatch({ type: "REMOVE_FROM_CART", payload: product })}}>Remove from cart</Button>
            ) : (
              <Button
                disabled={!product.inStock}
                onClick={() => {dispatch({ type: "ADD_TO_CART", payload: product })}} 
              >
                {!product.inStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
