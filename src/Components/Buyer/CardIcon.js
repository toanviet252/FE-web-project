import { Badge, Avatar } from "antd";
import React from "react";
import "./CardIcon.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext/CartContext";

const CardIcon = (props) => {
  const cartcontext = useContext(CartContext);
  const toogleOpenCart = cartcontext.toogleCheckoutCart;

  return (
    <>
      <div
        className="card-product-container"
        onMouseEnter={toogleOpenCart}
        onClick={toogleOpenCart}
      >
        <Badge count={props.count}>
          <Avatar shape="square" size="large">
            <i className="fa fa-shopping-cart fa-lg" aria-hidden="true" />
          </Avatar>
        </Badge>
      </div>
    </>
  );
};
export default CardIcon;
