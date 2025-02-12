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
