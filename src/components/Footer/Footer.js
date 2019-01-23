import React from 'react';
import navPic from '../../assets/Nav.jpg';
import classes from './Footer.module.scss';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const footer = (props) => {
    return(
        <div className={classes.Footer}
             style={{backgroundImage: `linear-gradient(to top, rgba(0,0,0, 1) 0%, rgba(0,0,0, .9) 50%, rgba(0,0,0, 1)100%), url("${navPic}")`}}
        >
           <div className={classes.Footer__contact}>
               <h3><span>Developed by: </span>Ivan Najdovski</h3>
               <p>ivannajdovski1987@gmail.com</p>
           </div>
            <div className={classes.Footer__links}>
                <a href={"https://www.facebook.com/ivan.najdovski.7"}><FaFacebook className={classes.Links}/></a>
                <a href={"https://github.com/IvanNajdovski"}><FaGithub className={classes.Links}/></a>
                <a href={"https://www.linkedin.com/in/ivan-najdovski-4985a3167/"}><FaLinkedin className={classes.Links}/></a>
                <a href={"https://www.instagram.com/ivannajdovski"}><FaInstagram className={classes.Links}/></a>
                <a href={"http://ivan.najdovski.me/"}>Portfolio: Ivan.Najdovski.me</a>
            </div>
        </div>
    )
};

export default footer;