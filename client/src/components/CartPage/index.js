import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import { Container, Typography, Box, Hidden } from '@material-ui/core';

import useStyles from './useStyles';

export default () => {

    const dispatch = useDispatch();

    const classes = useStyles();

    return (
        <Container className={classes.root} maxWidth="lg">
            <Hidden smDown>
                <Typography className={classes.header} variant="h2">shopping bag</Typography>
            </Hidden>
            <Hidden mdUp>
                <Typography className={classes.headerXS} variant="h2">shopping bag</Typography>
        </Hidden>
        </Container>
    )
};
