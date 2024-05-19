import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../components/config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleSignIn = async () => {
    try {
      const res = await axios.post(config.apiPath + '/user/signIn', user);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        throw new Error("Invalid token received.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Sign In",
          text: "Username or password is invalid",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.message ||
            "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="login-logo">
          <a href="../../index2.html">
            <b>Admin</b>LTE
          </a>
        </div>
        {/* <!-- /.login-logo --> */}
        <div class="card">
          <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <div>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, user: e.target.value })}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  onChange={(e) => setUser({ ...user, pass: e.target.value })}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-8">
                  <div class="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label for="remember">Remember Me</label>
                  </div>
                </div>
                {/* <!-- /.col --> */}
                <div class="col-4">
                  <button
                    class="btn btn-primary btn-block"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
                {/* <!-- /.col --> */}
              </div>
            </div>

            <div class="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" class="btn btn-block btn-primary">
                <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="#" class="btn btn-block btn-danger">
                <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
              </a>
            </div>
            {/* <!-- /.social-auth-links --> */}

            <p class="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p class="mb-0">
              <a href="register.html" class="text-center">
                Register a new membership
              </a>
            </p>
          </div>
          {/* <!-- /.login-card-body --> */}
        </div>
      </div>
    </div>
  );
}
