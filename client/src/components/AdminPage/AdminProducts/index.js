import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as topCatsActions from '../../../store/actions/topCats';
import * as categoriesActions from '../../../store/actions/categories';
import * as productsActions from '../../../store/actions/products';

import { withWidth, Typography, Box, Grid, Link, Hidden } from '@material-ui/core';

import useStyles from './useStyles';

import Spinner from '../../common/Spinner';
import ErrorModal from '../../common/messages/ErrorModal';
import AddWideButton from '../../common/buttons/AddWide';
import Selector from '../../common/inputs/Selector';
import RadioHorizontal from '../../common/inputs/RadioHorizontal';
import ProductsList from './ProductsList';


export default withWidth()(() => {

    const publishOptions = [
        {name: 'all', _id: 'all'},
        {name: 'yes', _id: 'enabled'},
        {name: 'no', _id: 'disabled'}]

    const dispatch = useDispatch();

    const getTopCatsList = () => {
        topCatsActions.getAllTopCats()(dispatch);
    };
    const getCategoriesList = () => {
        categoriesActions.getAllCategories()(dispatch);
    };
    const getCategoriesByParentId = (id) => {
        categoriesActions.getCategoriesByParentId(id)(dispatch);
    };
    const getProductsList = () => {
        productsActions.getAllProducts()(dispatch);
    };

    useEffect(() => {
        getTopCatsList();
        getCategoriesList();
        getProductsList();
    }, []);

    const topCatsList = useSelector(state => state.topCats.topCats);
    const categoriesList = useSelector(state => state.categories.categories);
    const productsList = useSelector(state => state.products.products);
    const topCatsLoaded = useSelector(state => state.topCats.loaded);
    const categoriesLoaded = useSelector(state => state.categories.loaded);
    const productsLoaded = useSelector(state => state.products.loaded);

    //server errors catching:
    const topCatsError = useSelector(state => state.topCats.error);
    const categoriesError = useSelector(state => state.categories.error);
    const productsError = useSelector(state => state.products.error);

    const [errorIsOpen, setErrorIsOpen] = useState(false);

    useEffect(() => {
        if(topCatsError || categoriesError || productsError) {setErrorIsOpen(true)}
    },[topCatsError, categoriesError, productsError]
    );

    const errorModalText = {
        title: `NO RESPONSE FROM SERVER`,
        description: `Request to server failed`,
        button: 'TRY AGAIN'
    };
    const closeErrorModal = () => setErrorIsOpen(false);

    // filter products on Categories & Enabled selection:
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPublish, setSelectedPublish] = useState(publishOptions[0]._id);
    const [enabled, setEnabled] = useState(null);

    //get categories in store on TopCat selection:
    const onChangeTopCat = (id) => {
        setSelectedCategory('');
        id && id !== '' ? getCategoriesByParentId(id) : getCategoriesList();
    };

    const onChangeCategory = (id) => {
        id && id !== '' ? setSelectedCategory(id) : setSelectedCategory('');
    };

    const onChangePublished = event => {
        setSelectedPublish(event.target.value);
        switch(event.target.name) {
            case 'yes':
                setEnabled(true);
                break;
            case 'no':
                setEnabled(false);
                break;
            default:
                setEnabled(null);
        }
    };

    const publishCondition = id => selectedPublish === id;

    const productsDisplay = () => {

        let productsToDisplay = selectedCategory && selectedCategory !== '' ?
        productsList.filter(item =>
            item.categories.some(category =>
                category.category === selectedCategory)
        ) :
        productsList.filter(item =>
            item.categories.some(category =>
                category.category === categoriesList
                    .map(el => el._id)
                    .find(el => el === category.category)
            )
        );
        if(enabled !== null) {
            return productsToDisplay.filter(item => item.enabled === enabled);
        }

        return productsToDisplay;
    };

    const classes = useStyles();

    return (
        <Typography component="div" variant="body1">
            <Box color="secondary.main" p={3} borderBottom={1} textAlign="center" fontSize="h6.fontSize">PRODUCTS</Box>
            <Link href="/admin/products/edit/newProduct" className={classes.center}>
                <Hidden smDown>
                    <Box p={2} textAlign="center" className={classes.paper}>
                        <AddWideButton text='CREATE NEW PRODUCT' color='secondary'/>
                    </Box>
                </Hidden>
                <Hidden mdUp>
                    <Box p={2} position="fixed" bottom={1} right={1} zIndex="modal">
                        <AddWideButton text='NEW PRODUCT' color='secondary' />
                    </Box>
                </Hidden>
            </Link>
            <Box p={2} textAlign="center" className={classes.paper} >
                <h3>Filter products:</h3>
                    {topCatsLoaded && categoriesLoaded ?
                    (
                    <Grid container className={classes.paper}>
                        <Grid item xs={6} lg={4} className={classes.input}>
                            <Selector
                                selectorName='Top Category'
                                selectorArr={topCatsList}
                                selectedItem=''
                                onChange={onChangeTopCat}
                            />
                        </Grid>
                        <Grid item xs={6} lg={4} className={classes.input}>
                            <Selector
                                selectorName='Category'
                                selectorArr={categoriesList}
                                selectedItem={selectedCategory}
                                onChange={onChangeCategory}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <RadioHorizontal
                                legend="Published:"
                                listArray={publishOptions}
                                checkedCondition={publishCondition}
                                onChange={onChangePublished}
                            />
                        </Grid>
                    </Grid>
                    ) :
                    <Spinner/>
                    }
            </Box>
            <Box p={2} textAlign="center" className={classes.paper} >
                {productsLoaded ? <ProductsList productsList={productsDisplay()} /> : <Spinner/> }
            </Box>
            <ErrorModal
                modalIsOpen={errorIsOpen}
                modalText={errorModalText}
                doFunction={() => document.location.reload()}
                closeFunction={closeErrorModal}
            />
        </Typography>
    )
});
