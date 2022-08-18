# Introduction to Kraikub

### What is Kraikub?
Kraikub is a software development platform that provides user authentication for Kasetsart University students. It helps KU developers to create an application that needs users' identities from Kasetsart University without creating their authentication system/protocol.
Kraikub allows users to control their personal information and activities that will be shared between registered applications on Kraikub.

### How Kraikub works?
Kraikub acts like a middleman between app developers and Kasetsart University API. Kraikub takes action when your application (as a developer) needs to authenticate your users. Even more, since your application has authenticated users, you can request some educational 
information like their name, education, grades, or contact info (only users' permitted data).

### About your data protections
First, let's talk about the moment that you sign in to our authentication system using KU Account (Nontsri Account). Your username (b6xxxxxxxxx) and your password will be sent to the Kraikub API gateway. Once they reach our API gateway, they both will be forwarded to myapi.ku.th
which is an official API from Kasetsart University to authenticate who you are. Once it is authorized by myapi.ku.th, the access token from myapi.ku.th will be sent back to Kraikub. We must inform you that ***your KU username and password WON'T BE STORED on our databases.***
We know who you are through the access token which does not contain any part of your credentials.
