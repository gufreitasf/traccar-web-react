const initialState = {
  devices: [],
  positions: [],
  events: [],
  centerMap: {
    lat: -19.8756769,
    lng: -43.955244,
  },
  user: null
};

function rootReducer(state = initialState, action) {

  console.log(action);

  switch (action.type) {
    case "RESET_USER": {
      return initialState;
    }

    case 'UPDATE_DEVICES': {

      let devices = state.devices;

      action.devices.forEach(function(newValue) {
        var existing = devices.filter(function(v, i) {
          return v.id === newValue.id;
        });
        if (existing.length) {
          var existingIndex = devices.indexOf(existing[0]);
          devices[existingIndex] = newValue;
        }
        else
          devices.push(newValue);
      });

      return Object.assign({}, {
        ...state,
        devices: [...devices]
      });
    }

    case 'UPDATE_POSITIONS':
      return Object.assign({}, {
        ...state,
        positions: [...action.positions]
      });

    case 'CENTER_MAP_POSITION':
      return Object.assign({}, {
        ...state,
        centerMap: action.centerMap
      });

    case 'UPDATE_CURRENT_USER':
      return Object.assign({}, {
        ...state,
        user: action.user
      });
    default:
      return state;
  }
}

export default rootReducer
