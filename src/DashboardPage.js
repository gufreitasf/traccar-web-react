import React, { Component } from 'react';
import Layout from './Layout'
import DeviceChartSum from './DeviceChartSum'
import DeviceChart from './DeviceChart'
import DeviceTable from './DeviceTable'

export default class DashboardPage extends Component {
    
    render() {
        const divStyle = {float: "left", "margin": "20px" };
        const numDevices = 100;
        return (
            <Layout history={this.props.history}>
                <h1 align="center">Dashboard dos dispositivos</h1>
                <div style={ divStyle } >
                    <DeviceChartSum 
                        totalValue={ numDevices }
                        updated={600}
                        outdated={60}
                        maintenance={10}
                     />
                </div>
                <div style={ divStyle } >
                    <DeviceTable />
                </div>              
            </Layout>
        );
    }
};
