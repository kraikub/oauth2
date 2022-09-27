# About our Auth Protocol v1

Kraikub Auth Protocol v1 was not implemented on the OAuth2.0 protocol. Since there are many students' "web applications" that need students' 
data to run their business, Kraikub Auth Protocol v1 was designed to work on the browser only (client-side). Our Auth Protocol uses an HTTPOnly 
cookie to validate incoming users from the browser. With HTTPOnly cookie, our Auth Protocol is Cross Site Scripting (XSS) attack resistance. 
The diagram below shows how Kraikub authenticates users by using their Nontsri account. Kraikub Auth Protocol requires all users to create their
identities on our platform. By creating a user's identity, Kraikub needs to access your personal and educational information held by Kasetsart University. 
The first time you sign in to Kraikub, the privacy policy will show up to inform you how we collect, manage and use your personal and educational data. 
Please read our privacy policy [here](#).

![image](https://user-images.githubusercontent.com/62375505/192435747-e304bcd6-9012-4e0a-978b-036906a6e496.png)

## SDK handles the auth protocol for you

If you are using `@kraikub/sdk` with your projects, the SDK will handle all of these stuffs for you

## Authentication via callback URL 

Kraikub offers callback sign-in for you if you prefer to handle our auth protocol by yourself. By using a callback URL, you need to provide both the 
`Production Callback URL` and `Development Callback URL` on your project information page. The base URL for doing callback sign-in is 
https://app.kraikub.com/signin followed by the query string. You can find the complete callback sign-in URL of each project on the project information page.

## Future Development Goals

We are aiming to implement our auth protocol using OAuth2.0 standards on Kraikub Auth Protocol v2. This goal allows us to support non-browser applications 
in the near future.
