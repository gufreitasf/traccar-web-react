import React, { Component } from 'react';
import Chart from 'react-minimal-pie-chart';

export default class DeviceChartSum extends Component {
    
    render() {
        
        return (
            <Chart
                animate
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={[
                    {
                      color: '#009933',
                      title: 'Atualizados',
                      value: this.props.updated
                    },
                    {
                      color: '#ff9933',
                      title: 'Desatualizados',
                      value: this.props.outdated
                    },
                    {
                      color: '#ff3300',
                      title: 'Manutenção',
                      value: this.props.maintenance
                    }
                ]}
                label
                labelPosition={110}
                labelStyle={{
                    fontFamily: 'sans-serif',
                    fontSize: '8px'
                }}
                lengthAngle={360}
                lineWidth={45}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={5}
                radius={30}
                rounded={false}
                startAngle={0}
                viewBoxSize={[
                    100,
                    100
                ]}
            /> 
        );
    }
};