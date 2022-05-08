import React from "react";
import {
  Container,
  FormControl,
  Navbar,
  Nav,
  Dropdown,
  Badge,
  Button
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate , useLocation } from "react-router-dom";
import { CartState } from "./context/Context";

export default function Header() {
  const {
    state: { cart }, dispatch, productDispatch
  } = CartState();

  const navigate = useNavigate();
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" style={{ height: "80px" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/">Shopping Cart</Link>
          </Navbar.Brand>
          {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge>{cart.length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{minWidth: 370}} align="end">
                {cart.length > 0 ? (
                  <>
                    {cart.map((prod, index) => (
                      <span className="cartitem" key={prod.id}>
                        <img
                          src={prod.image}
                          className="cartItemImage"
                          alt={prod.name}
                        ></img>

                        <div className="cartItemDetail">
                          <div>{prod.name}</div>
                          <div>Rs. {prod.price.split(".")[0]}</div>
                        </div>

                        <AiFillDelete 
                          fontSize="20px"
                          style={{cursor : "pointer"}}
                          onClick = {() => 
                            dispatch({
                              type:"REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }
                        />
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                  <span style={{padding : 10}}>Cart is Empty</span>
                  </>
                )}
                <Button onClick={() => {navigate('/cart')}} style={{width:"95%", margin:"0 10px"}}>
                  Go To Cart
                </Button>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
