import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import jwtDecode from "jwt-decode";
import { history, responseHandler } from "../helpers";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    localStorage.removeItem("user");

    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  requestData(name, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, password })
    };
    let api =
      process.env.NODE_ENV === "production"
        ? `https://backend-dot-courserecommender.appspot.com/authenticate`
        : `http://localhost:4000/authenticate`;
    fetch(api, requestOptions)
      .then(responseHandler)
      .then(response => {
        let { id, level } = jwtDecode(response);
        localStorage.setItem(
          "user",
          JSON.stringify({ id, level, token: response })
        );
        history.push("/home");
      })
      .catch(function(error) {
        window.alert(error);
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.requestData(username, password);
  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FindInPageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Course Recommender
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">
                Username (An integer from 1 to 5000)
              </InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">
                Password (Same as the username)
              </InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
          <Button
            type="button"
            onClick={() => {
              history.push("/register");
            }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            New student
          </Button>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

const withStylesSignIn = withStyles(styles)(SignIn);

export { withStylesSignIn as SignIn };
