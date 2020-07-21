import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
    devices: state.devices
  });

class DeviceSelector extends Component {
    render() {
        let { devices, defaultValue, disableClearable } = this.props;
        if(defaultValue === null)
            defaultValue = [];

        if( devices && devices.length > 0 ) {

            return  (
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={devices}
                    defaultValue={defaultValue}
                    disableClearable={disableClearable}
                    clearText="Limpar seleção"
                    filterSelectedOptions={false}
                    style={{ maxWidth: 400 }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Nome do dispositivo"
                        placeholder="Dispositivo"
                        margin="normal"
                    />
                    )}
                    onChange={(event, newValue) => {
                        this.props.onChange(event, newValue);
                      }}
                />
            );
        }
        else {
            return ""
        }
    }
}

export default connect(mapStateToProps)(DeviceSelector);
