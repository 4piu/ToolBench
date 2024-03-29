import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {fade, withStyles} from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {TextField} from "@material-ui/core";
import ApplicationContext from "./ApplicationContext";

const styles = theme => ({
    MenuButton: {
        marginRight: theme.spacing(2),
    },
    Title: {
        flexGrow: 1,
        display: "none",
        [theme.breakpoints.up("xs")]: {
            display: "block",
        },
    },
    MenuItem: {
        color: "inherit",
        display: "flex"
    },
    SearchDesktop: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
            marginLeft: theme.spacing(1),
            width: "auto"
        },
    },
    SearchDesktopIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    SearchDesktopInputRoot: {
        color: "inherit",
    },
    SearchDesktopInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 120,
            "&:focus": {
                width: 200,
            }
        }
    },
    SearchMobileIcon: {
        color: "inherit",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    SearchMobileInput: {
        flexGrow: 1,
        "& > *": {
            color: "inherit"
        }
    },
    SearchMobileInputRoot: {
        color: "inherit"
    },
});

class MyAppBar extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        showSearchBar: PropTypes.bool,
        menuItems: PropTypes.node,
        position: PropTypes.string
    };

    static defaultProps = {
        showSearchBar: false,
        menuItems: [],
        position: "fixed"
    };

    constructor(props) {
        super(props);
        this.state = {
            searchExpanded: false
        };
    }

    expandSearch = () => {
        this.setState({
            searchExpanded: true
        });
    };

    handleBackClick = () => {
        if (this.state.searchExpanded) {
            this.setState({
                searchExpanded: false
            });
        } else {
            this.context.onActivityChange("home");
        }
    };

    render() {
        const {classes} = this.props;
        const context = this.context;
        return (
            <>
                <AppBar position={this.props.position}>
                    <Toolbar>
                        {// Back arrow button
                            (context.activity !== "home" || this.state.searchExpanded) &&
                            <IconButton
                                edge="start"
                                className={classes.MenuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleBackClick}
                            >
                                <ArrowBackIcon/>
                            </IconButton>}
                        {// Title
                            !this.state.searchExpanded &&
                            <Typography className={classes.Title} variant="h6" noWrap>
                                {this.props.title || context.activity}
                            </Typography>
                        }
                        {// Search bar sm-
                            this.props.showSearchBar && this.state.searchExpanded &&
                            <TextField
                                className={classes.SearchMobileInput}
                                autoComplete={"off"}
                                onChange={context.onSearchInput}
                                color={"secondary"}
                                autoFocus={true}/>
                        }
                        {// Search button sm-
                            this.props.showSearchBar && !this.state.searchExpanded &&
                            <IconButton
                                className={classes.SearchMobileIcon}
                                onClick={this.expandSearch}>
                                <SearchIcon/>
                            </IconButton>
                        }
                        {// Search bar sm+
                            this.props.showSearchBar && !this.state.searchExpanded &&
                            <div className={classes.SearchDesktop}>
                                <div className={classes.SearchDesktopIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.SearchDesktopInputRoot,
                                        input: classes.SearchDesktopInput,
                                    }}
                                    inputProps={{"aria-label": "search"}}
                                    onChange={context.onSearchInput}/>
                            </div>
                        }
                        {// Custom menu items
                            <div className={classes.MenuItem}>
                                {this.props.menuItems}
                            </div>

                        }
                    </Toolbar>
                </AppBar>
                {// Margin
                    this.props.position === "fixed" && <Toolbar/>}
            </>
        );
    }
}

MyAppBar.contextType = ApplicationContext;

export default withStyles(styles)(MyAppBar);