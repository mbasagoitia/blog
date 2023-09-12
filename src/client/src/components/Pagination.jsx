import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from "react";

function PaginationControls ({ filteredPosts, setDisplayedPosts }) {

    // filteredPosts refers to posts that have optionally gone through a search filter from the nav or the search bar
    // If filteredPosts is longer than 10 items, we need to sort them into multiple pages for better UI

    // Determines which page button is styled as active

    let [active, setActive] = useState(1);

    useEffect(() => {
        setDisplayedPosts(filteredPosts.slice(0,10));
        setActive(1);
    }, [filteredPosts])

    let allItems = [...filteredPosts];
    let sortedItems = [];
    let paginationNums = [];

        if (filteredPosts.length > 10) {

            // Sort the posts into arrays of 10 items (the last page can have fewer than 10 items)

            while (allItems.length > 0) {
                sortedItems.push(allItems.splice(0, 10));
            }

            // Determines how many pages (equal to sortedItems.length) and page number controls we need to make
        
            for (let i = 1; i <= sortedItems.length; i++) {
                paginationNums.push(<Pagination.Item key={i} active={i === active} onClick={() => {
                    setActive(i);

                    // This is i-1 because the page number needs to be one greater than the actual first 
                    // page of the list (page 1 is item at index 0 of sortedItems)

                    setDisplayedPosts(sortedItems[i-1]);
                    window.scrollTo(0, 0);
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