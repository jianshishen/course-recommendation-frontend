import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
};

let id = 0;
function createData(name, code, semester, area) {
  id += 1;
  return { id, name, code, semester, area };
}

const data = [
  createData(
    "Nature of Systems",
    "HTIN5001",
    "Semester 1",
    "Health Technology Innovation"
  ),
  createData(
    "Information Security Management",
    "INFO5301",
    "Semester 1",
    "Information Technology"
  ),
  createData("Nuclear Physics", "PHYS5011", "Semester 1", "Physics"),
  createData("Australian Income Tax", "LAWS5112", "Semester 1", "Law"),
  createData("Combustion", "MECH5265", "Semester 2", "Mechanical Engineering")
];

class CourseManagement extends React.Component {
  state = {
    modify: 0
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell align="right">Code</CustomTableCell>
                <CustomTableCell align="right">Semester</CustomTableCell>
                <CustomTableCell align="right">Area of Study</CustomTableCell>
                <CustomTableCell align="right">Modification</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell align="right">{n.code}</TableCell>
                  <TableCell align="right">{n.semester}</TableCell>
                  <TableCell align="right">{n.area}</TableCell>
                  <TableCell align="right">
                    {
                      <Button
                        type="button"
                        onClick={() => {
                          this.setState({ modify: 1 });
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Modify
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <br />
        {this.state.modify === 1 && (
          <Paper className={classes.root}>
            <TextField
              id="standard-name"
              label="Input a course code"
              className={classes.textField}
              margin="normal"
            />
            <Button type="button" variant="contained" color="primary">
              Submit
            </Button>
            <Button type="button" variant="contained" color="secondary">
              Delete
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

CourseManagement.propTypes = {
  classes: PropTypes.object.isRequired
};

const withStylesCourseManagement = withStyles(styles)(CourseManagement);
export { withStylesCourseManagement as CourseManagement };
