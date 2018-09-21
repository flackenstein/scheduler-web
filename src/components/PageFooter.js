import React from "react";
import { Icon } from "antd";

export const PageFooter = () => (
    <div className="page-footer">
        <div className="footer-content">
            <span>Appointment Scheduler - </span>
            <span className="author"><Icon type="linkedin" theme="outlined" /><a href="https://www.linkedin.com/in/warren-flack" target="_blank">Warren Flack</a>,</span>
            <span className="email"><Icon type="mail" theme="outlined" /><a href="mailto:warren@theflacks.us">Warren Flack</a>,</span>
            <span className="location"><Icon type="global" theme="outlined" /><a href="https://www.google.com/maps/@47.156616,-94.7119312,13z" target="_blank">36360 County 39, Laporte, MN 56461</a></span>
        </div>
    </div>
);
