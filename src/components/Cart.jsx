import React, { useState } from "react";
import { useEffect } from "react";
import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "./context/Context";
import Filters from "./Filters";
import Rating from "./Rating";

const Cart = () => {
  const [total, setTotal] = useState();

  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price)*curr.qty, 0));
  }, [cart]);

  return (
    <>
      <div className="home-container">
        <div className="products-container">
          <ListGroup>
            {cart.map((prod) => {
              return (
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col md={2}>
                      <Rating rating={prod.rating} />
                    </Col>
                    <Col md={2}>
                      <Form.Control as="select" value={prod.qty}
                        onChange={(e) => {
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: prod.id,
                              qty: e.target.value
                            }
                          })
                        }}
                      >
                        {[...Array(prod.inStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
        <div className="filters summary">
          <span className="title">Subtotal ({cart.length} items)</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: Rs {total}
          </span>
          <Button>Proceed to checkout</Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
