import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { UnitsTable } from "./UnitsTable";
import areas from "../assets/areaofstudy";
import { authHeader, responseHandler, history } from "../helpers";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AreasOfStudy extends React.Component {
  state = {
    open: false,
    loaded: false,
    selectedValue: "None",
    selectedCodes: []
  };

  async requestData(area) {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    let api =
      process.env.NODE_ENV === "production"
        ? `https://backend-dot-courserecommender.appspot.com/areainfo/${area}`
        : `http://localhost:4000/areainfo/${area}`;
    await fetch(api, requestOptions)
      .then(responseHandler)
      .then(data => {
        let tempdata = [];
        data.forEach(code => {
          tempdata.push(code.courseid);
        });
        this.setState({ loaded: true, selectedCodes: tempdata });
      })
      .catch(function(error) {
        if (error === "Invalid Token") {
          localStorage.removeItem("user");
          history.push("/home");
        }
        window.alert(error);
      });
  }

  handleListItemClick = value => {
    this.handleClose(value);
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    if (value === "None") {
      this.setState({ open: false, loaded: false });
    } else {
      this.setState({
        selectedValue: value.AOSName,
        open: false,
        loaded: false
      });
      this.requestData(value.AOSId);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="subtitle1">
          Selected: {this.state.selectedValue}
        </Typography>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Choose an area of study
        </Button>
        <br />
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => {
                  this.handleClose(this.state.selectedValue);
                }}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Area of Study
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {areas.rows.map((area, i) => (
              <React.Fragment key={i}>
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(area)}
                  key={area.AOSId}
                >
                  <ListItemText primary={area.AOSName} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Dialog>
        <br />
        <Typography variant="subtitle1">Results:</Typography>
        <br />
        {this.state.loaded && (
          <UnitsTable
            type="recommendation"
            rec={this.state.selectedCodes.join(",")}
          />
        )}
      </div>
    );
  }
}
AreasOfStudy.propTypes = {
  classes: PropTypes.object.isRequired
};
const AreasOfStudyWithStyles = withStyles(styles)(AreasOfStudy);
export default AreasOfStudyWithStyles;
