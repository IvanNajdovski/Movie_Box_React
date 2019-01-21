import React from 'react';
import classes from './PageSearch.module.scss'

const pageSearch = (props) => {
    const { total_pages, page } = props
    console.log("[PROPS ARE]",props)
    const listItems = [];
    for(let i=0; i < total_pages; i++){
        if( i + 1 === page){
            listItems.push(page)
        }else if(i === total_pages -2 && i === page ){
            console.log(i+1)
            listItems.push(i+1)
        }else if(i+1 === total_pages){
            listItems.push(total_pages)
        }else if(page  < i + 3 && page  > i - 1){
            listItems.push(i + 1)
        }else if(page  < i + 5 && page  > i - 3){
            listItems.push(".")
        }

    }
    const renderedLists = listItems.map((item,index) =>{
        if(item === "."){
            return(
                <li key={index} className={classes.PageSearch__item}>.</li>
            )}
        else{
            return(
                <li key={index} className={classes.PageSearch__item} onClick={() => props.pageChange(+item)}>{item}</li>
            )
        }
    })
    console.log(listItems)
    return(
        <ul className={classes.PageSearch}>
            {renderedLists}
        </ul>
    )
}
export default pageSearch;