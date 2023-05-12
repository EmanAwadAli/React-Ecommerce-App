import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { notify } from "../../utils/notify";

export default function RestCode() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("This field is requried"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: resetCodeHandler,
  });

  async function resetCodeHandler(values) {
    setloading(true);
    await axios
      .post(`${baseUrl}/auth/verifyResetCode`, values)
      .then((response) => {
        if (response.data.status === "Success") {
          setloading(false);
          navigate("/resetPassword");
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
        <title>Rest Code</title>
      </Helmet>
      <div className="common-form py-5">
        <div className="container">
          <h2 className="title">Reset Code</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                name="resetCode"
                id="resetCode"
                className="form-control"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.resetCode && formik.touched.resetCode ? (
                <span className="d-block text-danger error">
                  {formik.errors.resetCode}
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
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
