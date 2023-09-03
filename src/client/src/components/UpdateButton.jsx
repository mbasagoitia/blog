import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UpdateButton ({ post }) {
    return (
        <Link to={`/update/${post._id}`} className="btn btn-secondary mb-2 mx-2">Update</Link>
    )
}

export default UpdateButton;