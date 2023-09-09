import PostCard from "./Card";

function PostsList ({ displayedPosts, user }) {
return (
    <ul className="list p-0 mt-2">
        {displayedPosts.length === 0 ? <div className="text-muted">No posts found. Please update your search criteria and make sure to separate multiple search terms with a comma.</div> : null}   
        {displayedPosts.map((post) => {
            return <li key={post._id}>
                    <PostCard post={post} user={user} />
                    </li>
            })}
    </ul>
)
}

export default PostsList;