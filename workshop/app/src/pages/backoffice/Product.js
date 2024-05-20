import React from "react";
import BackOffice from "../../components/BackOffice";
import MyModal from "../../components/MyModal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../components/config";

export default function Product() {
  const [product, setProduct] = React.useState({});
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);
  
  const handleSave = async () => {
    try {
      product.img = '';
      product.cost = parseInt(product.cost);
      product.price = parseInt(product.price);
      const res = await axios.post(config.apiPath +  "/product/create", product, config.headers());

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Product has been saved',
          timer: 2000,
        });
        document.getElementById('modalProduct').click();
        fetchData();
      }
    } catch (error) {
     Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/product/list", config.headers());

      if (res.data.result) {
        setProducts(res.data.result);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  const clearForm = () => {
    setProduct({
      name: '',
      cost: '',
      price: '',
      img: '',
    });
  }

  return (
    <BackOffice>
      <div className="h4">Product</div>
      <button className="btn btn-primary" data-toggle='modal' data-target='#modalProduct' onClick={clearForm}>
        <i className="fa fa-plus"></i> Add Product
      </button>

      <MyModal id="modalProduct" title="Product">
        <div>
          <div>
            Name
          </div>
          <input value={product.name} className="form-control" onChange={(e) => setProduct({...product, name: e.target.value})}/>
        </div>
        <div>
          <div className="mt-2">
            Cost
          </div>
          <input value={product.cost} className="form-control" onChange={(e) => setProduct({...product, cost: e.target.value})}/>
        </div>
        <div>
          <div className="mt-2">
            Price
          </div>
          <input value={product.price} className="form-control" onChange={(e) => setProduct({...product, price: e.target.value})}/>
        </div>
        <div>
          <div className="mt-2">
            Image
          </div>
          <input className="form-control" type='file' onChange={(e) => setProduct({...product, img: e.target.value})}/>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary mt-2" onClick={handleSave}>
            Save
          </button>
        </div>
      </MyModal>
    </BackOffice>
  );
}
