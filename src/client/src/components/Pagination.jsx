import Pagination from 'react-bootstrap/Pagination';
import { useState } from "react";

function PaginationControls ({ displayedPosts, setDisplayedPosts }) {

    // A change in the active state will determine which page is rendered (setDisplayedPosts(sortedItems[active])
    let [active, setActive] = useState(1);

    let allItems = [...displayedPosts];
    // The number of pages corresponds to the length of the sortedItems array
    // Each pagination item needs an event listener that will trigger the change in the active page
    let sortedItems = [];



//     <Pagination.Item key={i} active={i === active}>
    // this needs to be a number
//     {i}
// </Pagination.Item>


    return (
        <div>
            <Pagination>{sortedItems}</Pagination>
        </div>
    );

}

export default PaginationControls;