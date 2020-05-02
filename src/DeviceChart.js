import React, { Component } from 'react';
import Chart from 'react-minimal-pie-chart';

export default class DeviceChart extends Component {
    
    render() {
        
        return (
            <Chart
                animate={false}
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={[
                    {
                    color: '#E38627',
                    value: 100
                    }
                ]}
                label
                labelPosition={0}
                labelStyle={{
                    fontFamily: 'sans-serif',
                    fontSize: '10px'
                }}
                lengthAngle={360}
                lineWidth={45}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                radius={30}
                rounded={false}
                startAngle={0}
                totalValue={100}
                viewBoxSize={[
                    100,
                    100
                ]}
                />
        );
    }
}
