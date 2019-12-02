import React, {useState, useEffect} from 'react';

import { Typography, Box, Grid, TextField, FormLabel, FormControlLabel, FormControl, FormGroup, Radio, RadioGroup, Checkbox, Button } from '@material-ui/core';

import useStyles from './useStyles';

import UploadFile from '../../../../common/inputs/UploadFile';


export default props => {

    const{categoryName, topCatName, item, topCatsBase, gendersBase, displayAdditional, onSubmitHandler} = props;

    let [formData, setFormData] = useState({});

    useEffect(()=> {
        if(categoryName) {
            let newInTopCat = categoryName && categoryName.includes('newCategory') ?
                categoryName.slice(categoryName.indexOf('-')+1) :
                undefined;
            item ?
                setFormData({
                    _id: item._id || '',
                    itemNo: item.itemNo || 0,
                    name: item.name || '',
                    topCategory: item.topCategory,
                    genders: [...item.genders],
                    img: item.img || '',
                    date: item.date || Date.now()
                }) :
                setFormData({topCategory: newInTopCat})

        } else if (topCatName && item) {
                setFormData({
                    _id: item._id || '',
                    name: item.name || '',
                    img: item.img || '',
                    date: item.date || Date.now()
                });
        }
    },[categoryName, topCatName, item]);


    const onChange = event => {
        if (event.target.name === 'genders') {
            event.target.checked ?
                setFormData({
                    ...formData,
                    genders: formData.genders ? [...formData.genders.filter(el => el.gender !== event.target.value), {gender: event.target.value}] : [{gender: event.target.value}]
                }) :
                setFormData({
                    ...formData,
                    genders: [...formData.genders.filter(el => el.gender !== event.target.value)]
                })
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    };

    const onSubmit = event => {
        event.preventDefault();
        onSubmitHandler(formData);
    };

    const classes = useStyles();

    return (
        <Typography component="div" variant="body1" className={classes.wrapper}>
            <form autoComplete="off">
                <Grid container className={classes.paper}>
                    <Grid item xs={4} className={classes[displayAdditional]}>
                        <TextField
                            id="outlined-required"
                            label="itemNo"
                            name='itemNo'
                            placeholder={`${Math.ceil(Math.random()*1000)}-${Math.ceil(Math.random()*100)}-${Math.ceil(Math.random()*10)}`}
                            value={formData.itemNo ? formData.itemNo : ''}
                            onChange={onChange}
                            onFocus={onChange}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item className={classes.justify}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Category"
                            name='name'
                            autoFocus
                            onChange={onChange}
                            defaultValue={topCatName === 'newTopCategory' || (categoryName && categoryName.includes('newCategory')) ? '' : topCatName || categoryName}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <div className={classes[displayAdditional]}>
                    <Grid container className={classes.paper}>
                        <Grid item xs={6}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">In Top Category:</FormLabel>
                                <RadioGroup aria-label="topCats" name="topCategory">
                                {topCatsBase.map(topCat =>
                                    <FormControlLabel
                                        key={topCat._id}
                                        id={topCat._id}
                                        value={topCat._id}
                                        control={<Radio />}
                                        label={topCat.name}
                                        checked={formData.topCategory && formData.topCategory === topCat._id ? true : false}
                                        onChange={onChange}
                                    />
                                )}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Select Genders</FormLabel>
                                <FormGroup>
                                    {gendersBase.map(gender =>
                                        <FormControlLabel
                                            key={gender._id}
                                            control={
                                                <Checkbox
                                                    name='genders'
                                                    id={gender._id}
                                                    value={gender._id}
                                                    checked={formData.genders && formData.genders.some(el => el.gender === gender._id) ? true : false}
                                                    onChange={onChange}
                                                />}
                                            label={gender.name}
                                        />
                                    )}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

                <Grid container className={classes.paper}>
                    <Grid item xs={12}>
                        <UploadFile/>
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                        fullWidth={true}
                        variant="outlined"
                        className={classes.btn}
                        onClick={onSubmit}
                    > {`SAVE`}</Button>
                    </Grid>
                </Grid>
            </form>
        </Typography>
    )
};
