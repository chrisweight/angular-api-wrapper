# angular-api-wrapper
A simple API wrapper service for NG 1.x, providing a more consistent interface, 
intelligent cache clearance for complex GET requests and other edge-case features.

##### Reasoning:
Having developed _n^many_ Angular-based sites, services and components, 
I got tired of having to deal with a few subtle boilerplate issues interacting
with REST API's in most common scenarios...
 
1. GET request cache clearance is a pain when complex querystrings are involved

2. Say you want to append data to your request, if you GET you need to add _params_ but if you POST/PUT 
you need to add _data_

3. Content transfer encoding often needs to be set to UTF-8 for a variety of reasons, project-depending

4. Standard DELETE requests do not allow body parameters in almost all cases

5. I also wanted to be able to configure the location of the API from _outside_ the NG app, before it bootstrapped,
so it's trivial to move an API to a different location and be able to update the client-side app 
for **anybody** - even a very front-end junior developer

This wrapper attempts to go some way to resolving these issues as much as is possible from the client-side.

##### Caveats:
Some cases - such as appending and allowing body parameters in DELETE requests are as much as server-side issues
as client-side ones, so the wrapper does as much as it can to facilitate this where possible.

##### To get started:
- Open your terminal and run `npm install`
- When complete, run `npm start`
- Once the test server is up and running, open your browser and point it to: _[http://localhost:3000](http://localhost:3000 "localhost")_
- You should be presented with a cutting-edge (lolz) interface which gives you the opportunity to view and delete
as many company employees as your inner-evil-CEO wishes. 

##### Notes:
- The server / API is generated using a simple json-server generator script, Faker and Lodash
- In the 'sample' folder, only the api-wrapper javascript file is compressed (a result of the bundle process), 
everything else is left un-bundled for ease of reading
- The client-side app uses UI Router for state management, to simplify view controllers 
and to bring some consistency to app structure

##### TODO:
- Write specs
- Make the wrapper injectable and configurable _per-service_ so we can wrap 
multiple APIs easily in a single NG app
- Modularize the Sample app properly
- Convert client-side sample and wrapper to ES6
- Remove Gulp, move to Webpack build
- Anotjher approach that I might use in future is to write in the default request amendment behaviours as 
interceptors for a more 'transparent' solution
