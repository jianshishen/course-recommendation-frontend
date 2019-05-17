import React from "react";
import { connect } from "react-redux";
import { addUnits, deleteUnits } from "../actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import config from "../config.json";
import { authHeader, responseHandler } from "../helpers";

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
function createData(name, code, semester, area, number) {
  id += 1;
  return { id, name, code, semester, area, number };
}

class UnitsTable extends React.Component {
  state = { datadisplay: [] };

  async enrolCourse(id) {
    const requestOptions = {
      method: "PUT",
      headers: authHeader()
    };
    let api =
      process.env.NODE_ENV === "production"
        ? ``
        : `${config.api_dev}/courses/${
            JSON.parse(localStorage.getItem("user")).id
          }/${id}`;
    await fetch(api, requestOptions).catch(function(error) {
      window.alert(error);
    });
  }

  handleEnrol(coursename, courseid, semester, aosname) {
    let confirm = window.confirm(`Do you want to enrol ${courseid}?`);
    if (confirm) {
      try {
        this.enrolCourse(courseid);
        this.props.addUnits({ coursename, courseid, semester, aosname });
      } catch (err) {
        window.alert(err);
      }
    }
    window.location.reload();
  }

  async deleteCourse(id) {
    const requestOptions = {
      method: "DELETE",
      headers: authHeader()
    };
    let api =
      process.env.NODE_ENV === "production"
        ? ``
        : `${config.api_dev}/courses/${
            JSON.parse(localStorage.getItem("user")).id
          }/${id}`;
    await fetch(api, requestOptions).catch(function(error) {
      window.alert(error);
    });
  }

  handleDelete(id) {
    let confirm = window.confirm(`Do you want to delete ${id}?`);
    if (confirm) {
      try {
        this.deleteCourse(id);
        this.props.deleteUnits({ id });
        this.setState({
          datadisplay: this.state.datadisplay.filter(info => info.code !== id)
        });
      } catch (err) {
        window.alert(err);
      }
    }
  }

  async requestDetail(units) {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    let apidata =
      process.env.NODE_ENV === "production"
        ? `${config.api_prod}/info/${units}`
        : `${config.api_dev}/info/${units}`;
    await fetch(apidata, requestOptions)
      .then(responseHandler)
      .then(rec => {
        let temprec = [];
        rec.forEach(c => {
          temprec.push(
            createData(
              c.coursename,
              c.courseid,
              c.semester,
              c.aosname,
              c.percentage
            )
          );
        });
        this.setState({ datadisplay: temprec });
      })
      .catch(function(error) {
        window.alert(error);
      });
  }

  componentDidMount() {
    const { units, rec } = this.props;
    let tempunits = [];
    if (typeof rec !== "undefined") {
      this.requestDetail(rec);
    } else {
      units.forEach(c => {
        tempunits.push(
          createData(c.coursename, c.courseid, c.semester, c.aosname)
        );
      });
    }
    this.setState({ datadisplay: tempunits });
  }

  render() {
    const { classes, type } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell align="right">Code</CustomTableCell>
              <CustomTableCell align="right">Semester</CustomTableCell>
              <CustomTableCell align="right">Area of Study</CustomTableCell>
              {type === "modification" && (
                <CustomTableCell align="right">Modification</CustomTableCell>
              )}
              {type === "recommendation" && (
                <React.Fragment>
                  <CustomTableCell align="right">
                    Students Enrolled
                  </CustomTableCell>
                  <CustomTableCell align="right">Enrol</CustomTableCell>
                </React.Fragment>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {type !== "recommendation" &&
              this.state.datadisplay.map(n => (
                <TableRow key={n.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        `https://cusp.sydney.edu.au/students/view-unit-page/alpha/${
                          n.code
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    {n.name}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        `https://cusp.sydney.edu.au/students/view-unit-page/alpha/${
                          n.code
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    {n.code}
                  </TableCell>
                  <TableCell align="right">{n.semester}</TableCell>
                  <TableCell align="right">{n.area}</TableCell>
                  {type === "modification" && (
                    <TableCell align="right">
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleDelete(n.code)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {type === "recommendation" &&
              this.state.datadisplay.map(n => (
                <TableRow key={n.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        `https://cusp.sydney.edu.au/students/view-unit-page/alpha/${
                          n.code
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    {n.name}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        `https://cusp.sydney.edu.au/students/view-unit-page/alpha/${
                          n.code
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    {n.code}
                  </TableCell>
                  <TableCell align="right">{n.semester}</TableCell>
                  <TableCell align="right">{n.area}</TableCell>
                  <TableCell align="right">{n.number}</TableCell>
                  <TableCell align="right">
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        this.handleEnrol(n.name, n.code, n.semester, n.area)
                      }
                    >
                      Enrol
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UnitsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { units } = state;
  return {
    units: units.units
  };
}

const withStylesUnitsTable = connect(
  mapStateToProps,
  { addUnits, deleteUnits }
)(withStyles(styles)(UnitsTable));

export { withStylesUnitsTable as UnitsTable };
