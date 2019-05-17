import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { changeUnits, changeLoaded } from "../actions";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookIcon from "@material-ui/icons/Book";
import BuildIcon from "@material-ui/icons/Build";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { UnitsTable, Recommendation } from "../components";
import { history, authHeader, responseHandler } from "../helpers";
import config from "../config.json";
const drawerWidth = 250;

const logo = require(`../assets/${Math.floor(Math.random() * 20)}.jpg`);

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  card: {
    minWidth: 275,
    margin: "50px 50px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320,
    margin: "100px auto"
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
});

class HomePage extends React.Component {
  api =
    process.env.NODE_ENV === "production"
      ? `${config.api_prod}/courses/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      : `${config.api_dev}/courses/${
          JSON.parse(localStorage.getItem("user")).id
        }`;
  state = {
    anchorEl: null,
    open: false,
    current: "Units of Study"
  };

  async componentDidMount() {
    this.requestData();
  }
  async requestData() {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    await fetch(this.api, requestOptions)
      .then(responseHandler)
      .then(data => {
        this.props.changeUnits({ units: data });
        this.props.changeLoaded({ loaded: true });
      })
      .catch(function(error) {
        if (error === "Invalid Token") {
          localStorage.removeItem("user");
          history.push("/home");
        }
        window.alert(error);
      });
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  handleSignout = () => {
    localStorage.removeItem("user");
    history.push("/home");
  };
  handleSidebarClick = event => {
    this.setState({ current: event.target.innerHTML });
  };
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Course Recommender
            </Typography>
            <IconButton
              color="inherit"
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuClick}
            >
              <Avatar alt={localStorage.getItem("user")} src={logo} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleSignout}>Sign Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText
                primary="Units of Study"
                onClick={this.handleSidebarClick}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText
                primary="Course Management"
                onClick={this.handleSidebarClick}
              />
            </ListItem>
          </List>
        </Drawer>
        {this.props.loaded && (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {this.state.current === "Units of Study" && (
              <React.Fragment>
                {this.props.units.length !== 0 && (
                  <React.Fragment>
                    <Typography variant="h4" gutterBottom component="h2">
                      Your completed units of study
                    </Typography>
                    <UnitsTable />
                    <br />
                  </React.Fragment>
                )}
                <Typography variant="h4" gutterBottom component="h2">
                  Below are the course recommendation options to assist you with
                  your enrollment
                </Typography>
                <Recommendation />
              </React.Fragment>
            )}
            {this.state.current === "Course Management" && (
              <React.Fragment>
                <Typography variant="h4" gutterBottom component="h2">
                  Course Management
                </Typography>
                <UnitsTable type="modification" />
              </React.Fragment>
            )}
          </main>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { units, loaded } = state;
  return {
    units: units.units,
    loaded: loaded.loaded
  };
}

const withStylesHomePage = connect(
  mapStateToProps,
  { changeUnits, changeLoaded }
)(withStyles(styles)(HomePage));

export { withStylesHomePage as HomePage };
