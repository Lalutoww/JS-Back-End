1. Init project and structure
    - npm init and folders
2. Setup developer environment
    - install nodemon
    - start command
3. Install express, handlebars
    - configure express
    - configure database (mongoose)
    - configure handlebars (express-handlebars)
4. Convert all pages from html to hbs
    - group them by meaning
5. Setup router and add Controllers folder
    - start with homeController
6. Prepare user functionality
    - add controller to router
    - render login and register pages
    - remove actions from forms and add POST methods
    - add names in forms (hbs files)
7. Add User model
    - basic validation in Schema (string etc)
    - create register method
        - throw error for password mismatch
        - validate existing email
        - hash password
            - install bcrypt
            - create userSchema.pre('save') method for password
    - create login method
        - find user by email
        - validate password using hash
8. Generate jsonwebtoken
    - install jsonwebtoken
    - promisify jsonwebtoken
    - generate secret (https://www.uuidgenerator.net/)
        - add it to constants
9. Return token in cookie
    - install cookie-parser
    - configure cookie-parser
    - set cookie with token
10. Implement logout
11. Authentication Middleware
    - implement auth method which validates the token and adds global variables for token
    - implement isAuth method which checks if there is req.user saved and if not redirect to login page
12. Dynamic Navigation
    - conditional options in nav
    - add data to res.locals for hbs templates
13. Error handling
    - add 404 page
    - redirect missing route to 404
    - add global error handler (option)
    - add error message util
14. Show error notification
