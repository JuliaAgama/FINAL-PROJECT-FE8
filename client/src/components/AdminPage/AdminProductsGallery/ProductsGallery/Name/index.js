import React, {useEffect, useState} from 'react';
import {Typography, Grid, TextField, Button} from '@material-ui/core';
import useStyles from './useStyles';
import {useDispatch, useSelector} from "react-redux";
import {createProductsGallery} from '../../../../../store/actions/productsGallery'

export default props => {
    const {setExpanded, newProductsGallery} = props;

    const dispatch = useDispatch();
    const newGallery = useSelector(state => state.productsGallery.newProductsGallery);
    const currentGallery = useSelector(state => state.productsGallery.currentProductsGallery);

    let productsGalleryName = '';
    if (newProductsGallery) {
        productsGalleryName = newGallery.name;
    } else {
        productsGalleryName = currentGallery.name;
    }

    const [name, setName] = useState(productsGalleryName);
    const [isEmpty, setIsEmpty] = useState(false);

    const onChange = event => {
        setIsEmpty(false);
        setName(event.target.value)
    };

    const save = () => {
        if (name && name !== "") {
            dispatch(createProductsGallery({field: 'name', value: name}));
            setExpanded({title: false})
        } else {
            setIsEmpty(true);
        }
    };

    const classes = useStyles();

    return (
        <Typography component="div" variant="body1" className={classes.wrapper}>
            <form autoComplete="off">
                <Grid container className={classes.paper}>
                    <Grid className={classes.justify}>
                        <TextField
                            required
                            id="name"
                            label="Name"
                            name='name'
                            autoFocus
                            onChange={onChange}
                            value={name}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            error={isEmpty}
                            helperText={isEmpty ? `Field can't be empty` : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth={true}
                            variant="outlined"
                            className={classes.btn}
                            onClick={save}
                        > {`SAVE`}</Button>
                    </Grid>
                </Grid>
            </form>
        </Typography>
    )
};