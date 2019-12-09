import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import topCats from './topCats';
import topCatItem from './topCatItem';
import categories from './categories';
import customers from './customer';
import header from './header';
import modal from './modal';
// import reducer2 from './reducer2';
import categoryItem from './categoryItem';
import genders from './genders';
import genderItem from './genderItem';
import colors from './colors';
import colorItem from './colorItem';
import sizeTypes from './sizeTypes';
import sizeTypeItem from './sizeTypeItem';
import sizes from './sizes';
import sizeItem from './sizeItem';
import products from './products';
import productItem from './productItem';
import archives from './archives';
import archiveItem from './archiveItem';

export default combineReducers({
    topCats,
    categories,
    customers,
    header,
    modal,
    topCatItem,
    categoryItem,
    genders,
    genderItem,
    colors,
    colorItem,
    sizeTypes,
    sizeTypeItem,
    sizes,
    sizeItem,
    products,
    productItem,
    archives,
    archiveItem,
    form: reduxFormReducer
});
