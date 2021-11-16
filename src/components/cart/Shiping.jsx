import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShipingInfo } from "../../actions/cartAction";
import { countries } from "countries-list";
import CheckoutSteps from "./CheckoutSteps";

function Shiping({ history }) {
  const { shipingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [address, setAddress] = useState(
    shipingInfo.address ? shipingInfo.address : ""
  );
  const [postalCode, setPostalCode] = useState(
    shipingInfo.postalCode ? shipingInfo.postalCode : ""
  );
  const [city, setCity] = useState(shipingInfo.city ? shipingInfo.city : "");
  const [country, setCountry] = useState(
    shipingInfo.country ? shipingInfo.country : ""
  );
  const [phone, setPhone] = useState(
    shipingInfo.phone ? shipingInfo.phone : ""
  );

  const countryList = Object.values(countries);

  const submitHandel = (e) => {
    e.preventDefault();
    dispatch(saveShipingInfo({ address, postalCode, city, country, phone }));
    history.push("/confirm");
  };

  return (
    <>
      <CheckoutSteps shiping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandel}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryList.map((country) => (
                  <option key={country.name}>{country.name}</option>
                ))}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Shiping;
