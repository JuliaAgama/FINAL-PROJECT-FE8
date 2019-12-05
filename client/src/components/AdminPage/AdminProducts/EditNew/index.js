import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as topCatsActions from '../../../../store/actions/topCats';
import * as categoriesActions from '../../../../store/actions/categories';
import * as gendersActions from '../../../../store/actions/genders';
import * as sizeTypesActions from '../../../../store/actions/sizeTypes';
import * as productsActions from '../../../../store/actions/products';
import ProductsApi from '../../../../services/Products';

import { Typography, Box } from '@material-ui/core';

import useStyles from "./useStyles";

import ProductForm from './ProductForm';
import ErrorModal from '../../../common/messages/ErrorModal';
import WarningModal from '../../../common/messages/WarningModal';
import Notification from '../../../common/messages/Notification';
import Spinner from '../../../common/Spinner';


export default props => {

    const history = useHistory();

    const itemNo = props.match.params.itemNo;

    // get data (that are in need for the form) from data base:
    const dispatch = useDispatch();

    const getTopCatsList = () => {
        topCatsActions.getAllTopCats()(dispatch);
    };
    const getCategoriesList = () => {
        categoriesActions.getAllCategories()(dispatch);
    };
    const getGendersList = () => {
        gendersActions.getAllGenders()(dispatch);
    };
    const getSizeTypesList = () => {
        sizeTypesActions.getAllSizeTypes()(dispatch);
    };
    const getProductByItemNo = () => {
    productsActions.getProductItemByItemNo(itemNo)(dispatch)
    };

    useEffect(() => {
        getProductByItemNo();
        getTopCatsList();
        getCategoriesList();
        getGendersList();
        getSizeTypesList();
        return () => {
            getProductByItemNo();
            getTopCatsList();
            getCategoriesList();
            getGendersList();
            getSizeTypesList();
        }
    }, [dispatch]);

    const product = useSelector(state => state.productItem.productItem);
    const topCatsBase = (useSelector(state => state.topCats.topCats));
    const categoriesBase = useSelector(state => state.categories.categories);
    const gendersBase = useSelector(state => state.genders.genders);
    const sizeTypesBase = useSelector(state => state.sizeTypes.sizeTypes);

    const productLoaded = useSelector(state => state.productItem.loaded)
    const topCatsLoaded = useSelector(state => state.topCats.loaded);
    const categoriesLoaded = useSelector(state => state.categories.loaded);
    const gendersLoaded = useSelector(state => state.genders.loaded);
    const sizeTypesLoaded = useSelector(state => state.sizeTypes.loaded);

    //server errors catching:
    const productError = useSelector(state => state.productItem.error);
    const topCatsError = useSelector(state => state.topCats.error);
    const categoriesError = useSelector(state => state.categories.error);
    const gendersError = useSelector(state => state.genders.error);
    const sizeTypesError = useSelector(state => state.sizeTypes.error);

    const [errorIsOpen, setErrorIsOpen] = useState(false);

    useEffect(() => {
        if(productError || topCatsError || categoriesError || gendersError || sizeTypesError) {setErrorIsOpen(true)}
    },[productError, topCatsError, categoriesError, productError, gendersError, sizeTypesError]
    );

    const errorModalText = {
        title: `NO RESPONSE FROM SERVER`,
        description: `Request to server failed`,
        button: 'TRY AGAIN'
    };
    const closeErrorModal = () => setErrorIsOpen(false);


    const ref = useRef(null);
    const timeout = 2000;

    // handle warning:
    const [warningIsOpen, setWarningIsOpen] = useState(false);
    const [warningText, setWarningText] = useState({title: '', description: ''});
    const closeWarning =() => setWarningIsOpen(false);

    const checkEmpty = field => {
        if(!field || field === ''|| field.length === 0) {
            setWarningIsOpen(true);
            setWarningText({title: 'Item cannot be saved', description: `Set  all fields`});
            return true;
        }
        return false;
    };

    const checkDoublesInDataBase = (formData) => {
        if (product && formData) {
            (new ProductsApi())
            .getProductsByMatch({itemNo: formData.itemNo})
            .then(res => res.filter(el => el._id !== product._id))
            .then(res => {
                if (res[0]) {
                    setWarningIsOpen(true);
                    setWarningText({title: 'Cannot save!', description: `Product with itemNo "${formData.itemNo}" already exists!`});
                    return true;
                }
                return false;
            })
        }
    };

    const onSubmitHandler = async formData => {

        if( checkEmpty(formData.itemNo) || checkEmpty(formData.name) || checkEmpty(formData.topCat) || checkEmpty(formData.category) || checkEmpty(formData.gender) || checkEmpty(formData.sizeType)) {
            return false;
        };

        try {
            let double = await checkDoublesInDataBase(formData);
            if (double) { return false};

            itemNo.includes('newProduct') ?
                productsActions.addProduct(formData)(dispatch) :
                productsActions.updateProduct(formData)(dispatch);
                ref.current(`Product ${formData.name.toUpperCase()} has been saved!`);

            setTimeout(() => {
                return history.push("/admin/products/edit/"+formData.itemNo);
            }, timeout)

        } catch (error) {
            setErrorIsOpen(true);
        }
    };

    const classes = useStyles();

    return (
        <Typography component="div" variant="body1">
        {productLoaded ?
            <Box color="secondary.main" p={3} borderBottom={1} textAlign="center" fontSize="h6.fontSize">Edit {product.name.toUpperCase()} </Box> : <Spinner/>
        }
            <Box p={2}>
                {productLoaded && topCatsLoaded && categoriesLoaded && gendersLoaded && sizeTypesLoaded ?
                    <ProductForm
                        itemNo={itemNo}
                        item={product}
                        topCatsBase={topCatsBase}
                        categoriesBase={categoriesBase}
                        gendersBase={gendersBase}
                        sizeTypesBase={sizeTypesBase}
                        onSubmitHandler={onSubmitHandler}
                    /> : <Spinner/>
                }
                <Link to={`/admin/products`} className={classes.link}> {`<<   to Products List`} </Link>
            </Box>
            <WarningModal modalIsOpen={warningIsOpen} modalText={warningText} closeFunction={closeWarning}/>
            <Notification timeout={timeout} children={add => (ref.current = add)} />
            <ErrorModal
                modalIsOpen={errorIsOpen}
                modalText={errorModalText}
                doFunction={() => history.push("/admin/products/edit/itemNo")}
                closeFunction={closeErrorModal}
            />
        </Typography>
    )
};
