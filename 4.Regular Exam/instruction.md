<!-- 1. Init project and structure
   -  npm init and folders
2. Setup developer environment
   -  install nodemon
   -  start command -->
<!-- 3. Install express, handlebars
   -  configure express
   -  configure database (mongoose)
   -  configure handlebars (express-handlebars) -->
<!-- 4. Convert all pages from html to hbs
   -  group them by meaning -->
<!-- 5. Setup router and add Controllers folder
   -  start with homeController -->
<!-- 6. Prepare user functionality
   -  add controller to routers
   -  render login and register pages
   -  remove actions from forms and add POST methods
   -  add names in forms (hbs files) -->
<!-- 7. Add User model
   -  basic validation in Schema (string etc)
    -  create register method
      -  throw error for password mismatch
      -  validate existing email
      -  hash password
         -  install bcrypt
         -  create userSchema.pre('save') method for password
   -  create login method
      -  find user by email
      -  validate password using hash -->
<!-- 8. Generate jsonwebtoken
   -  install jsonwebtoken
   -  promisify jsonwebtoken
   -  generate secret (https://www.uuidgenerator.net/)
      -  add it to constants -->
<!-- 9. Return token in cookie
   -  install cookie-parser
   -  configure cookie-parser
   -  set cookie with token -->
<!-- 10.   Implement logout -->
<!-- 11.   Authentication Middleware
      -  implement auth method which validates the token and adds global variables for token
      -  implement isAuth method which checks if there is req.user saved and if not redirect to login page -->
<!-- 12.   Dynamic Navigation
      -  conditional options in nav
      -  add data to res.locals for hbs templates -->
<!-- 13.   Error handling
      -  add 404 page
      -  redirect missing route to 404
      -  add global error handler (option)
      -  add error message util
      - Show error notification -->

<!-- SECOND PART -->

<!-- 15. Provide endponts to navigation in both states (app.get to all links) -->
<!-- 16. Add Offer model to mongoose -->

<!-- 17. Add Offer

-  DON'T FORGET TO ADD OWNER
-  on success redirect to all posts page -->
<!-- 
18. Implement All Offers Page
    - show each creature with image, name, etc.
    - If no offers 'There are no offers yet' -->
<!-- 19. Add details page (for Offers)
    - if the user is the owner of the post shoud have "Edit" and "Delete" buttons
    - If the user hasn't logged it -> no buttons
    - If the user is not the owner -> buy button -->
<!-- 20. Delete Offer
    - on success redirect to all posts page -->
<!-- 21. Edit Offer
    - on success redirect to all posts page -->
<!-- 22. Buy button
    - redirect to the details page for the crrent creature
    - if user already has voted -> "Thanks for Buying" -->
23. Routes Guards - check
<!-- 24. Validations
    - Login
    - Register
    - Animals -->
<!-- 25. Bonus

-  Search -> Show my posts
-  If no posts - show message
-  edit vote count -->
