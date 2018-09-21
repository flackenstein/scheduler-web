import { calendarConstants } from "../constants";
import { calendarApi } from "../../api";
import moment from "moment";

export const calendarActions = {
    getAppointments
};

function getAppointments(startDateUTC, endDateUTC) {
    return (dispatch) => {
        Promise.resolve().then(() => {
            return calendarApi.getAppointments(startDateUTC, endDateUTC);
        }).then(result => {
            const appointments = {};

            result.map(appt => {
                const date = moment(appt.startTimestampUTC).format("YYYY-MM-DD");
                if (appointments.hasOwnProperty(date)) {
                    appointments[date].push(appt);
                } else {
                    appointments[date] = [appt];
                }
            })

            dispatch({
                type: calendarConstants.APPOINTMENT_SUCCESS,
                appointments
            });
        })
        .catch(error => {
            dispatch({
                type: calendarConstants.APPOINTMENT_FAILURE,
                appointments: {}
            });
        });    
    };
}
