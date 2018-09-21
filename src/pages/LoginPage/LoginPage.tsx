import * as React from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Icon, Input, Layout, Row, Spin } from "antd";
import { PageFooter } from "../../components";
import { userActions, alertActions } from "../../store/actions";

// Typings
import { History, Location } from "@types/history";

const { Content } = Layout;
const FormItem = Form.Item;

interface IProps {
    history: History; // react history
    location: Location; // react history
    match: any; // react router
    form: Form; // ant
    dispatch: any; // redux
    loggingIn: boolean | undefined; // redux
    staticContext: any; // redux
}

class LoginPage extends React.Component <IProps, {}> {
    constructor(props: IProps) {
        super(props);

        // Reset login status
        props.dispatch(userActions.logout());
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err: any, values: any) => {
            const { dispatch } = this.props;

            if (!err) {
                dispatch(userActions.login(values.username, values.password));
            } else {
                dispatch(alertActions.error("Error logging in, please try again"));
            }
        });
    }

    render() {
        const { loggingIn } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Layout>
                <Content>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col xs={22} sm={18}  className="auth-container">
                            <Spin spinning={!!loggingIn} delay={100}>
                                <div className="login-form-page">

                                    <div className="login-form-header">D<Icon type="appstore" theme="outlined" />MO<br/>Appointment Scheduler</div>

                                    <Form className="login-form" onSubmit={this.handleSubmit}>
                                        <FormItem label="Username (demo, alice, bob, charlie, eve)" required={false}>
                                            {getFieldDecorator("username", {
                                                rules: [{ required: true, message: "Please input your username" }],
                                            })(
                                                <Input id="username" className="login-form-input" prefix={<Icon type="user" />} size="large" placeholder="Enter Username" autoComplete="off"/>                            
                                            )}
                                        </FormItem>
                                        <FormItem label="Password (same as username)" required={false}>
                                            {getFieldDecorator("password", {
                                                rules: [{ required: true, message: "Please input your Password!" }],
                                            })(
                                                <Input id="password" className="login-form-input" prefix={<Icon type="lock" />} type="password" size="large" placeholder="Enter Password" autoComplete="off"/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" size="large" className="login-form-button">SIGN IN</Button>
                                        </FormItem>
                                    </Form>

                                </div>
                            </Spin>
                        </Col>
                    </Row>
                </Content>
                <Row type="flex" justify="space-around" align="middle">
                    <PageFooter />
                </Row>
            </Layout>
        );
    }
}

function mapStateToProps(state: any) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const Page = Form.create()(LoginPage);
const connectedLoginPage = connect(mapStateToProps)(Page);
export { connectedLoginPage as LoginPage };
