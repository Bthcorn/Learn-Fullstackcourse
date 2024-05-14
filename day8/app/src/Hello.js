import React, { useEffect, useState } from "react";
// const dayjs = require('dayjs');
import axios from "axios";

export default function Hello() {
  // const [items, setItem] = useState([]);

  // useEffect(() => {
  //   console.log('startPage');
  // }, [items]);

  // const newItem = () => {
  //   setItem([1, 2, 3, 4, 5]);
  // }
  // const [payDate,  setPayDate] = useState(new Date());
  const getMethod = async () => {
    try {
      await axios.get("http://localhost:3001/book/orderBy");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={getMethod}>
        Call API GET METHOD
      </button>
    </div>
  );
}
