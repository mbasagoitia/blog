import Pagination from 'react-bootstrap/Pagination';
import { useState } from "react";

function PaginationControls ({ displayedPosts, setPagination }) {

    let [active, setActive] = useState(1);

    let allItems = [...displayedPosts];
    let sortedItems = [];
    let paginationNums = [];

        if (displayedPosts.length > 10) {
            while (allItems.length > 0) {
                sortedItems.push(allItems.splice(0, 10));
            }
        
            for (let i = 1; i < sortedItems.length; i++) {
                paginationNums.push(<Pagination.Item key={i} active={i === active} onClick={() => {
                    setActive(i);
                    setPagination(sortedItems[i]);
                    // Scroll user to top of page?
                }}>{i}</Pagination.Item>)
            }
        }

    return (
        <div>
            <Pagination>{paginationNums}</Pagination>
        </div>
    );

}

export default PaginationControls;