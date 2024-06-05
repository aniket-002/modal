import { Box, Modal, Typography, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { currency } from "../../../../../common/Constants";
import { CClient } from "../../../../../litigation-financing/lib/common/common";
import BusinessApiEndPoint from "../../../../../networks/BusinessApiEndPoint";
import { apiErrorToast, okSuccessToast } from "../../../../../common/Toasts";
import Logo from "../../../../assets/dashboard/clogo.png";
import PayModal from "../payment-modal/pay-modal";
import ResetModal from "./resetTpin-modal";

const PaymentModal = ({ open, setOpen, data }) => {
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const style = {
    position: "relative",
    
    top:"50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", lg: "640px" },
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "Poppins",
    height: { xs: "600px", md: "90vh" },
    overflowY: "scroll",
    borderRadius: 2,
    px: 4,
    pb: 4,
    
  };
  const iconBackground = {
    height: "34px",
    width: "34px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const handleClose = () => {
    setOpen(false);
  };

  const paymentRequestReject = async () => {
    try {
      const res = await CClient(
        `${BusinessApiEndPoint.QS_PAYMENT_REQUEST}${data.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Reject" }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        handleClose();
        okSuccessToast(
          "We have recieved your request and wil contact the merchant shortly"
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const data = await res.json();
        apiErrorToast(`${data.message[0]}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const paymentRequestApprove = async () => {
    try {
      const res = await CClient(
        `${BusinessApiEndPoint.QS_PAYMENT_REQUEST}${data.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        handleClose();
        okSuccessToast("Your invoice has been approved");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const data = await res.json();
        apiErrorToast(`${data.message[0]}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 4,
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontWeight: 600,
                fontSize: "24px",

                color: "#003B41",
              }}
            >
              Payment Request
            </Typography>
            <span>
              <CloseIcon className="otp-hover" onClick={handleClose} />
            </span>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0px 4px 12px rgba(41, 72, 152, 0.04)",
              padding: { xs: "20px", md: "40px" },
              maxWidth: { xs: "100%", md: "570px" },
              maxHeight: { xs: "auto", md: "145px" },
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 0 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={Logo}
                alt="Logo"
                style={{ height: 50, marginRight: 10 }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "600",
                    color: "#1F242F",
                  }}
                >
                  Kunal Singh Private Limited
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", md: "14px" },
                    fontWeight: "600",
                    color: "#003B41",
                  }}
                >
                  GSTIN:{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: "500", color: "#003B41", opacity: 0.6 }}
                  >
                    05AJAHT8473N3D8
                  </Box>{" "}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: "#fde2e2",
                px: 2,
                py: 1,
                borderRadius: "10px",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 10, md: 0 },
                marginLeft: { xs: "70px", md: 0 },
              }}
            >
              <Typography
                sx={{ fontWeight: "600", fontSize: "14px", color: "#A63255" }}
              >
                26 Aug, 2024
              </Typography>
            </Box>
          </Box>

          <Box sx={{ py: 1.5 }}>
            {data.case_id && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  mt: 4,
                  border: 2,
                  borderRadius: "10px",
                  borderColor: "#008593",
                  padding: { xs: "15px", md: "25px" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: "100%",
                    gap: { xs: 2, md: 0 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: { xs: "100%", md: "50%" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "16px", md: "20px" },
                        fontWeight: "500",
                        color: "#003B41",
                      }}
                    >
                      Invoice Date
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#003B41",
                      }}
                    >
                      {new Date(data.invoice_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderWidth: "1px",
                      borderStyle: "dashed",
                      borderColor: "#008593",
                    }}
                  ></Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: { xs: "100%", md: "50%" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#003B41",
                      }}
                    >
                      Invoice id : {data.case_id}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                justifyContent: "center",
                mt: 4,

                borderRadius: 2,
                backgroundColor: "rgba(23, 192, 175, 0.1)",

                padding: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // gap: "5px",
                  // width: "25%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#003B41",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Amount
                </Typography>

                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#17C0AF",
                  }}
                >
                  {/* ₹ 1,60,000 */}
                  {/* {currency(data.transaction_amount)} */}
                  {currency(data?.due_amount)}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: "60px",
              }}
            >
              <Button
                onClick={ () => {
                  
                  setResetModalOpen(true);

                }}
                sx={{
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
                  Accept
                </Typography>
              </Button>
              <Button
                // onClick={paymentRequestReject}
                onClick={handleClose}
                sx={{
                  width: { xs: "100%", md: "434px" },
                  height: "50px",
                  mt: "12px",
                  bgcolor: "#fff",
                  color: "#17C0AF",
                  padding: "10px 30px",
                  borderRadius: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: 1,
                  borderColor: "#17C0AF",
                  "&:hover": {
                    bgcolor: "rgba(23, 192, 175, 0.1)",
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
                  Reject
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      
      <ResetModal open={resetModalOpen} setOpen={setResetModalOpen} />
    </>
  );
};

export default PaymentModal;
