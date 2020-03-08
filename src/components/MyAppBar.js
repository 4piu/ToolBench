import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {fade, withStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {TextField} from "@material-ui/core";

const styles = theme => ({
    root: {
        // flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
    },
    SearchDesktop: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginLeft: theme.spacing(1),
            width: 'auto'
        },
    },
    SearchDesktopIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SearchDesktopInputRoot: {
        color: 'inherit',
    },
    SearchDesktopInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            }
        }
    },
    SearchMobileIcon: {
        color: 'inherit',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    SearchMobileInput: {
        flexGrow: 1,
        '& > *': {
            color: 'inherit'
        }
    },
    SearchMobileInputRoot: {
        color: 'inherit'
    },
});

class MyAppBar extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        showBackButton: PropTypes.bool,
        showSearchBar: PropTypes.bool,
        changeActivity: PropTypes.func.isRequired,
        onSearchInputChange: PropTypes.func
    };

    static defaultProps = {
        showBackButton: false,
        showSearchBar: false
    };

    constructor(props) {
        super(props);
        this.state = {
            searchExpanded: false
        }
    }

    expandSearch = () => {
        this.setState({
            searchExpanded: true
        })
    };

    handleBackClick = () => {
        if (this.state.searchExpanded) {
            this.setState({
                searchExpanded: false
            })
        } else {
            this.props.changeActivity('home');
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {// Back arrow button
                            (this.props.showBackButton || this.state.searchExpanded) &&
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleBackClick}
                            >
                                <ArrowBackIcon/>
                            </IconButton>}
                        {// Title
                            !this.state.searchExpanded &&
                            <Typography className={classes.title} variant="h6" noWrap>
                                {this.props.title}
                            </Typography>
                        }
                        {// Search bar sm-
                            this.props.showSearchBar && this.state.searchExpanded &&
                            <TextField
                                className={classes.SearchMobileInput}
                                autoComplete={"off"}
                                onChange={this.props.onSearchInputChange}
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
                                    inputProps={{'aria-label': 'search'}}
                                    onChange={this.props.onSearchInputChange}/>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(MyAppBar);