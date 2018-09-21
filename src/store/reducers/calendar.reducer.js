import { calendarConstants } from "../constants";

let calendar = JSON.parse(localStorage.getItem("calendar"));
const initialState = !calendar ? { Loading: true, Updating: false, appointments: {} } : {};

export function calendar(state = initialState, action) {
    switch (action.type) {
        case calendarConstants.APPOINTMENT_REQUEST:
            return {
                Loading: true,
                Updating: false,
                appointments: action.appointments
            };
        case calendarConstants.APPOINTMENT_UPDATE:
            return {
                Loading: false,
                Updating: true,
                appointments: action.appointments
            };
        case calendarConstants.APPOINTMENT_SUCCESS:
            return {
                Loading: false,
                Updating: false,
                appointments: action.appointments
            };
        case calendarConstants.APPOINTMENT_FAILURE:
            return {};
        default:
            return state
    }
}
