import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

function UnitsTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell align="right">Code</CustomTableCell>
            <CustomTableCell align="right">Semester</CustomTableCell>
            <CustomTableCell align="right">Area of Study</CustomTableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

UnitsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const withStylesUnitsTable = withStyles(styles)(UnitsTable);
export { withStylesUnitsTable as UnitsTable };
