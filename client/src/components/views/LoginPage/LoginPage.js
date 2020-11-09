import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function LoginPage(props) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("Email")
    : "";
  const initialPassword = localStorage.getItem("rememberMe")
    ? localStorage.getItem("Password")
    : "";
  const [Email, setEmail] = useState(initialEmail);
  const [Password, setPassword] = useState(initialPassword);
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const onSignInClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      let body = {
        email: Email,
        password: Password,
      };

      dispatch(loginUser(body)).then((response) => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem("userId", response.payload.userId);
          if (rememberMe === true) {
            window.localStorage.setItem("Email", body.email);
            window.localStorage.setItem("Password", body.password);
            window.localStorage.setItem("rememberMe", true);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("Email");
            localStorage.removeItem("Password");
          }
          props.history.push("/");
        } else {
          alert(response.payload.message);
        }
      });
    }, 500);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={onEmailHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={Password}
            autoComplete="current-password"
            onChange={onPasswordHandler}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleRememberMe}
                checked={rememberMe}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSignInClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
