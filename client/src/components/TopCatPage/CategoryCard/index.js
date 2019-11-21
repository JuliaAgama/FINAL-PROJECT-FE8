import React from 'react';
import {Link} from "react-router-dom";


export default props => {
    const {item} = props;

    return (
        <>
            <div
                className="caterory-gallery-item col-12 col-md-6 col-lg-4 col-xl-2 card-body p-5 border border-secondary text-center"
            >
            <Link to={`/categories/${item.name}`} className ="p-5 text-center d-block">
                <p>{props.item.name}</p>
            </Link>
            </div>
        </>
    )
};