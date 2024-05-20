import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "./config";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        config.apiPath + "/user/info",
        config.headers()
      );
      console.log(res.data);
      if (res.data !== undefined) {
        setUser(res.data);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      const button = await Swal.fire({
        title: "Sign Out",
        text: "Are you sure you want to sign out?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (button.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      {/* <!-- Brand Logo --> */}
      <a href="index3.html" class="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span class="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      {/* <!-- Sidebar --> */}
      <div class="sidebar">
        {/* <!-- Sidebar user panel (optional) --> */}
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              src="dist/img/user2-160x160.jpg"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <a href="#" class="d-block">
              {user.name}
            </a>
            <button className="btn btn-danger" onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </div>
        </div>

        {/* <!-- SidebarSearch Form --> */}
        {/* <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div> */}

        {/* <!-- Sidebar Menu --> */}
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
            <li className="nav-header">MENU</li>
            <li className="nav-item">
              <Link to="/product" className="nav-link">
                <i className="nav-icon fa fa-box"></i>
                <p>
                  Product
                  <span className="badge badge-info right">2</span>
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <a href="pages/gallery.html" class="nav-link">
                <i class="nav-icon far fa-image"></i>
                <p>Gallery</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="pages/kanban.html" class="nav-link">
                <i class="nav-icon fas fa-columns"></i>
                <p>Kanban Board</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
  );
}
