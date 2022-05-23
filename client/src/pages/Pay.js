import { Button, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";

const Pay = () => {
  return (
    <div style={{ backgroundColor: "#161616",height:"100vh" }}>
        <div>
        <Navbar />
        </div>
        <div className="d-grid align-items-center justify-content-center text-center" style={{          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",}}>
            <Typography className="mb-4" sx={{color:"#fff", fontSize:"36px", fontWeight:700}}>Premium</Typography>
            <Typography className="mb-2" sx={{color:"#fff", fontSize:"15px", fontWeight:400}}>Bayar sekarang dan nikmati streaming music yang kekinian dari DUMB<span style={{color:"#EE4622"}}>SOUND</span></Typography>
            <Typography className="mb-3" style={{color:"#fff", fontSize:"18px", fontWeight:700}}>DUMB<span style={{color:"#EE4622", fontSize:"18px", fontWeight:700}}>SOUND</span> : 0981312323</Typography>
            <div>
            <Button variant="contained" style={{width:"220px", height:"30px", color:"#fff", backgroundColor:"#F58033",  textTransform:"none",boxShadow:"none"}}>Pay</Button>
            </div>
        </div>
    </div>
  );
};

export default Pay;
