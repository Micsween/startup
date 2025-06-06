# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)


## VScode Notes
alt + <- arrow keys : swaps the current line of code with the one beneath it.
alt + shift+ arrow keys: duplicates the current line of code
## AWS Notes
From : [Amazon Web Services tutorial](https://github.com/webprogramming260/.github/blob/main/profile/webServers/amazonWebServicesEc2/amazonWebServicesEc2.md)
<!-- I don't quite understand this yet so I'm going to save it for later.-->
The Caddyfile is the configuration file for your web service gateway. The public_html directory contains all of the static files that you are serving up directly through Caddy when using it as a web service. We will cover Caddy configuration in a later instruction. The services directory is the place where you are going to install all of your web services once you build them.

## Accessing the server remotely
look to google slides from 1/16/24 to set up domain name and restart

```sh
➜  ssh -i [key pair file] ubuntu@[ip address]
```
## CADDY NOTES
- **Configuration file**: `~/Caddyfile`
  This file contains the definitions for routing HTTP requests that Caddy receives. It also determines what files to use based on the domain name given.
- **HTML Files**: `~/Caddyfile`
  Okay, so: your website is in a directory. And you can specify what directory to open when there's an HTTP request!! That's what this file is for
```
  80 IS THE PORT FOR HTTP REQUESTS SO THATS WHY IT SAYS :80 
  :80 {
        root * /usr/share/caddy
        file_server
  }
```
## What is a port number?
A port number is a way to identify a process to which a network message is to be forwarded when it arrives at a server. Hypertext Transfer Protocol (HTTP) messages always go to port 80 -- one of the most commonly used ports.
>[!NOTE]
> MY WEBSITE IP: http://34.228.83.158/

>[!IMPORTANT]
>Don't forget!!
Note that your elastic IP address is allocated until your release it, not until you terminate your instance. So make sure you release it when you no longer need it. Otherwise you will get a nasty $3 bill every month.

The layers of the internet
- HTTPS: Functionality
- TCP/UDP: Package delivery
- IP: Connections/Routing
- Link: Physical connections

## HTML Notes

span: inline span of content (bold)
h1-9: text heading
table: Table
ol: Ordered list
ul: Unordered list

## Helpful Codepen links
- [HTML: Structure Codepen](https://codepen.io/codingdork/pen/EaYdmeP)
- [HTML: Input Codepen](https://codepen.io/codingdork/pen/ZYzqyLW)

Every HTML element may have attributes. Attributes describe the specific details of the element. For example, the id attribute gives a unique ID to the element so that you can distinguish it from other elements. The class attribute is another common element attribute that designates the element as being classified into a named group of elements. Attributes are written inside the element tag with a name followed by an optional value. You can use either single quotes (') or double quotes (") to delimit attribute values.

Embedding a link in HTML:
```html
<a href="https://byu.edu">Go to the Y</a>
```
## CSS Notes

ID: only for one element per page. 
Class: multiple elements with the same styling rules.

Grid: a grid of objects

# HOW TO DEPLOY:

  ```sh
  ./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```
## Node.js Notes

For editing files in a terminal, this is a pretty easy command for powershell, because it doesn't like 'nano'
  ```sh
  notepad.exe fileName.txt #or .html, .js, .jsx, etc
  ```
Debugging with node.js in vscode 
1. Start by hitting f5
   Theres a debugger in vscode and a debugger in your browser, you can put breakpoints in both and step through your code.
   Dont use liveserver ex
2. node.js will restart every time i hit ctrl+s
3. 


> [!IMPORTANT]
> Learn how to use the vscode debugger (using ctrl+shift+p)

```sh

console.log('Bye, world!');
console.log('Hello, world!');

console.time('demo time');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('demo time');
console.log(doMath((a,b) => a-b, 5))
//(parameters) => return statement
// if you add curly braces you need to add the statement "return"
```

```sh
function makeClosure(init){
  let closureValue = init;
  return () => `closure ${++closureValue}`;

const closure = makeClosure(0);
console.log(closure()); #prints 1
console.log(closure()); #prints 2
}
```
This function will remember whatever you orignally passed in.
## React Notes
When you want to bundle your application so that you can deploy to a production environment you need to run npm run build.


Global Scope of CSS: When you include a CSS file in your React project, its styles are applied globally unless you're using a scoping mechanism like CSS Modules or styled-components. I ran into this problem when I was two stylesheets had the same name for their "content" div. So i renamed the id's to be the name of the component

## Service Endpoints
curl requests for testing endpoints:

Register:
- creates a user if it does not already exists
- sets an authCookie
```sh
//REGISTER ENDPOINT:
curl -X POST -H "Content-Type: application/json" -d '{"username":"firstuser", "password":"firstpassword"}' http://localhost:4000/user/create

```
Login:
- verifies user
- authenticates user (by setting a new authCookie)
```sh
//LOGIN ENDPOINT:
curl -X POST -H "Content-Type: application/json" -d '{"username":"firstuser", "password":"firstpassword"}' http://localhost:4000/api/user/login
```
Logout:
- takes the authCookie thats been stored
- finds the user associated with the authCookie's key
- deletes the authToken of the associated user
- and the authCookie from the browser.
```sh
//DELETE ENDPOINT:
curl -X DELETE -H "Content-Type: application/json" -d '{"username":"firstuser", "password":"firstpassword"}' http://localhost:4000/api/user/logout```
```

## MongoDB Notes
MongoDB does automatic connection pooling! So its best to create one client to be used in all operations.
I've decided it would be best to put this in my index.js file (my backend)
```sh
const { MongoClient } = require('mongodb');

const uri = 'your_mongodb_connection_string';
const client = new MongoClient(uri, { maxPoolSize: 150 });
```

## Websocket

So websocket takes a server and creates a Websocket Server
Which from my understanding creates two types of connections. 1. for normal http requests and a second one for websocket.
clients are all the people connected to websocket

Example from https://www.npmjs.com/package/ws#usage-examples
# External HTTP/S server
```sh
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';

const server = createServer({
  cert: readFileSync('/path/to/cert.pem'),
  key: readFileSync('/path/to/key.pem')
});
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

server.listen(8080);
```

# A client WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
``` sh
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
```

 curl "http://localhost:4000/socket.io/?EIO=4&transport=polling"
