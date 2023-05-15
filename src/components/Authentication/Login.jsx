import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { notify } from "../../utils/notify";

export default function Login({ saveUserData }) {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginUser,
  });

  async function loginUser(values) {
    setloading(true);
    await axios
      .post(`${baseUrl}/auth/signin`, values)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userToken", response.data.token);
          notify("Success", "success");
          saveUserData();
          setloading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setloading(false);
          notify(error.response.data.message, "error");
        }
      });
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="common-form py-5">
        <div className="container">
          <h2 className="title">Login Now</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="d-block text-danger error">
                  {formik.errors.email}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <span className="d-block text-danger error">
                  {formik.errors.password}
                </span>
              ) : (
                ""
              )}
            </div>
            <button
              disabled={!(formik.isValid && formik.dirty && !loading)}
              type="submit"
              className="btn"
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <div className="links d-flex justify-content-between mt-3">
            <p>
              Don't have an account yet ? <Link to="/register">Create One</Link>
            </p>
            <Link to="/forgetPassword">Forget Password</Link>
          </div>
        </div>
      </div>
    </>
  );
}
