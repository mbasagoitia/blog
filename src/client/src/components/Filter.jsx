import { useState } from "react";
import Form from 'react-bootstrap/Form';

function Filter ({ setDisplayedPosts, filter }) {

    const [searchTerms, setSearchTerms] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerms) {
            setDisplayedPosts(filter(searchTerms));
        }
        return false;
    }

    return (
        <Form onSubmit={(e) => {handleSearch(e)}}>
            <Form.Group controlId="exampleForm.ControlInput1">
            <div className="input-group m-auto" id="search-wrapper">
                <div className="input-group-prepend">
                    <span className="input-group-text h-100" onClick={handleSearch} id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></span>
                </div>
                <Form.Control type="search" value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)} className="form-control" placeholder="Search by tags..." aria-label="Search"></Form.Control>
            </div>
            </Form.Group>
        </Form>
    )

}

export default Filter;