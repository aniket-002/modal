import { Box, Modal, Typography, Button, TextField, Link } from "@mui/material";
import React, { useState, useRef, useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Tpin from "../../../../assets/dashboard/Tpin.png";
import GenerateTpinModal from "./newTpin-modal";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import OTPInput from "react-otp-input";
import AuthContext from "../../../../../store/auth-context";

const ResetModal = ({ open, setOpen }) => {
  const [isTpinModalOpen, setIsTpinModalOpen] = useState(false);
  const [ResetTpin, setResetTpin] = useState(false);
  const [modalHeight, setModalHeight] = useState("");
  const [modalTop, setModalTop] = useState("");
  const authCtx = useContext(AuthContext);
  const user = authCtx.buser;
  const [phoneNum, setPhoneNum] = useState({
    phone_country_code: "+91",
    mobile_number: "",
  });

  const handleModalClose = () => {
    setOpen(false);
    setResetTpin("");
    setIsTpinModalOpen(false);
  };
  

  const initialSeconds = 60;
  const resetCount = 0;

  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isresend, setIsResend] = useState(false);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (seconds === 0) {
      setIsResend(false);
    } else {
      setIsResend(true);
    }
    return () => {};
  }, [seconds]);

  useEffect(() => {
    isresend && setSeconds(initialSeconds);
    return () => {};
  }, [isresend]);

  useEffect(() => {
    setModalTop("60%");
  }, []);
console.log(modalTop);
  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "60%", md: {modalTop} },
          left: "50%",
          minHeight:{modalHeight},
          overflowY: "auto",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "640px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, md: 4 },
          paddingLeft: { xs: 2, md: 13 },
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CloseIcon onClick={handleModalClose} style={{ cursor: "pointer" }} />
        </Box>
        {isTpinModalOpen ? (
          <GenerateTpinModal open={open} setOpen={setOpen} setModalHeight={setModalHeight}  setModalTop={setModalTop}/>
        ) : (
          <Box
            sx={{
              textAlign: "start",
              mt: 2,
            }}
          >
            <img src={Tpin} alt="TPIN" />
            <Typography
              sx={{
                fontSize: { xs: "20px", md: "28px" },
                fontWeight: "600",
                color: "#003B41",
                width: "434px",
                mb: 3,
                mt: 2,
              }}
            >
              Generate/Reset TPIN
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  width: "100%",
                  color: "#008593",
                  fontSize: "14px",
                  fontWeight: 500,
                  my: 1,
                  textAlign: "left",
                }}
              >
                Enter Otp Sent to{" "}
                <span style={{ color: "#003B41", fontWeight: 700 }}>
                  +91-{user.mobileNumber} &nbsp;&nbsp;
                  <BorderColorOutlinedIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: "14px",
                      mb: "2px",
                    }}
                  />
                </span>
                {/* &nbsp; by CAMS */}
              </Typography>
              <Box sx={{ width: "100%", mb: 3 }}>
                <OTPInput
                  value={otp}
                  onChange={(otpValue) => {
                    setOtp(otpValue);
                    if (otpValue.length === 6) {
                      // Call your API here with the OTP value
                      //   handleOtpLogin(null, otpValue);
                    }
                  }}
                  numInputs={6}
                  inputType="number"
                  //   onPaste={handlePaste}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: seconds !== 0 ? "gray" : "#003B41",
                      cursor: seconds === 0 && "pointer",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                    onClick={() => {
                      setIsResend(true);
                    }}
                  >
                    Resend
                  </Typography>
                  <Typography
                    sx={{
                      color: "#D92B3C",
                      fontWeight: 600,
                      fontSize: "14px",
                      paddingRight: { xs: 2, md: 10 },
                    }}
                  >
                    00:{seconds < 10 ? "0" + seconds : seconds}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              onClick={() => setIsTpinModalOpen(true)}
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
                sx={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                Verify
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ResetModal;
