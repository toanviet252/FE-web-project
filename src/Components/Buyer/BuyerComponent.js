import React from "react";
import { ProductData } from "../../shared/dataTable";
import { Card } from "antd";
import "./buyercomponent.scss";

const RenderCardProduct = ({ product }) => {
  return (
    <Card
      hoverable
      style={{
        width: "200px",
      }}
    >
      <Card.Meta title={product.name}></Card.Meta>
    </Card>
  );
};

const BuyerPage = () => {
  return (
    <div className="card-container">
      {ProductData.map((product) => {
        return <RenderCardProduct product={product} />;
      })}
    </div>
  );
};
export default BuyerPage;
