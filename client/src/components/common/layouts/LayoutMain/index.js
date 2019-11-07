import React from 'react';
import SearchBox from '../../SearchBox';
import Header from '../../../Header';
import Footer from '../../../Footer';

const LayoutMain = (props) => {

    return (
        <>
        <Header/>
        <div className="wrapper pt-5">
            <SearchBox/>
            <div className="main-content mt-3">{props.children}</div>
        </div>
        <Footer/>>
        </>
    );
}

export default LayoutMain;
