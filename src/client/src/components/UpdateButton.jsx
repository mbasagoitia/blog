import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UpdateButton ({ post }) {
    return (
        <Link to={`/update/${post._id}`} className="btn btn-primary">Update</Link>
    )
}

export default UpdateButton;