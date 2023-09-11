import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from "react";

function PaginationControls ({ filteredPosts, setDisplayedPosts }) {

    useEffect(() => {
        setDisplayedPosts(filteredPosts.slice(0,10));
        setActive(1);
    }, [filteredPosts])

    let [active, setActive] = useState(1);

    let allItems = [...filteredPosts];
    let sortedItems = [];
    let paginationNums = [];

        if (filteredPosts.length > 10) {
            while (allItems.length > 0) {
                sortedItems.push(allItems.splice(0, 10));
            }
        
            for (let i = 1; i <= sortedItems.length; i++) {
                paginationNums.push(<Pagination.Item key={i} active={i === active} onClick={() => {
                    setActive(i);
                    setDisplayedPosts(sortedItems[i-1]);
                    // Scroll user to top of page?
                }}>{i}</Pagination.Item>)
            }
        }

    return (
        <>
            <Pagination className="my-4">{paginationNums}</Pagination>
        </>
    );

}

export default PaginationControls;