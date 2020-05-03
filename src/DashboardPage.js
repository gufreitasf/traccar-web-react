import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDevices } from './actions';
import Layout from './Layout'
import DeviceChartSum from './DeviceChartSum'
import DeviceTable from './DeviceTable'

const mapStateToProps = state => ({
    devices: state.devices
  });

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loadTime: new Date(),
          loading: true
        };
      }

    componentDidMount() {
        fetch('/api/session').then(response => {
            if (response.ok) {
                fetch('/api/devices').then(response => {
                    if (response.ok) {
                        response.json().then(devices => {
                            this.props.dispatch(updateDevices(devices));
                        });
                    }
                });
                this.setState({
                    loadTime: new Date(),
                    loading: false
                });
            } else {
              this.props.history.push('/login');
            }
          });
    }
    
    devicesBetweenTime(devices, from, to) {
        var filtred = devices.filter(function(v, i) {
            let lastUpdate = new Date( Date.parse( v.lastUpdate !==null ? v.lastUpdate : "01/01/2000") );
            return lastUpdate > from && lastUpdate <= to;
            });
        return filtred;
    }

    
    render() {
        const { loading } = this.state;
        if (loading) {
            return (
                <div>Carregando...</div>
            );
        } else {
            const divStyle = {float: "left", "margin": "20px" };
            const devices = this.props.devices;
            const updated = this.devicesBetweenTime( devices,
                                                    new Date(this.state.loadTime.getTime() - 6*3600000), //Última 6 horas 
                                                    this.state.loadTime );
            const outdated = this.devicesBetweenTime( devices,
                                                    new Date(this.state.loadTime.getTime() - 72*3600000), //Entre 6 e 72h
                                                    new Date(this.state.loadTime.getTime() - 6*3600000) );
            const maintenance = this.devicesBetweenTime( devices,
                                                    new Date(0), //Maior que 72h
                                                    new Date(this.state.loadTime.getTime() - 72*3600000) );
            return (
                <Layout history={this.props.history}>
                    <h1 align="center">Dashboard dos dispositivos</h1>
                    <div style={ divStyle } >
                        <DeviceChartSum
                            totalValue={ devices.length }
                            updated={ updated.length }
                            outdated={ outdated.length }
                            maintenance={ maintenance.length }
                        />
                    </div>
                    <div style={ divStyle } >
                        <DeviceTable devices={devices} />
                    </div>
                </Layout>
            );
        }
    }
};

export default connect(mapStateToProps)(DashboardPage);