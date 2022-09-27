import React, {useState} from 'react'
import styles from "./Paginator.module.css";


type PropsType={
    totalUsersCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber:number)=> void
}

let Paginator: React.FC<PropsType> = ({totalUsersCount,
                                          pageSize,
                                          portionSize,
                                          currentPage,
                                          onPageChanged
}) =>
    {

        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages = []
        for (let i=1; i <= pagesCount; i++){
            pages.push(i)
        }
        let portionCount = Math.ceil(pagesCount/portionSize)
        let [portionNumber, setPortionNumber] = useState(1)
        let leftPortionPageNumber = (portionNumber - 1) * portionSize
        let rightPortionPageNumber = portionNumber * portionSize
        return (
            <div className={styles.paginator}>
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
                                <li className={`page-item page-item ${currentPage === p && styles.selectedPage }`} onClick={ (e)=> {onPageChanged(p) } }><button className={"page-link"}>{p}</button></li>
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