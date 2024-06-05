import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Tpin from "../../../../assets/dashboard/Tpin.png";
import PayModal from "./pay-modal";
import OTPInput from "react-otp-input";

const GenerateTpinModal = ({ open, setOpen, setModalHeight, setModalTop }) => {
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [newTpin, setNewTpin] = useState(Array(6).fill(""));
  const [confirmTpin, setConfirmTpin] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  const handleTpinModalClose = () => {
    setOpen(false);
    setNewTpin("");
    setConfirmTpin("");
    setError("");
  };
  const handleSubmit = () => {
    if (newTpin === confirmTpin) {
      console.log("TPIN generated successfully!");
      setPayModalOpen(true);
      
      setError("");
    } else {
      setError("TPINs do not match");
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    setNewTpin("");
    setConfirmTpin("");
    
  };

  useEffect (() => {
    setModalHeight("440px");

  });
  useEffect(() => {
    if (payModalOpen) {
      setModalTop("65%");
    } else {
      setModalTop("65%");
    }
  }, [payModalOpen]);

  return (
    <>
      {payModalOpen ? (
        <PayModal open={open} setOpen={setOpen} setModalHeight={setModalHeight} setModalTop={setModalTop} />
      ) : (
        <Box
          sx={{
            overflowY: "auto",
            textAlign: "start",
            mt: 2,
            paddingRight: { md: 8, xs: 0 },
          }}
        >
          <img src={Tpin} alt="TPIN" />

          <Typography
            sx={{
              fontSize: { xs: "24px", md: "28px" },
              fontWeight: "600",
              color: "#003B41",
              mb: 3,
              mt: 2,
            }}
          >
            Generate TPIN
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#008593",
              mb: 3,
            }}
          >
            {" "}
            Enter New{" "}
            <Box component="span" sx={{ color: "#003B41", fontWeight: "700" }}>
              TPIN
            </Box>
          </Typography>

          <Box sx={{ width: "100%", mb: 3 }}>
            <OTPInput
              value={newTpin}
              onChange={(otpValue) => setNewTpin(otpValue)}
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
                display: "flex",
                justifyContent: "space-between",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#008593",
              mb: 3,
            }}
          >
            {" "}
            Confirm New{" "}
            <Box component="span" sx={{ color: "#003B41", fontWeight: "700" }}>
              TPIN
            </Box>
          </Typography>

          <Box sx={{ width: "100%", mb: 4 }}>
            <OTPInput
              value={confirmTpin}
              onChange={(otpValue) => setConfirmTpin(otpValue)}
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
                display: "flex",
                justifyContent: "space-between",
              }}
            />
          </Box>
          {error && (
            <Typography
              sx={{
                color: "red",
                fontSize: "14px",
                fontWeight: "500",
                mb: 2,
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            onClick={() => handleSubmit(true)}
            sx={{
              width: "100%",
              height: "50px",
              bgcolor: "#17C0AF",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#139b8e",
              },
            }}
          >
            Confirm
          </Button>
        </Box>
      )}
    </>
  );
};

export default GenerateTpinModal;
