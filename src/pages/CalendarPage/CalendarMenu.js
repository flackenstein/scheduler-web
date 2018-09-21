import React from "react";
import { Link } from "react-router-dom";
import { Icon, Row } from "antd";
import moment from "moment";

export default (props) => (
    <Row className="calendar-menu">
        <span className="menu-item-left" onClick={() => { props.OnAppointment(moment()) }}>
            <Icon type="plus-circle" theme="outlined" />Add New Appointment
        </span>
        <span className="menu-item-center">
            Demo Appointment Scheduler - Welcome {props.user.firstname}
        </span>
        <span className="menu-item-right">
            <Link to="/login">
                <Icon type="logout" theme="outlined" />Logout
            </Link>
        </span>
    </Row>
)
