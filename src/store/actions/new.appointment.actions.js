import { newAppointmentConstants, calendarConstants } from "../constants";
import { alertActions } from '../../store/actions';
import { calendarApi } from "../../api";
import moment from "moment";

export const newAppointmentActions = {
    getAppointment,
    setAppointment
};

function getAppointment(DateUTC) {
    const startDateUTC = moment(DateUTC).startOf("day").format("YYYY-MM-DD HH:mm:ss");
    const endDateUTC = moment(DateUTC).endOf("day").format("YYYY-MM-DD HH:mm:ss");

    return (dispatch) => {
        Promise.resolve().then(() => {
            return calendarApi.getAppointments(startDateUTC, endDateUTC);
        }).then(result => {
            dispatch({
                type: newAppointmentConstants.APPOINTMENT_SUCCESS,
                list: result || []
            });
        })
        .catch(error => {
            dispatch({
                type: newAppointmentConstants.APPOINTMENT_FAILURE,
                list: []
            });
        });
    };
}

function setAppointment(props) {
    const { startTimestampUTC, endTimestampUTC, comment } = props;
    const startDateUTC = startTimestampUTC.format("YYYY-MM-DD HH:mm:ss");
    const endDateUTC = endTimestampUTC.format("YYYY-MM-DD HH:mm:ss");

    return (dispatch) => {
        Promise.resolve().then(() => {
            return calendarApi.setAppointment({ startDateUTC, endDateUTC, comment });
        }).then(result => {
            const appointments = [];

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

            dispatch(alertActions.success("Appointment Added!"));
        })
            .catch(error => {
                dispatch({
                    type: newAppointmentConstants.APPOINTMENT_FAILURE,
                    list: []
                });
        });
    };




}
