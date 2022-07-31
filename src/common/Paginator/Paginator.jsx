import React, {useState} from 'react'
import styles from "./Paginator.module.css";



let Paginator = (props) =>
    {

        let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
        let pages = []
        for (let i=1; i <= pagesCount; i++){
            pages.push(i)
        }
        let portionCount = Math.ceil(pagesCount/props.portionSize)
        let [portionNumber, setPortionNumber] = useState(1)
        let leftPortionPageNumber = (portionNumber - 1) * props.portionSize
        let rightPortionPageNumber = portionNumber * props.portionSize
        return (
            <div className={styles.paginator}>
            {/*<div className={styles.paginator}>*/}
            {/*    {portionNumber >1 &&*/}
            {/*    <button onClick={()=>{setPortionNumber(portionNumber-1)}}>*/}
            {/*           back*/}
            {/*        </button>*/}
            {/*    }*/}
            {/*    <nav aria-label="Page navigation example">*/}
            {/*        <ul className="pagination">*/}
            {/*     {pages*/}
            {/*         .filter(p=> p >= leftPortionPageNumber && p<=rightPortionPageNumber)*/}
            {/*         .map((p) => {*/}
            {/*             return(*/}
            {/*                 <li className={`page-item ${props.currentPage === p && styles.selectedPage }`} onClick={ (e)=> {props.onPageChanged(p) } }>{p}</li>*/}
            {/*             )*/}
            {/*         })}*/}


            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*    {portionCount > portionNumber &&*/}
            {/*        <button onClick={() => {*/}
            {/*            setPortionNumber(portionNumber + 1)*/}
            {/*        }}>*/}
            {/*            Next*/}
            {/*        </button>*/}
            {/*    }*/}
            {/*</div>*/}


        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">{portionNumber >1 &&
                    <button className="page-link" onClick={()=>{setPortionNumber(portionNumber-1)}}>
                        back
                    </button>
                }</li>

                    {pages
                        .filter(p=> p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                        .map((p) => {
                            return(
                                <li className={`page-item page-item ${props.currentPage === p && styles.selectedPage }`} onClick={ (e)=> {props.onPageChanged(p) } }><button className={"page-link"}>{p}</button></li>
                            )
                        })}


                <li className="page-item">{portionCount > portionNumber &&
                    <button className="page-link" onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>
                        Next
                    </button>
                }</li>
            </ul>
        </nav>
            </div>
        )
    }

export default Paginator