import React, { Component } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';

export default class DeviceImage extends Component {
    
    render() {
        let category = this.props.category;
        let loadTime = new Date();
        let lastUpdate = new Date( Date.parse( this.props.lastUpdate !==null ? this.props.lastUpdate : "01/01/2000") );
        let last6hours = new Date( loadTime.getTime() - 6*3600000 ); //Última 6 horas
        let last72hours = new Date( loadTime.getTime() - 72*3600000 ); //Última 72 horas

        if(category == null)
            category = "car";

        let fill = "#009933";
        if(lastUpdate > last6hours) {
            fill = "#009933";
        }
        else if(lastUpdate > last72hours && lastUpdate <= last6hours) {
            fill = "#ff9933";
        }
        else {
            fill = "#ff3300";
        }

        const url = "images/" + category + ".svg";
        return (
        <SvgLoader path={url}>
            <SvgProxy selector="#background" fill={fill}/>
        </SvgLoader>
        )
    }
};
