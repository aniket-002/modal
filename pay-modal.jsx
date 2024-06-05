import { Box, Modal, Typography, Button, TextField, Link } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Tpin from "../../../../assets/dashboard/Tpin.png";
import OTPInput from "react-otp-input";

const PayModal = ({ setOpen, setModalHeight, setModalTop }) => {
  const [tpin, setTpin] = useState("");

  const handleModalClose = () => {
    setOpen(false);
    setTpin("");
  };
  const handleTpinSubmit = async () => {
    console.log("TPIN submitted:", tpin);
    handleModalClose();
  };
  useEffect(()=>{
    setModalHeight("440px");

  });
  useEffect(()=>{
    setModalTop("60%");
  });

  return (
    
    <Box
      sx={{
        textAlign: "start",
        mt: 2,
      }}
    >
      <img src={Tpin} alt="TPIN" />
      <Typography
        sx={{
          fontSize: { xs: "24px", md: "28px" },
          fontWeight: "600",
          color: "#003B41",
          width: "434px",
          mb: 3,
          mt: 2,
        }}
      >
        Enter TPIN
      </Typography>

      <Box
        sx={{
          width: "100%",
          
        }}
      >
        <OTPInput
          value={tpin}
          onChange={(otpValue) => {
            setTpin(otpValue);
            if (otpValue.length === 6) {
            }
          }}
          numInputs={6}
          inputType="number"
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "100%",
            maxWidth: { xs: "40px", md: "50px" },
            height: "50px",
            borderRadius: "10px",
            border: "1px solid #17C0AF",
            outlineColor: "#17C0AF",
            marginRight: "10px",
          }}
          containerStyle={{
            maxWidth: "434px",
            justifyContent: "space-between",
          }}
        />
      </Box>
      <Link href="#" color="#003B41" underline="none">
        <Typography
          sx={{
            color: "#003B41",
            fontWeight: "700",
            fontSize: "14px",
            opacity: "80%",
            mb: "16px",
            mt: 2,
          }}
        >
          Forgot TPIN?
        </Typography>
      </Link>
      <Button
        onClick={handleTpinSubmit}
        sx={{
          mt: 2,
          width: { xs: "100%", md: "434px" },
          height: "50px",
          bgcolor: "#17C0AF",
          color: "#fff",
          cursor: "pointer",
          borderRadius: "8px",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            bgcolor: "#139b8e",
          },
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontWeight: "700", fontSize: "16px" }}
        >
          Pay
        </Typography>
      </Button>
    </Box>
    
  );
};

export default PayModal;
