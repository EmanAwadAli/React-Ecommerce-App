import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("This field is requried")
      .email("Invalid email"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPasswordHandler,
  });

  async function forgetPasswordHandler(values) {
    setloading(true);
    await axios
      .post(`${baseUrl}/auth/forgotPasswords`, values)
      .then((response) => {
        if (response.data.statusMsg === "success") {
          setloading(false);
          navigate("/resetCode");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="common-form py-5">
        <div className="container">
          <h2 className="title">Forget Password</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
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
        </div>
      </div>
    </>
  );
}
