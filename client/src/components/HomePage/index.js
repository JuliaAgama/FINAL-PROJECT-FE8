import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../store/actions/products";
import ProductGallery from "../common/ProductsGallery";
import CategoriesHome from "./CategoriesHome";

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(getAllProducts())},[]);
    let products = useSelector(state => state.products.products);
    products.splice(4);
    return <div> <CategoriesHome /> <ProductGallery products={products} homePage={true}/></div>
};
