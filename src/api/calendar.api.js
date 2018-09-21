import * as ApiData from "../helpers/ApiData";
import endpoints from "./endpoints";
import moment from "moment";

export const calendarApi = {
    getAppointments,
    setAppointment
};

async function getAppointments(startDateUTC, endDateUTC) {
    const params = { startDateUTC, endDateUTC };

    try {
        const result = await ApiData.Get(endpoints.appointment, params);

        if (result && result.success) {
            return result.data;
        } else {
            throw("Error occured while trying to fetch calendar appointments");
        }

    } catch (error) {
        return {
            success: false,
            data: []
        }
    }
}

async function setAppointment(props) {
    const data = {
        startTimestampUTC: moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        endTimestampUTC: moment().add(1, "month").endOf("month").format("YYYY-MM-DD HH:mm:ss"),
        apptStartTimestampUTC: props.startDateUTC,
        apptEndTimestampUTC: props.endDateUTC,
        comment: props.comment
    }

    try {
        const result = await ApiData.Post(endpoints.appointment, data);

        if (result && result.success) {
            return result.data;
        } else {
            throw("Error occured while trying to fetch calendar appointments");
        }

    } catch (error) {
        return {
            success: false,
            data: []
        }
    }
}
