import React, { useRef } from "react";
import "./resources/css/Signup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { isValiEmail } from "./util";
import { authConf, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDataStore } from "../DataStore/DataStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { ref, set } from "firebase/database";

function Signup() {
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef();
  const userNameRef = useRef("");
  const homepgeNavigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    cpassword: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    confirmPassword: false,
    errorMesaage: "",
    isError: false,
  });
  const [, dispatch] = useDataStore();

  const firebaseSignUp = () => {
    if (confirmPasswordRef.current.value !== values.password) {
      setValues({
        ...values,
        isError: true,
        errorMesaage: "Password does not match",
      });
    } else if (userNameRef.current.value === "") {
      setValues({
        ...values,
        isError: true,
        errorMesaage: "User name is required",
      });
    } else if (values.password === "" || values.password.length < 6) {
      setValues({
        ...values,
        isError: true,
        errorMesaage: "Password minimum length is 6",
      });
    } else if (isValiEmail(userNameRef.current.value) === false) {
      setValues({
        ...values,
        isError: true,
        errorMesaage: "Email is not valid",
      });
    } else {
      //create user with firebase
      createUserWithEmailAndPassword(
        authConf,
        userNameRef.current.value,
        values.password
      )
        .then((_user) => {
          console.log(_user);
          toast("Account Created Successfully !");
          dispatch({
            type: "LOGIN",
            user: _user,
          });

          set(ref(db, "users/" + _user.user.uid), {
            email: _user.user.email,
          });
        })
        .catch((error) => {
          console.log(error.message);
          setValues({
            ...values,
            isError: true,
            errorMesaage: error.message,
          });
        });

      setValues({
        ...values,
        isError: false,
        errorMesaage: "",
      });

      homepgeNavigate("/");
    }
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = (prop) => (e) => {
    if (prop === "password") {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    } else {
      setValues({
        ...values,
        confirmPassword: !values.confirmPassword,
      });
    }
  };

  const showLogin = () => {
    dispatch({ type: "SIGN-UP", isHome: true });
  };
  return (
    <div className="Login">
      <div className="signup-container">
        <div className="avatar">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
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
              required
              id="standard-basic"
              label="User name"
              variant="standard"
              inputRef={userNameRef}
            />

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-password">Password</InputLabel>
              <Input
                inputRef={passwordRef}
                id="standard-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("password")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirm Password
              </InputLabel>
              <Input
                inputRef={confirmPasswordRef}
                id="standard-adornment-password"
                type={values.confirmPassword ? "text" : "password"}
                value={values.cpassword}
                error={false}
                onChange={handleChange("cpassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("cpassword")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.confirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <Button variant="contained" onClick={firebaseSignUp}>
                Sign up
              </Button>
              <div className="error"> {values.errorMesaage}</div>
            </FormControl>
          </Box>
        </div>
        <RouterLink to="/" onClick={showLogin} className="back-to-login">
          {"Already have an account? Sign In"}
        </RouterLink>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
