import React from 'react';
import classes from './PageSearch.module.scss';
import { FiChevronsLeft, FiChevronsRight} from "react-icons/fi";

const pageSearch = (props) => {
    const { total_pages, page } = props;
    const listItems = [];
    for(let i=0; i < total_pages; i++){
        if( i + 1 === page){
            listItems.push(page)
        }else if(i === total_pages -2 && i === page ){
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
                <button key={index} className={classes.PageSearch__item}>.</button>
            )}
        else{
            return(
                <button disabled={item === props.page} key={index} className={classes.PageSearch__item} onClick={() => props.pageChange(+item)}>{item}</button>
            )
        }
    });
    return(
        <div className={classes.PageSearch}>
            <button onClick={() => props.pageChange(1)} disabled={page === 1} className={classes.PageSearch__item}><FiChevronsLeft/></button>
            {renderedLists}
            <button onClick={() => props.pageChange(total_pages)} disabled={page === total_pages} className={classes.PageSearch__item}><FiChevronsRight/></button>
        </div>
    )
};
export default pageSearch;