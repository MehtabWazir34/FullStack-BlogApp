/user


/blog
    /create
        - post
        - 200
        - blog:{

        }
        - /blog/create
        - {title:string, description: stirng, image:file}

/blog
    /update/:id
        - POST
        - protected route
        - single("blogImage")
        - /blog/update/:id
        - {
            link: imageLink
            }