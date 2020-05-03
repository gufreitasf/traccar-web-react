import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { resetUser } from './actions';

const mapStateToProps = state => ({
  user: state.user
});

const styles = theme => ({
  flex: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#123554'
  },
  list: {
    width: 250
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});

class MainToobar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  openDrawer() {
    this.setState({
      drawer: true
    });
  };

  closeDrawer() {
    this.setState({
      drawer: false
    });
  };

  handleLogout() {
    fetch("/api/session", {
      method: "DELETE"
    }).then(response => {
      if (response.ok) {
        this.props.history.push('/login');
        this.props.dispatch(resetUser(this.props.user));
      }
    });
  }

  setVisibleView(viewId, visible) {
    var view = document.getElementById(viewId);
    if( view !== null )
      view.style.display = visible ? "flex" : "none";
  }

  handleDashboard() {
    this.props.history.push('/dashboard');
  }

  handleHome() {
    this.props.history.push('/');
  }

  render() {
    const { classes, user } = this.props;
    const isManager = user !== null ? user.userLimit !== 0 : false;
    const isAdmin = user != null ? user.administrator : false;
  
    return (
      <Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.openDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
            __short_name__
            </Typography>
            <Button color="inherit" onClick={this.handleLogout}>Sair</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.drawer} onClose={this.closeDrawer}>
          <div
            tabIndex={0}
            className={classes.list}
            role="button"
            onClick={this.closeDrawer}
            onKeyDown={this.closeDrawer}>
            <List>
              <ListItem button onClick={this.handleHome}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItem>
              <ListItem button onClick={this.handleDashboard} 
                        style={isManager || isAdmin ? { display: 'none' } : { display: 'flex' }}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Relatórios" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItem>
              <ListItem button onClick={this.handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(MainToobar);