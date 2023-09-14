function filter (blogPosts, searchTerms) {

    // Accounts for extra spaces or lack of spaces by user

    let searchTermsArr = searchTerms.split(",").map((term) => term.trim());

    // Posts that match all of the user's search terms

    let matchesAll = blogPosts.filter((blogPost) => {
        return searchTermsArr.every((term) => blogPost.tags.includes(term));
    })

    // Posts that match some of the user's search terms

    let matchesSome = blogPosts.filter((blogPost) => {
        return searchTermsArr.some((term) => blogPost.tags.includes(term));
    })

    // Return all relevant results (those that match all and those that match some, if both exist)

    if (matchesAll.length > 0 && matchesSome.length > 0) {
        return Array.from(new Set([...matchesAll, ...matchesSome]));
    }

    // If none match "some", only return those that match all
     
    if (matchesAll.length > 0) {
        return matchesAll;
    }

    // If none match "all", return those that match some

    if (matchesSome.length > 0) {
        return matchesSome;
    }

    // If no posts match the user's search terms, return nothing
    
    return [];
}

export default filter;