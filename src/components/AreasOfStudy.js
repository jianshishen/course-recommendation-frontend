import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { UnitsTable } from "./UnitsTable";

const areas = ["Technology", "Law", "Physics", "Literature"];

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          Choose a area of study
        </DialogTitle>
        <div>
          <List>
            {areas.map(area => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(area)}
                key={area}
              >
                <ListItemText primary={area} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

class AreasOfStudy extends React.Component {
  state = {
    open: false,
    selectedValue: "None"
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
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
        <SimpleDialog
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
        <br />
        <Typography variant="subtitle1">Results:</Typography>
        <br />
        {this.state.selectedValue !== "None" && <UnitsTable />}
      </div>
    );
  }
}

export default AreasOfStudy;
