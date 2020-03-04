import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import {Helmet} from "react-helmet";
import logo from "./assets/img/logo.png";
import Layout from "./components/Layout";

const tools = [
    {
        name: "uuid-generator",
        loader: () => import("./components/tools/UuidGenerator.js"),
        title: "UUID Generator",
        description: "Generate UUIDv1 & UUIDv4",
        icon: undefined,
        color: 'orange'
    },
    {
        name: "password-generator",
        loader: () => import("./components/tools/PasswordGenerator.js"),
        title: "Password Generator",
        description: "Generate strong password",
        icon: undefined,
        color: 'grey'
    },
    {
        name: "test-fail",
        loader: () => {
            const fakeModule = 'YouShallNotPass';
            return import(fakeModule);
        },
        title: "I will fail",
        description: "Test purpose component",
        icon: undefined,
        color: 'black'
    },
    {
        name: "test-timeout",
        loader: () => {
            return new Promise((resolve) => {});
        },
        title: "I will timeout",
        description: "Test purpose component",
        icon: undefined,
        color: 'black'
    }
];

const style = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden'
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: 'home'
        }
    }

    changeActivity = (newActivity) => {
        this.setState({activity: newActivity});
    };

    render() {
        return (
            <div style={style}>
                <Helmet>
                    <title>Tool Bench</title>
                    <link rel="icon" type="image/png" href={logo}/>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                </Helmet>

                <CssBaseline/>

                <Layout
                    activityList={tools}
                    activity={this.state.activity}
                    changeActivity={this.changeActivity}/>
            </div>
        );
    }
}