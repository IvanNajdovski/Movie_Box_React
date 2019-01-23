import React from 'react';
import navPic from '../../assets/Nav.jpg';

const footer = (props) => {
    return(
        <div style={{backgroundPosition: "bottom", backgroundImage: `linear-gradient(to top, rgba(0,0,0, 1) 0%, rgba(0,0,0, .9) 50%, rgba(0,0,0, 1)100%), url("${navPic}")`, color: "#fff", display: "flex", justifyContent: "center", height: "100px"}}>
            Logo
        </div>
    )
};

export default footer;