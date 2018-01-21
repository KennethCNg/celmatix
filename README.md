# README

WRITE CODE SO GOOD THAT THEY HAVE NOTHING TO ASK!

Back-end Architecture
1) Decided to leave the weight column blank (NULL) rather than put a 0. The reason being, when searching for 

    SELECT  
        *  
    FROM  
        users  
    WHERE  
        weight = ?  

    will never match NULL. Therefore, it's best to leave the column blank.
 
 2) Used a name validation using REGEX instead of implementing a private method

 3) After doing some research, I considered the following regex for email validations should be "/.+@.+\..+/i". "http://www.aidanf.net/posts/validating-emails-in-rails"

 
Front-end Architecture

1) I believe I needed to validate each page before continuing, thus hitting my back-end. The issue was what type of HTTP request this would be considered. It's not really a GET request, because I need to send data to be verified. However, it's not a POST request either because I'm not writing to the database. In the end, I opted to use a POST request because although, I'm not writing to a database, convention says that GET requests should never have a payload. Therefore, it was the lesser of two evils.

