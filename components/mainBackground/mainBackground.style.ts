import { styled } from "@mui/material/styles";

export const Background = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100vw",

  ".bubble:nth-child(even)": {
    background: theme.palette.info.light,
  },

  ".bubble:nth-child(1)": {
    width: "40px",
    height: "40px",
    left: "10%",
    animationDuration: "8s",
  },

  ".bubble:nth-child(2)": {
    width: "50px",
    height: "50px",
    right: "10%",
    animationDuration: "10s",
  },

  ".bubble:nth-child(3)": {
    width: "50px",
    height: "50px",
    left: "35%",
    animationDuration: "7s",
    animationDelay: "2s",
  },

  ".bubble:nth-child(4)": {
    width: "60px",
    height: "60px",
    right: "35%",
    animationDuration: "9s",
    animationDelay: "5s",
  },

  ".bubble:nth-child(5)": {
    width: "20px",
    height: "20px",
    left: "20%",
    animationDuration: "5s",
    animationDelay: "1s",
  },

  ".bubble:nth-child(6)": {
    width: "30px",
    height: "30px",
    right: "20%",
    animationDuration: "7s",
    animationDelay: "3s",
  },

  ".bubble:nth-child(7)": {
    width: "80px",
    height: "80px",
    left: "50%",
    animationDuration: "11s",
    animationDelay: "0s",
  },

  ".bubble:nth-child(8)": {
    width: "90px",
    height: "90px",
    right: "50%",
    animationDuration: "13s",
    animationDelay: "2s",
  },

  ".bubble:nth-child(9)": {
    width: "35px",
    height: "35px",
    left: "55%",
    animationDuration: "6s",
    animationDelay: "1s",
  },

  ".bubble:nth-child(10)": {
    width: "45px",
    height: "45px",
    right: "55%",
    animationDuration: "8s",
    animationDelay: "3s",
  },

  ".bubble:nth-child(11)": {
    width: "45px",
    height: "45px",
    left: "65%",
    animationDuration: "8s",
    animationDelay: "3s",
  },

  ".bubble:nth-child(12)": {
    width: "55px",
    height: "55px",
    right: "65%",
    animationDuration: "10s",
    animationDelay: "5s",
  },

  ".bubble:nth-child(13)": {
    width: "90px",
    height: "90px",
    left: "70%",
    animationDuration: "12s",
    animationDelay: "2s",
  },

  ".bubble:nth-child(14)": {
    width: "100px",
    height: "100px",
    right: "70%",
    animationDuration: "14s",
    animationDelay: "4s",
  },

  ".bubble:nth-child(15)": {
    width: "25px",
    height: "25px",
    left: "80%",
    animationDuration: "6s",
    animationDelay: "2s",
  },

  ".bubble:nth-child(16)": {
    width: "35px",
    height: "35px",
    right: "80%",
    animationDuration: "8s",
    animationDelay: "4s",
  },

  ".bubble:nth-child(17)": {
    width: "15px",
    height: "15px",
    left: "70%",
    animationDuration: "5s",
    animationDelay: "1s",
  },

  ".bubble:nth-child(18)": {
    width: "25px",
    height: "25px",
    right: "70%",
    animationDuration: "7s",
    animationDelay: "3s",
  },

  ".bubble:nth-child(19)": {
    width: "90px",
    height: "90px",
    left: "25%",
    animationDuration: "10s",
    animationDelay: "4s",
  },

  ".bubble:nth-child(20)": {
    width: "100px",
    height: "100px",
    right: "25%",
    animationDuration: "12s",
    animationDelay: "6s",
  },

  ".bubble:nth-child(21)": {
    width: "50px",
    height: "50px",
    right: "10%",
    animationDuration: "5s",
  },

  ".bubble:nth-child(22)": {
    width: "40px",
    height: "40px",
    left: "10%",
    animationDuration: "6s",
  },

  ".bubble:nth-child(23)": {
    width: "60px",
    height: "60px",
    right: "35%",
    animationDuration: "6s",
    animationDelay: "2s",
  },

  ".bubble:nth-child(24)": {
    width: "50px",
    height: "50px",
    left: "35%",
    animationDuration: "5s",
    animationDelay: "1s",
  },

  ".bubble:nth-child(25)": {
    width: "30px",
    height: "30px",
    right: "20%",
    animationDuration: "5s",
    animationDelay: "1s",
  },

  ".bubble:nth-child(26)": {
    width: "20px",
    height: "20px",
    left: "20%",
    animationDuration: "5s",
  },

  ".bubble:nth-child(27)": {
    width: "90px",
    height: "90px",
    right: "50%",
    animationDuration: "6s",
    animationDelay: "1s",
  },

  ".bubble:nth-child(28)": {
    width: "80px",
    height: "80px",
    left: "50%",
    animationDuration: "6s",
  },

  ".bubble:nth-child(29)": {
    width: "45px",
    height: "45px",
    right: "55%",
    animationDuration: "6s",
    animationDelay: "1s",
  },

  ".bubble:nth-child(30)": {
    width: "35px",
    height: "35px",
    left: "55%",
    animationDuration: "5s",
  },

  "@keyframes rise": {
    "0%": {
      bottom: "-100px",
      transform: "translateX(0)",
    },

    "50%": {
      transform: "translate(100px)",
    },

    "100%": {
      bottom: "1080px",
      transform: " translateX(-200px)",
    },
  },
}));

export const Bubbles = styled("div")(({ theme, hidden }) => ({
  display: hidden ? "none" : "block",
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: "0",
  overflow: "hidden",
  top: "0",
  left: "0",
}));

export const Bubble = styled("div")(({ theme }) => ({
  background: theme.palette.info.main,
  position: "absolute",
  bottom: "-100px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  opacity: "0.5",
  animation: "rise 10s infinite ease-in",
}));
