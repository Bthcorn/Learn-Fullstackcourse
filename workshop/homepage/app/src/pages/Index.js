import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";

export default function Index() {
  const [products, setProducts] = React.useState("");
  const [carts, setCarts] = React.useState([]);
  const [items, setItems] = React.useState(0);
  // const [firstRender, setFirstRender] = React.useState(false);


  React.useEffect(() => {
    fetchData();
    // setItems(carts.length);
    // console.log(products);
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
    return product.img && product.img !== "" && product.img !== undefined ? (
      <img
        src={config.apiPath + "/uploads/" + product.img}
        className="card-img-top"
        height="250px"
        alt={product.name}
      />
    ) : (
      <img
        src="https://via.placeholder.com/150"
        className="card-img-top"
        height="250px"
        alt={product.name}
      />
    );
  };

  const addToCart = (product) => {
    carts.push(product);
    setCarts(carts);
    console.log(carts);
    // localStorage.setItem("carts", JSON.stringify(carts));

    // const Cart = JSON.parse(localStorage.getItem("carts"));
    // localStorage.removeItem("carts");
    // console.log(Cart);
    setItems(carts.length);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="h3 float-start">Our Products</div>
      <div className="h6 float-end">
        My Cart{" "}
        <button className="btn btn-outline-success ms-2 me-2">
          <i className="fa fa-shopping-cart me-2"></i> {items} items
        </button>
      </div>
      <div className="clearfix"></div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="col-3 mt-3" key={product.id}>
              <div className="card m-2">
                {showImage(product)}
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                  <div>Cost: {product.cost.toLocaleString('th-TH')} Baht</div>
                  <div>Price: {product.price.toLocaleString('th-TH')} Baht</div>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-primary" onClick={e => addToCart(product)}>
                    <i className="fa fa-shopping-cart me-2"></i>Add to Cart
                  </button>
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
