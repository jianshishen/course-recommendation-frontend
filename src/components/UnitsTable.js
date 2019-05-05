import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
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

const requestOptions = {
  method: "GET",
  headers: authHeader()
};

let id = 0;
function createData(name, code, semester, area, number) {
  id += 1;
  return { id, name, code, semester, area, number };
}

class UnitsTable extends React.Component {
  state = { datadisplay: [] };

  async requestDetail(units) {
    let apidata =
      process.env.NODE_ENV === "production"
        ? `https://backend-dot-courserecommender.appspot.com/info/${units}`
        : `http://localhost:4000/info/${units}`;
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
                <CustomTableCell align="right">
                  Students Enrolled
                </CustomTableCell>
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
  null
)(withStyles(styles)(UnitsTable));

export { withStylesUnitsTable as UnitsTable };
