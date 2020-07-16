export const updateDevices = devices => ({
  type: 'UPDATE_DEVICES',
  devices
})

export const updateUsers = users => ({
  type: 'UPDATE_USERS',
  users
})

export const selectDevices = selectedDevices => ({
  type: 'SELECT_DEVICES',
  selectedDevices
})

export const updatePositions = positions => ({
  type: 'UPDATE_POSITIONS',
  positions
});

export const updateEvents = events => ({
  type: 'UPDATE_EVENTS',
  events
})

export const centerMapPosition = centerMap => ({
  type: 'CENTER_MAP_POSITION',
  centerMap
});

export const updateCurrentUser = user => ({
  type: 'UPDATE_CURRENT_USER',
  user
});

export const resetUser = user => ({
  type: 'RESET_USER',
  user
});

