import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { notify } from "../../utils/notify";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required().min(3).max(10),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^[A-Z][a-z0-9A-Z@#$%]{5,}$/, "password must match the pattern"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "password and rePassword not match"),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerUser,
  });

  async function registerUser(values) {
    setLoading(true);
    await axios
      .post(`${baseUrl}/auth/signup`, values)
      .then((data) => {
        if (data.status === 201) {
          notify("Success", "success");
          setLoading(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          notify(error.response.data.message, "error");
          setLoading(false);
        }
      });
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="common-form py-5">
        <div className="container">
          <h2 className="title">Register Now</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <span className="d-block text-danger error">
                  {formik.errors.name}
                </span>
              ) : (
                ""
              )}
            </div>
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
            <div className="form-group">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <span className="d-block text-danger error">
                  {formik.errors.rePassword}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <span className="d-block text-danger error">
                  {formik.errors.phone}
                </span>
              ) : (
                ""
              )}
            </div>
            <button
              disabled={!(formik.isValid && formik.dirty && !loading)}
              type="submit"
              className="btn btn-successbtn"
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
