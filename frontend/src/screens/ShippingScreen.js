import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/CartActions";

const ShippingScreen = ({history}) => {
  window.scrollTo(0, 0);
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // const cart = useSelector((state) => state.cart);
  // const {shippingAddress} = cart;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));

    history.push('/payment');
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ĐỊA CHỈ GIAO HÀNG</h6>
          <input 
            type="text" 
            placeholder="Địa Chỉ Nhà"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Thành Phố" 
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Tỉnh Thành" 
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Xã, Phường" 
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Tiếp Tục</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
