import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import config from "../config.json";
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

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      level: "ug"
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  requestData(username, password, level) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, level })
    };
    let api =
      process.env.NODE_ENV === "production"
        ? `${config.api_prod}/register`
        : `${config.api_dev}/register`;

    fetch(api, requestOptions)
      .then(responseHandler)
      .then(() => history.push("/login"))
      .catch(function(error) {
        alert(error);
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { username, password, level } = this.state;
    if (!isNaN(username)) {
      this.requestData(username, password, level);
    } else {
      alert("The username needs to be an integer");
    }
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
            Register
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="level">Level</InputLabel>
              <Select
                native
                name="level"
                value={this.state.level}
                onChange={this.handleChange}
              >
                <option value="ug">Undergraduate</option>
                <option value="pg">Postgraduate</option>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          <Button
            type="button"
            onClick={() => {
              history.push("/home");
            }}
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Back
          </Button>
        </Paper>
      </main>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const withStylesRegisterPage = withStyles(styles)(RegisterPage);
export { withStylesRegisterPage as RegisterPage };
