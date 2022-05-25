import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const Pay = () => {
  const [state] = useContext(UserContext);
  console.log(state.user.statusPayment);
  let navigate = useNavigate()
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Create config Snap payment with useEffect, untuk menampilkan modal pembayaran
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-tSYDKI7sBrsbnWM8";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async (price) => {
    setLoadingSubmit(true);
    try {
      // Get data from product
      const data = {
        price: price,
      };

      const body = JSON.stringify(data);

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      // Insert transaction data
      const response = await API.post("/transaction", body, config);
      console.log("Response Transaction: ", response);

      // Create variabel for store token payment from response
      const token = response.data.payment.token;

      // Modify handle buy to display Snap payment page
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
      console.log(error);
    }
  };
  return (
    <div style={{ backgroundColor: "#161616", height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <div
        className="d-grid align-items-center justify-content-center text-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {state.user.statusPayment ? (        <>
          <Typography
            className="mb-4"
            sx={{ color: "#fff", fontSize: "36px", fontWeight: 700 }}
          >
            Premium
          </Typography>
          <Typography
            className="mb-2"
            sx={{ color: "#fff", fontSize: "15px", fontWeight: 400 }}
          >
            Bayar sekarang dan nikmati streaming music yang kekinian dari DUMB
            <span style={{ color: "#EE4622" }}>SOUND</span>
          </Typography>
          <Typography
            className="mb-3"
            style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}
          >
            DUMB
            <span
              style={{ color: "#EE4622", fontSize: "18px", fontWeight: 700 }}
            >
              SOUND
            </span>{" "}
            : 0981312323
          </Typography>
          <div>
            <Button
              variant="contained"
              style={{
                width: "220px",
                height: "30px",
                color: "#fff",
                backgroundColor: "#F58033",
                textTransform: "none",
                boxShadow: "none",
              }}
              onClick={() => handleBuy("20000")}
            >
              Pay
            </Button>
          </div>
        </>):(<>Happy Hacking</>)}
      </div>
    </div>
  );
};

export default Pay;
