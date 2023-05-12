import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { notify } from "../../utils/notify";

export default function ResetPassword() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("This field is requried")
      .email("Invalid email"),
    newPassword: Yup.string()
      .required("This field is requried")
      .matches(/^[A-Z]/, "Password must start with capital letter"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPasswordHandler,
  });

  // Reset Password Handler
  async function resetPasswordHandler(values) {
    setloading(true);
    await axios
      .put(`${baseUrl}/auth/resetPassword`, values)
      .then((response) => {
        if (response) {
          localStorage.setItem("userToken", response.token);
          setloading(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        setloading(false);
        notify(error.response.data.message, "error");
      });
  }

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="common-form py-5">
        <div className="container">
          <h2 className="title">Reset Password</h2>
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
                name="newPassword"
                id="newPassword"
                className="form-control"
                placeholder="New Password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <span className="d-block text-danger error">
                  {formik.errors.newPassword}
                </span>
              ) : (
                ""
              )}
            </div>
            <button type="submit" className="btn">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
