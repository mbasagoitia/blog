# Full Stack Blog Application
## Built with React, Express, and MongoDB/Mongoose

## Overview
This is a full stack personal blog application with RESTful API architecture and CRUD functionality that I built for my portfolio. Please note that the purpose of this project is to show my coding abilities, not my writing abilities! I intend to use this blog for web development-related personal writing in the future, but it currently does not contain any "real" posts.

## Features
The application includes a list of all blog posts that the admin(s) has/have created, with the ability to filter posts by tag name, either by using the search filter or by pre-defined navigation links. Users and unregistered viewers can further explore each blog post and read the full content, and users can leave comments on each post and delete their own comments. Admins have the ability to create new posts, update existing posts, and delete posts and comments. When creating posts, admins have access to the TinyMCE rich text editor, which is a user-friendly editor that allows the addition of images, code snippets, and formatting options without the need for writing any extra HTML. For better user experience, I added a pagination function that only allows 10 posts to be displayed at a time. The application was styled using React Bootstrap and custom CSS.

## Security
This project includes security features such as user/admin account registration, user authentication with JSON Web Token on both the back end and the front end, logic for handling token expiration, sanitization of all HTML inputs, server-side validation, auth middleware, and required Captcha on registration.
