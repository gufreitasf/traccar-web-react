import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { connect } from 'react-redux'
import DivIcon from './leaflet/DivIcon';
import DeviceImage from './DeviceImage'

const mapStateToProps = state => ({
  positions: state.positions,
  selectedDevices: state.selectedDevices,
  centerMap: state.centerMap
});

class MainMap extends Component {
  state = {
    zoom: 12,
  }

  render() {
    const centerMap = [this.props.centerMap.lat, this.props.centerMap.lng];
    const markers = this.props.positions.map(position =>
      {
        let device = this.props.selectedDevices.find( device => device.id=== position.deviceId );
        if( device ) {
          return (
            <DivIcon key={position.id.toString()} position={{ lat: position.latitude, lng: position.longitude }} className="" iconSize={[50, 50]}>
              <DeviceImage category={ device.category } lastUpdate={ device.lastUpdate }/>
            </DivIcon>
          )
        }
        else {
          return "";
        }
      }
    );

    return (
      <Map style={{height: this.props.height, width: this.props.width}} center={centerMap} zoom={this.state.zoom}>
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
        {markers}
      </Map>
    )
  }
}

export default connect(mapStateToProps)(MainMap);
