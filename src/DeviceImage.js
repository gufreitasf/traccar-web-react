import React, { Component } from 'react';
import SVG from 'react-inlinesvg';

export default class DeviceImage extends Component {
    
    render() {
        let category = this.props.category;
        if(category == null)
            category = "car";
        const url = "images/" + category + ".svg";
        const Icon = () => <SVG src={url} />;
        // return <img src={"categoty/" + category + ".svg"} alt=""/>
        return <Icon />
    }
};
