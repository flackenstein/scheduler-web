import React from "react";
import { connect } from "react-redux";
import { Badge, Col, DatePicker, Form, Icon, Input, Modal, Row, Select, Spin } from "antd";
import moment from "moment";
import { newAppointmentActions, alertActions } from '../../store/actions';

const { Option, OptGroup } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;

// Used to filter avaialbe hours to schedule new appointment
// TODO:  Add endpoint and store object to handle office meta data such as hours of operation...
const MORNING_HOURS = [6, 7, 8, 9, 10, 11];
const AFTERNOON_HOURS = [12, 13, 14, 15, 16, 17];

class NewAppointment extends React.Component {
    state = {
        isValidated: false,
        isError: null
    }

    isValid = () => {
        return new Promise((resolve, reject) => {
            this.props.form.validateFields(
                (err) => {
                    if (err) {
                        reject();
                    }
                    resolve();
                }
            )
        })
    }

    getMorningTimes = () => {
        let hours = MORNING_HOURS;

        // Filter appointment hours from available hours
        this.props.list.map(appt => {
            const apptHour = moment(appt.startTimestampUTC).hour();
            if (apptHour < 12) {
                hours = hours.filter(hr => hr != apptHour)
            }
        });

        if (hours.length) {
            const list = hours.map(hr => {
                const hour = moment().hour(hr).format("h:00 A");
                return <Option key={hr} value={hr}>{hour}</Option>
            });

            return <OptGroup label="Morning">{list}</OptGroup >;
        } else {
            return null;

        }
    }

    getAfternoonTimes = () => {
        let hours = AFTERNOON_HOURS;

        // Filter appointment hours from available hours
        this.props.list.map(appt => {
            const apptHour = moment(appt.startTimestampUTC).hour();
            if (apptHour > 11) {
                hours = hours.filter(hr => hr != apptHour)
            }
        });

        if (hours.length) {
            const list = hours.map(hr => {
                const hour = moment().hour(hr).format("h:00 A");
                return <Option key={hr} value={hr}>{hour}</Option>
            });

            return <OptGroup label="Afternoon">{list}</OptGroup>;
        } else {
            return null;
        }
    }

    getMinAvailableHour() {
        let hours = MORNING_HOURS;
        hours = hours.concat(AFTERNOON_HOURS);

        this.props.list.map(appt => {
            const apptHour = moment(appt.startTimestampUTC).hour();
            hours = hours.filter(hr => hr != apptHour)
        });

        return hours.length ? hours[0] : null;
    }

    getAppointments = () => {
        const list = this.props.list.filter(appt => !!appt.username);

        if (!!list.length === false) return null;

        const appointments = list.map((appt, index) => {
            const startTime = moment(appt.startTimestampUTC).format("h:mmA");
            const endTime = moment(appt.endTimestampUTC).format("h:mmA");
            const comment = appt.comment;
            const text = `${startTime} - ${endTime}:`;
            return (
                <div key={index} className="new-appointment-item">
                    <div className="new-appointment-time"><Badge key={index} status="success" text={text} /></div>
                    <div className="new-appointment-comment">{comment}</div>
                </div>
            )
        });

        return <div>{appointments}</div>;
    }

    handleAppointmentOk = (e) => {
        this.isValid().then(() => {

            const selectedDate = this.props.form.getFieldValue("selectedDate");
            const hour = this.props.form.getFieldValue("selectedTime");
            const comment = this.props.form.getFieldValue("comment") || "";
    
            const startTimestampUTC = moment(selectedDate).hour(hour).startOf("hour");
            const endTimestampUTC = moment(startTimestampUTC).add(1, "hour");
    

            this.props.dispatch(newAppointmentActions.setAppointment({
                startTimestampUTC,
                endTimestampUTC,
                comment
            }));



            this.props.onHide();





        }).catch(err => {
            this.props.dispatch(alertActions.error("Missing required fields"));
        });
    }

    handleAppointmentCancel = (e) => {
        this.props.onHide();
    }

    handleDateChange = (value) => {
        const date = moment(value);
        this.props.onChange(date);
        this.props.dispatch(newAppointmentActions.getAppointment(date));
    }

    handleTimeChange(value) {
        console.log(`selected ${value}`);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.visible && nextProps.visible != this.props.visible) {
            this.props.dispatch(newAppointmentActions.getAppointment(nextProps.selectedDate));
        }

        return true;
    }

    render() {
        if (this.props.visible === false) return null;

        const { getFieldDecorator } = this.props.form;
        const morningTimes = this.getMorningTimes();
        const afternoonTimes = this.getAfternoonTimes();
        const minHour = this.getMinAvailableHour();
        const list = this.getAppointments();

        return (
            <Modal
                className="new-appointment"
                title="Schedule New Appointment"
                centered
                visible={this.props.visible}
                
                onOk={this.handleAppointmentOk}
                onCancel={this.handleAppointmentCancel}
            >
                <Spin delay={500} spinning={this.props.visible && (this.props.loading || this.props.updating)}>
                    <Form>
                        <Row gutter={20}>
                            <Col span={14} className="new-appointment-date">
                                <FormItem>
                                    {getFieldDecorator('selectedDate', {
                                        initialValue: this.props.selectedDate,
                                        rules: [{ required: true, message: 'Please select a date!' }],
                                    })(
                                        <DatePicker
                                            plaaceholder="Select Appointment Date"
                                            onChange={this.handleDateChange}
                                            disabledDate={(date) => moment().isAfter(date, "days")}
                                            size={"large"}
                                            style={{ width: "100%" }}
                                        />
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={10} className="new-appointment-time">
                                <FormItem>
                                    {getFieldDecorator('selectedTime', {
                                        initialValue: minHour,
                                        rules: [{ required: true, message: 'Please select a time!' }],
                                    })(
                                        <Select
                                            placeholder="Select Appointment Time"
                                            style={{ width: "100%" }}
                                            onChange={this.handleTimeChange}
                                            size={"large"}
                                        >
                                            {morningTimes ? morningTimes : null}
                                            {afternoonTimes ? afternoonTimes : null}
                                        </Select>
                                    )}
                                </FormItem>
                           </Col>
                        </Row>

                        <div className="new-appointment-comment">
                            <FormItem>
                                {getFieldDecorator('comment', {})(
                                    <TextArea placeholder="Appointment Comments..." autosize={{ minRows: 2, maxRows: 6 }} />
                                )}
                            </FormItem>
                        </div>
                        
                        {!!list === false ? null : (
                            <div className="new-appointment-container">
                                <div className="new-appointment-header">Scheduled Appointments:</div>
                                <div className="new-appointment-list">{list}</div>
                            </div>
                        )}
                    </Form>
                </Spin>
            </Modal>

        );
    }
}

function mapStateToProps(state) {
    const { newAppointment } = state;
    const { loading, updating, list } = newAppointment;
    return {
        loading, updating, list
    };
}

const NewAppointmentForm = Form.create()(NewAppointment);
const connectedNewAppointment = connect(mapStateToProps)(NewAppointmentForm);

export { connectedNewAppointment as NewAppointment };
