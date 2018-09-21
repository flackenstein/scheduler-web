import { newAppointmentConstants } from "../constants";

let appointment = JSON.parse(localStorage.getItem("appointment"));
const initialState = !appointment ? { loading: false, updating: false, list: [] } : {};

export function newAppointment(state = initialState, action) {
    switch (action.type) {
        case newAppointmentConstants.APPOINTMENT_REQUEST:
            return {
                loading: true,
                updating: false,
                list: []
            };
        case newAppointmentConstants.APPOINTMENT_UPDATE:
            return {
                loading: false,
                updating: true,
                list: action.list
            };
        case newAppointmentConstants.APPOINTMENT_SUCCESS:
            return {
                loading: false,
                updating: false,
                list: action.list
            };
        case newAppointmentConstants.APPOINTMENT_FAILURE:
            return {};
        default:
            return state
    }
}
