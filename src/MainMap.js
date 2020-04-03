import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux'
import DivIcon from './leaflet/DivIcon';
import DeviceImage from './DeviceImage'

const mapStateToProps = state => ({
  positions: state.positions,
  devices: state.devices,
  centerMap: state.centerMap
});

class MainMap extends Component {
  state = {
    zoom: 15,
  }

  render() {
    const position = [this.props.centerMap.lat, this.props.centerMap.lng];

    const markers = this.props.positions.map(position =>
      <DivIcon key={position.id.toString()} position={{ lat: position.latitude, lng: position.longitude }} className="" iconSize={[50, 50]}>
        <DeviceImage />
      </DivIcon>
    );

    return (
      <Map style={{height: this.props.height, width: this.props.width}} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
        {markers}
      </Map>
    )
  }
}

export default connect(mapStateToProps)(MainMap);
