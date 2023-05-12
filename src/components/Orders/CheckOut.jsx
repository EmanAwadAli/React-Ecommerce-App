import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../Context/CartContext";
import * as Yup from "yup";

export default function Checkout() {
  const { onlinePayment, cartId } = useContext(CartContext);
  const [loading, setloading] = useState(false);
  let token = localStorage.getItem("userToken");

  // Online Paymen Handler
  async function onlinePaymentHandler(values) {
    setloading(true);
    let response = await onlinePayment(token, cartId, values);
    if (response.status === 200) {
      setloading(false);
      window.location.href = response.data.session.url;
    }
  }

  // OnlinePayment Form Validation
  const validationSchema = Yup.object({
    details: Yup.string().required(),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number"),
    city: Yup.string().required(),
  });

  // OnlinePayment Formik
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: onlinePaymentHandler,
  });

  return (
    <div className="common-form py-5">
      <div className="container">
        <h2 className="title">Checkout</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="details"
              id="details"
              placeholder="Details"
              className="form-control"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.details && formik.touched.details ? (
              <span className="d-block text-danger error">
                {formik.errors.details}
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
              placeholder="Phone"
              className="form-control"
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
          <div className="form-group">
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              className="form-control"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.city && formik.touched.city ? (
              <span className="d-block text-danger error">
                {formik.errors.city}
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
  );
}
