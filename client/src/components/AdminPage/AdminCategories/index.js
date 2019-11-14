import React from 'react';

import { Hidden } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';

import ManageTopCategories from './TopCats';


export default withWidth()(props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Hidden >
                    <h3>CATEGORIES</h3>
                </Hidden>
            </div>
            <Grid container className={classes.paper}>
                <ManageTopCategories/>
            </Grid>
        </div>
    )
});
