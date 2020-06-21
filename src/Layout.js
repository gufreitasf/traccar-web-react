import React, { Component } from 'react';
import withWidth from '@material-ui/core/withWidth';
import withStyles from '@material-ui/core/styles/withStyles';
import MainToobar from './MainToolbar';

const styles = theme => ({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    },
    content: {
      flexGrow: 1,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column-reverse"
      }
    },
    drawerPaper: {
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        width: 350
      },
      [theme.breakpoints.down('xs')]: {
        height: 250
      }
    },
    mapContainer: {
      flexGrow: 1
    }
  });

  class Layout extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        const { classes } = this.props;
        return(
          <div className={classes.root}>
              <MainToobar history={this.props.history} />
                 { this.props.children }
            </div>
        );
    }
}

export default withWidth()(withStyles(styles)(Layout));