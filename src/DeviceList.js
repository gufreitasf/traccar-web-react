import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateDevices, centerMapPosition } from './actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import DeviceImage from './DeviceImage'

const mapStateToProps = state => ({
  positions: state.positions,
  devices: state.devices
});

class DeviceList extends Component {
  componentDidMount() {
    fetch('/api/devices').then(response => {
      if (response.ok) {
        response.json().then(devices => {
          this.props.dispatch(updateDevices(devices));
        });
      }
    });
  }

  handleClick(deviceId, event) {
    event.preventDefault();

    var devPositions = this.props.positions.filter(function(position, i) {
      return position.deviceId === deviceId;
    });

    if(devPositions.length) {
      const {latitude, longitude} = devPositions[0];
      const position = {lat: latitude, lng: longitude};
 
      this.props.dispatch(centerMapPosition(position));
      
    }
  } 

  render() {
    const devices = this.props.devices.map(device =>
      <Fragment key={device.id.toString()}>
        <ListItem button onClick={this.handleClick.bind(this,device.id) }>
          <DeviceImage category={device.category} />
          <ListItemText primary={device.name} secondary={device.uniqueId} />
          <ListItemSecondaryAction>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <li>
          <Divider variant="inset" />
        </li>
      </Fragment>
    );

    return (
      <List>
        {devices}
      </List>
    );
  }
}

export default connect(mapStateToProps)(DeviceList);
