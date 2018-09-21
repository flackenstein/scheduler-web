import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import { history } from "../helpers";
import { alertActions } from "../store/actions";
import { PrivateRoute } from "../components";

import * as Pages from "../pages";

// Limit number of screen messages to no more than one at a time.
message.config({
    maxCount: 1
})

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

    }

    render() {
        const { alert } = this.props;
        
        if (alert.message) {
            message[alert.type](alert.message);
        }

        return (
            <Router history={history}>
                <div>
                    <PrivateRoute exact path="/" component={Pages.CalendarPage} />
                    <Route path="/login" component={Pages.LoginPage} />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
