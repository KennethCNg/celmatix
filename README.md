# README

Back-end Architecture
Decided to leave the weight column blank (NULL) rather than put a 0. The reason being, when searching for 

SELECT  *
FROM    users
WHERE   weight = ?

will never match NULL. Therefore, it's best to leave the column blank.
