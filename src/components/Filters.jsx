import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { CartState } from "./context/Context";
import Rating from "./Rating";

const Filters = () => {
  const {
    productState: { byStock, byFastDelivery, sort, byRating },
    productDispatch,
  } = CartState();

  const handleRatingClick = (i) => {
    productDispatch({
      type: "FILTER_BY_RATING",
      payload: i + 1,
    });
  };

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          name="group1"
          label="Ascending"
          type="radio"
          id={`inline-1`}
          onChange={() => {
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            });
          }}
          checked={sort == "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          name="group1"
          label="Descending"
          type="radio"
          id={`inline-2`}
          onChange={() => {
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            });
          }}
          checked={sort == "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          name="group1"
          label="Include Out of Stock"
          type="checkbox"
          id={`inline-3`}
          onChange={() => {
            productDispatch({
              type: "FILTER_BY_STOCK",
            });
          }}
          checked = {byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          name="group1"
          label="Fast Delivery only"
          type="checkbox"
          id={`inline-4`}
          onChange={() => {
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            });
          }}
          checked = {byFastDelivery}
        />
      </span>
      <span>
        <label className="rating-label">Rating :</label>
        <Rating rating={byRating} handleClick={handleRatingClick} />
      </span>
      <Button
        variant="light"
        onClick={() => {
          productDispatch({
            type:"CLEAR_FILTERS"
          })
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
