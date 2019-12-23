import React, {useEffect, useState} from 'react';
import {
    withWidth,
    Typography,
    Box,
    List,
    Divider,
    ListItem,
    Grid,
    IconButton,
    Collapse,
    Button
} from '@material-ui/core';
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProductsGallery from './ProductsGallery';
import useStyles from './useStyles';
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsGallery} from '../../../store/actions/productsGallery'


export default withWidth()(() => {
    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(() => getAllProductsGallery()(dispatch), [dispatch]);
    const productsGalleries  = useSelector(state => state.productsGallery.productsGalleries);
    const optionsList = productsGalleries.map(item => {return {name: item.customId}});



    const [expanded, setExpanded] = useState({});

    const handleExpandClick = itemName => setExpanded({...expanded, [itemName]: (!expanded[itemName])});
    // const save = () => {
    //     const homePageProductGallery = {
    //         customId: localStorage.getItem('CustomId'),
    //         title: localStorage.getItem('Title'),
    //         checkedProduct: JSON.parse(localStorage.getItem('checkedProduct')),
    //         links: JSON.parse(localStorage.getItem('Links'))
    //     }
    //     dispatch(addProductsGallery(homePageProductGallery));
    // };
    // const download = () => {
    //     dispatch(getProductsGallery(localStorage.getItem('CustomId')));
    //     dispatch(getAllProductsGallery());
    // };
    return (
        <Typography component="div" variant="body1">

            <Box color="secondary.main" p={3} pl={6} pr={6} ml={2} mr={2} borderBottom={1} textAlign="center" fontSize="h6.fontSize">PRODUCTS GALLERY LIST</Box>

            <Box className={classes.paper}>
                <List >
                    <Divider />
                    {optionsList.map((el, ind) => (
                        <Box key={ind}>
                            <ListItem >
                                <Grid container className={classes.container}>
                                    <Grid item> {el.name.toUpperCase()} </Grid>
                                    <Grid item>
                                        <IconButton
                                            className={clsx(classes.expand, {[classes.expandOpen]: expanded[el.name]})}
                                            onClick={() => handleExpandClick(el.name)}
                                            aria-expanded={expanded[el.name]}
                                            color="secondary"
                                            aria-label="expandDown"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Collapse in={expanded[el.name]} timeout="auto" unmountOnExit>
                                <Box className={classes.expanded}>
                                    <ProductsGallery    name={el.name}
                                                        expandedMain={expanded}
                                                        setExpandedMain={setExpanded}
                                                        productsGallery={productsGalleries.find(item => el.name === item.customId)}/>
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                    <Divider/>
                </List>
            </Box>
        </Typography>
    )
});