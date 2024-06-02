import React from "react";
import BackOffice from "../../components/BackOffice";
import Swal from "sweetalert2";
import config from "../../components/config";
import axios from "axios";
import dayjs from "dayjs";
import MyModal from "../../components/MyModal";

export default function BillSale() {
  const [billlSales, setBillSales] = React.useState([]);
  const [billSalesDetail, setBillSalesDetail] = React.useState([]);
  const [sumPrice, setSumPrice] = React.useState(0);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        config.apiPath + "/api/sale/list",
        config.headers()
      );

      if (res.data.result !== undefined) {
        setBillSales(res.data.result);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const openModalInfo = async (item) => {
    try {
      const res = await axios.get(
        config.apiPath + "/api/sale/billInfo/" + item.id,
        config.headers()
      );

      if (res.data.result !== undefined) {
        setBillSalesDetail(res.data.result);

        let sum = 0;
        for (let i = 0; i < res.data.result.length; i++) {
          sum += parseInt(res.data.result[i].price);
        }

        setSumPrice(sum);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handlePay = async (item) => {
    try {
      const button = await Swal.fire({
        title: "Change to Paid Status",
        text: "Do you want to change bill status to paid?",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
      });

      if (button.isConfirmed) {
        const res = await axios.get(
          config.apiPath + "/api/sale/updateStatustoPaid/" + item.id,
          {},
          config.headers()
        );

        if (res.data.message === "success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Change to paid status successfully",
            timer: 2000,
          });

          fetchData();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleSent = async (item) => {
    try {
      const button = await Swal.fire({
        title: "Change to Sent Status",
        text: "Do you want to change bill status to sent?",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
      });

      if (button.isConfirmed) {
        const res = await axios.get(
          config.apiPath + "/api/sale/updateStatustoSent/" + item.id,
          {},
          config.headers()
        );

        if (res.data.message === "success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Change to paid status successfully",
            timer: 2000,
          });

          fetchData();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleCanceled = async (item) => {
    try {
      const button = await Swal.fire({
        title: "Change to Canceled Status",
        text: "Do you want to change bill status to canceled?",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
      });

      if (button.isConfirmed) {
        const res = await axios.get(
          config.apiPath + "/api/sale/updateStatustoCanceled/" + item.id,
          {},
          config.headers()
        );

        if (res.data.message === "success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Change to paid status successfully",
            timer: 2000,
          });

          fetchData();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const displayStatus = (item) => {
    if (item.status === "paid") {
      return (
        <span className="badge badge-info">
          <i className="fa fa-check mr-2"></i>Paid
        </span>
      );
    } else if (item.status === "sent") {
      return (
        <span className="badge badge-success">
          <i className="fa fa-file mr-2"></i>Sent
        </span>
      );
    } else if (item.status === "wait") {
      return (
        <span className="badge badge-warning">
          <i className="fa fa-clock mr-2"></i>Wait
        </span>
      );
    } else if (item.status === "canceled") {
      return (
        <span className="badge badge-danger">
          <i className="fa fa-trash mr-2"></i>Canceled
        </span>
      );
    }
  }

  return (
    <BackOffice>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Sale Report</div>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Pay Date</th>
              <th>Pay Time</th>
              <th>Status</th>
              <th width="200px"></th>
            </thead>
            <tbody>
              {billlSales.length > 0 ? (
                billlSales.map((item, index) => (
                  <tr key={index}>
                    <td>{item.customerName}</td>
                    <td>{item.customerPhone}</td>
                    <td>{item.customerAddress}</td>
                    <td>{dayjs(item.payDate).format("DD/MM/YYYY")}</td>
                    <td>{item.payTime}</td>
                    <td>{displayStatus(item)}</td>
                    <td className="text-wrap">
                      <button
                        className="btn btn-secondary m-1"
                        data-toggle="modal"
                        data-target="#modalInfo"
                        onClick={(e) => openModalInfo(item)}
                      >
                        <i className="fa fa-edit mr-2"></i>Detail
                      </button>
                      <button
                        className="btn btn-info m-1"
                        onClick={(e) => handlePay(item)}
                      >
                        <i className="fa fa-check mr-2"></i>Paid
                      </button>
                      <button className="btn btn-success m-1" onClick={e => handleSent(item)}>
                        <i className="fa fa-file mr-2"></i>Delivered
                      </button>
                      <button className="btn btn-danger m-1" onClick={e => handleCanceled(item)}> 
                        <i className="fa fa-trash mr-2"></i>Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <MyModal id="modalInfo" title="Bill Info">
        <table className="table table-bordered table-striped">
          <thead>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            {/* <th>Cost</th> */}
          </thead>
          <tbody>
            {billSalesDetail.length > 0 ? (
              billSalesDetail.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.Product.name}</td>
                  <td className="text-right">1</td>
                  <td className="text-right">
                    {item.price.toLocaleString("th-TH")}
                  </td>
                  {/* <td>{item.cost}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-center">
          <h3>Total: {sumPrice.toLocaleString("th-TH")} Baht</h3>
        </div>
      </MyModal>
    </BackOffice>
  );
}
