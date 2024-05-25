import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";

export default function Index() {
  const [products, setProducts] = React.useState("");

  React.useEffect(() => {
    fetchData();
    console.log(products);
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/product/list");

      if (res.data.result !== undefined) {
        setProducts(res.data.result);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const showImage = (product) => {
    return product.img && product.img !== '' && product.img !== undefined  ? <img src={config.apiPath + "/uploads/" + product.img} className="card-img-top" alt={product.name} /> : <img src="https://via.placeholder.com/150" className="card-img-top" alt={product.name} />;
  }

  return (
    <div className="container-fluid mt-3">
      <div className="h3">Our Products</div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="col-3">
            <div className="card m-2">
              {showImage(product)}
              <div className="card-header">{product.name}</div>
              <div className="card-body">
                <div>Cost: {product.cost}</div>
                <div>Price: {product.price}</div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary"><i className="fa fa-shopping-cart mr-2"></i> Add to Cart</button>
                {/* <button className='btn btn-danger'>Delete</button> */}
              </div>
            </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
}
