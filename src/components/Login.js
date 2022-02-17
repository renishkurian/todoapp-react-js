import React, { useRef } from "react";
import "./resources/css/Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDataStore } from "../DataStore/DataStore";
import { Link as RouterLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authConf } from "../firebaseConfig";
import { toast } from "react-toastify";
function Login() {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const [, dispatch] = useDataStore();
  const hideLogin = () => {
    dispatch({ type: "SIGN-UP", isHome: false });
  };
  const signIn = () => {
    if (userNameRef.current.value === "" || passwordRef.current.value === "") {
      toast.error("Please enter valid credentials", {
        position: "top-center",
      });
    } else {
      signInWithEmailAndPassword(
        authConf,
        userNameRef.current.value,
        passwordRef.current.value
      )
        .then((user) => {
          console.log(user);
          toast("🦄 Sucessfully Login!");
          dispatch({ type: "LOGIN", user: user });
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "top-center",
          });
        });
    }
  };
  return (
    <div className="login-container">
      <div className="avatar">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
      </div>
      <div className="logo">
        <h3>To Do App</h3>
      </div>
      <div className="login-form">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          autoComplete="off"
        >
          <TextField
            inputRef={userNameRef}
            required
            id="standard-basic"
            label="User name"
            variant="standard"
          />

          <TextField
            inputRef={passwordRef}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <FormControl>
            <Button variant="contained" onClick={signIn}>
              Sign In
            </Button>
          </FormControl>
        </Box>
      </div>

      <RouterLink onClick={hideLogin} to="/signup" className="to-sign-up">
        {"Don't have an account? Sign Up"}
      </RouterLink>
    </div>
  );
}

export default Login;
