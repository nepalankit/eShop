import {Reay,useContext} from "react";
import { Card } from "react-bootstrap";
import products from "../products";
import Rating from "./Rating";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 mb-3 rounded h-100 d-flex flex-column ">
      < Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body className="d-flex flex-column">
        
        <Link to={`/product/${product._id}`} className="text-decoration-none product-title "
        >
          <Card.Title as="div"
          >
         <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;