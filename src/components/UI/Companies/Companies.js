import React from 'react';
import classes from './Companies.module.scss';

const companies = (props) => {
    const companies = props.companies.map(company => {
        if(company.logo_path){
            return (
                <div className={classes.Companies} key={company.id}>
                    <p>{company.name}</p>
                    <div className={classes.Companies__imgWrapper}>
                        <img alt={"Company Logo"} src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}/>
                    </div>
                </div>

            )
        }else{
            return null
        }

    });
    return (
        <div className={classes.CompniesWrapper}>
            {companies}
        </div>
    )
};

export default companies;