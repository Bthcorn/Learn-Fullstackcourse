import React from "react";
import BackOffice from "../../components/BackOffice";
import MyModal from "../../components/MyModal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../components/config";

export default function Product() {
  const [product, setProduct] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [img, setImg] = React.useState({});
  const [fileExcel, setFileExcel] = React.useState({}); // 
  const refImg = React.useRef();
  const refExcel = React.useRef();

  React.useEffect(() => {
    fetchData();
    console.log(products);
  }, []);
  
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('img', img);
      console.log(img);
      const res = await axios.post(config.apiPath + '/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem("token"),
        },
      });
      
      if (res.data.name !== undefined) {
        return res.data.name;
      }
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      return "";
    }
  }

  const handleSave = async () => {
    try {
      product.img = await handleUpload();
      product.cost = parseInt(product.cost);
      product.price = parseInt(product.price);
      let res;
      if (product.id === undefined) {
        res = await axios.post(
          config.apiPath + "/product/create",
          product,
          config.headers()
        );
      } else {
        res = await axios.put(
          config.apiPath + "/product/update/" + product.id,
          product,
          config.headers()
        );
      }

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Product has been saved",
          timer: 2000,
        });
        document.getElementById("modalProduct").click();
        fetchData();

        setProduct({ ...product, id: undefined });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        config.apiPath + "/product/list",
        config.headers()
      );
      if (res.data.result) {
        setProducts(res.data.result);
        console.log(products);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const clearForm = () => {
    setProduct({
      name: "",
      cost: "",
      price: "",
      img: "",
    });
    setImg(null);
    refImg.current.value = "";
  };

  const handleRemove = async (item) => {
    try {
      const button = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });
      
      if (button.isConfirmed) {
        const res = await axios.delete(
          config.apiPath + "/product/remove/" + item.id,
          config.headers()
        );
        
        if (res.data.message === "succes") {
          Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Product has been removed",
            timer: 2000,
          });
          fetchData();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  
  const selectedFile = (fileInput) => {
    if (fileInput.length > 0 && fileInput !== undefined) {
      setImg(fileInput[0]);
    }
  };
  
  const selectedFileExcel = (fileInput) => {
    if (fileInput.length > 0 && fileInput !== undefined) {
      setFileExcel(fileInput[0]);
    }
  }
  
  const handleUploadExcel = async () => {
    try  {  
      const fornData = new FormData();
      fornData.append('fileExcel', fileExcel);
      const res = await axios.post(config.apiPath + '/product/uploadFromExcel', fornData, {
        headers: {
          'Content-Type': 'multipart/form',
          'Authorization': localStorage.getItem('token'),
        }
      });

      if (res.data.message === 'success') {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Product has been saved",
          timer: 2000,
        });
        fetchData();
        document.getElementById('modalExcel').click();
        // setFileExcel(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }
  
  const clearFormExcel = () => {
    refExcel.current.value = "";
    setFileExcel(null);
  }

  const showImage = (product) => {
    return product.img !== '' ? <img src={config.apiPath + '/uploads/' + product.img} alt="" className="img-fluid"/> : <></>
  }
  return (
    <BackOffice>
      <div className="h4">Product {console.log('product')}</div>
      <button
        className="btn btn-primary mr-2"
        data-toggle="modal"
        data-target="#modalProduct"
        onClick={clearForm}
      >
        <i className="fa fa-plus mr-2"></i>Add Product
      </button>
      <button className="btn btn-success" data-toggle='modal' data-target='#modalExcel' onClick={clearFormExcel}>
        <i className="fa fa-file-excel mr-2"></i>Import from Excel
      </button>

      <table class="mt-3 table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col" width="200px">
              Name
            </th>
            <th scope="col" className="text-right" width="200px">
              Cost
            </th>
            <th scope="col" className="text-right" width="200px">
              Price
            </th>
            <th scope="col" className="text-right" width="200px">
              Image
            </th>
            <th scope="col" className="text-center" width="150px"></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className="text-right">{product.cost}</td>
                <td className="text-right">{product.price}</td>
                <td>{product.img !== '' ? <img src={config.apiPath + '/uploads/' + product.img} alt="" className="img-fluid"/> : <></>}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning"
                    data-toggle="modal"
                    data-target="#modalProduct"
                    onClick={(e) => setProduct(product)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={(e) => handleRemove(product)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>

      <MyModal id="modalProduct" title="Product">
        <div>
          <div>Name</div>
          <input
            value={product.name}
            className="form-control"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <div className="mt-2">Cost</div>
          <input
            value={product.cost}
            className="form-control"
            onChange={(e) => setProduct({ ...product, cost: e.target.value })}
          />
        </div>
        <div>
          <div className="mt-2">Price</div>
          <input
            value={product.price}
            className="form-control"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div>
          <div className="mt-2">{showImage(product)}</div>
          <div className="mt-2">Image</div>
          <input
            className="form-control"
            type="file"
            // onChange={(e) => setProduct({ ...product, img: e.target.value })}
            onChange={e => selectedFile(e.target.files)}
            ref={refImg}
          />
        </div>
        <div className="">
          <button className="btn btn-primary mt-2" onClick={handleSave}>
            Save
          </button>
        </div>
      </MyModal>

      <MyModal id='modalExcel' title='Import from Excel'>
        <div>
          <div>File</div>
          <input type="file" className="form-control" ref={refExcel} onChange={e => selectedFileExcel(e.target.files)}/>
        </div>
        <div className="modal-footer" onClick={handleUploadExcel}>
          <button className="btn btn-primary mt-2"><i className="fa fa-check mr-2"></i>Save</button>
        </div>
      </MyModal>
    </BackOffice>
  );
}
