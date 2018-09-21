import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { calendar } from './calendar.reducer';
import { newAppointment } from './new.appointment.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    calendar,
    newAppointment,
    alert
});

export default rootReducer;
