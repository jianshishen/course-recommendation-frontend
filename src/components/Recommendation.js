import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import config from "../config.json";
import { UnitsTable } from "./UnitsTable";
import AreasOfStudy from "./AreasOfStudy";
import { Preferences } from "./Preferences";
import axios from "axios";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class Recommendation extends React.Component {
  state = {
    value: 0,
    recwals: undefined,
    recapri: undefined
  };
  requestCourseId(units, type) {
    let temp = [];
    units.forEach(c => {
      temp.push(c.courseid);
    });
    let api =
      process.env.NODE_ENV === "production"
        ? type === "recwals"
          ? `${config.recs_prod}/recommendation/wals?studentId=${
              JSON.parse(localStorage.getItem("user")).id
            }&courses=${temp.join(",")}&level=${
              JSON.parse(localStorage.getItem("user")).level
            }&numRecs=5`
          : `${config.recs_prod}/recommendation/apriori?courses=${temp.join(
              ","
            )}&numRecs=5`
        : type === "recwals"
        ? `${config.recs_dev}/recommendation/wals?studentId=${
            JSON.parse(localStorage.getItem("user")).id
          }&courses=${temp.join(",")}&level=${
            JSON.parse(localStorage.getItem("user")).level
          }&numRecs=5`
        : `${config.recs_dev}/recommendation/apriori?courses=${temp.join(
            ","
          )}&numRecs=5`;
    axios
      .get(api)
      .then(async data => {
        this.setState({ [type]: data.data.courses.join(",") });
      })
      .catch(function(error) {
        window.alert(error);
      });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  async componentDidMount() {
    let { units } = this.props;
    if (units.length !== 0) {
      await this.requestCourseId(units, "recwals");
      await this.requestCourseId(units, "recapri");
    }
  }

  render() {
    const { classes, units } = this.props;
    const { value } = this.state;
    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            {units.length !== 0 ? (
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={this.handleChange}
              >
                <LinkTab label="Course Rating" />
                <LinkTab label="Course Popularity" />
                <LinkTab label="Areas of Study" />
                <LinkTab label="Preference of Courses" />
              </Tabs>
            ) : (
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={this.handleChange}
              >
                <LinkTab label="Areas of Study" />
                <LinkTab label="Preference of Courses" />
              </Tabs>
            )}
          </AppBar>
          {value === 0 && typeof this.state.recwals !== "undefined" && (
            <TabContainer>
              <Typography variant="subtitle1">
                Below are the top 5 course recommendation based on students’
                course rating:
              </Typography>
              <UnitsTable rec={this.state.recwals} type="recommendation" />
            </TabContainer>
          )}
          {value === 1 && typeof this.state.recapri !== "undefined" && (
            <TabContainer>
              <Typography variant="subtitle1">
                Below are the top 5 courses that other students have also taken
                together with your completed units of study:
              </Typography>
              <UnitsTable rec={this.state.recapri} type="recommendation" />
            </TabContainer>
          )}
          {(units.length === 0 ? value === 0 : value === 2) && (
            <TabContainer>
              <AreasOfStudy />
            </TabContainer>
          )}
          {(units.length === 0 ? value === 1 : value === 3) && (
            <TabContainer>
              <Preferences />
            </TabContainer>
          )}
        </div>
      </NoSsr>
    );
  }
}

Recommendation.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { units } = state;
  return {
    units: units.units
  };
}

const withStylesRecommendation = connect(
  mapStateToProps,
  null
)(withStyles(styles)(Recommendation));

export { withStylesRecommendation as Recommendation };
