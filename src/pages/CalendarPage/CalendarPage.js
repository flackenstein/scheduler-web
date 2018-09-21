import React from "react";
import { connect } from "react-redux";
import { Calendar, Icon, Layout, Row, Tooltip } from "antd";
import moment from "moment";
import CalendarMenu from "./CalendarMenu";
import { NewAppointment } from "./NewAppointment";
import { calendarActions } from '../../store/actions';

const { Content } = Layout;

moment.updateLocale('en', {
    weekdaysMin: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
});

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(),
            visible: false
        }

    }

    dateCellRender = (value) => {
        const date = value.format("YYYY-MM-DD");
        const appointments = this.props.calendar.appointments;
        const list = appointments && appointments[date] ? appointments[date].filter(a => !!a.username) : [];

        return (
            <ul className="appointment-list">
                {
                    list.map((item, index) => (
                        <li key={index}>
                            <div className="appointment-time"><Icon type="calendar" theme="outlined" />  {moment(item.startTimestampUTC).format("h:mmA")} - {moment(item.endTimestampUTC).format("h:mmA")}</div>
                            <Tooltip title={<div><Icon type="solution" theme="outlined" />  {item.comment}</div>}>
                                <div className="appointment-comment">{item.comment}</div>
                            </Tooltip>
                        </li>
                    ))
                }
            </ul>
        );
    }

    getMonthData = (value) => {
        if (value.month() === 0) {
            return "TODO: Summarize appointments by month, clicking on cell reopens month view for selected month.";
        }
    }

    monthCellRender = (value) => {
        const data = this.getMonthData(value);
        return data ? (
            <div className="appointment-month">
                <section>{data}</section>
            </div>
        ) : null;
    }

    onDateSelect = (value) => {
        if (!!value === false) value = moment();
        this.setState({
            selectedDate: value,
            visible: true
        });
    }

    onPanelChange = (value) => {
        this.setState({ selectedDate: value, visible: false });
    }

    removeCellTitle() {
        // Hack - removes date title from calendar cell.  Ideally would extend antd calendar class and overwrite table header method.
        document.querySelectorAll(".appointment-calendar td").forEach(element => element.title = "")
    }

    componentDidMount() {
        // Fetch appointment and schedule data for three months centered on the current month
        const startDateUTC = moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD HH:mm:ss");
        const endDateUTC = moment().add(1, "month").endOf("month").format("YYYY-MM-DD HH:mm:ss");
        this.props.dispatch(calendarActions.getAppointments(startDateUTC, endDateUTC));

        // Remove cell titles
        this.removeCellTitle();
   }

    componentDidUpdate() {
        // Remove cell titles
        this.removeCellTitle();
    }

    render() {
        const { selectedDate, visible } = this.state;

        return (
            <Layout>
                <Content>
                    <Row className="calendar-page">
                        <CalendarMenu OnAppointment={this.onDateSelect} {...this.props} />
                        <Row className="appointment-calendar">
                            <Calendar
                                dateCellRender={this.dateCellRender}
                                monthCellRender={this.monthCellRender}
                                disabledDate={(date) => moment().isAfter(date, "days")}
                                onSelect={this.onDateSelect}
                                onPanelChange={this.onPanelChange}
                            />
                        </Row>
                    </Row>
                </Content>
                <NewAppointment
                    selectedDate={selectedDate}
                    visible={visible}
                    onHide={() => { this.setState({ visible: false }) }}
                    onChange={selectedDate => { this.setState({ selectedDate }) }}
                />
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, calendar } = state;
    const { user } = authentication;
    return {
        user,
        calendar
    };
}

const connectedCalendarPage = connect(mapStateToProps)(CalendarPage);
export { connectedCalendarPage as CalendarPage };
