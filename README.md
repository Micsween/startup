
# Multiplayer Uno!
#Useful links
[CSS div styles](https://codepen.io/leesjensen/pen/RwBOPjv)
[My Notes](notes.md)

Online Multiplayer UNO! Create an account to log on and play with friends. 
<!-- This took WAY too much effort to get working LOL Ubuntu is my nemesis so I gave up on using it for this project.-->

This is a really cool way to turn in assignments. I like this a lot. it makes it feel more fufilling! 
> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

<summary> Notes on Markdown Syntax</summary>
    
![A photo of my written notes that I took as I read the GitHub Docs on markdown syntax.](./writtenNotes/mdsyntax.jpg)
    
</details>
## 🚀 Specification Deliverable
<!-- Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.
-->
For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Ever want to play card games with your friends, even when they're not around? Or maybe you've gone on a road trip and forgotten your pack of playing cards. But there's a solution! Online multiplayer UNO! Create a game to play with your friends. Check out your match history to see who has the biggest win-streak! May the best player win. 

### Design

<details>  
<summary>Design Mockups</summary>
    
![Design image.](./mockups/signup.png)
![Design image](./mockups/login.png)
![Design image](./mockups/joingame.png)
![Design image](./mockups/matchhistory.png)
![Design image](./mockups/game.png)
![Design image](./mockups/home.png)
![Design image](./mockups/creategame.png)
</details>

This is a backend view of how the game updates as players take their turns.
```mermaid
sequenceDiagram
    actor Player1
    actor Player2
    actor Player3
    actor Player4
    Player1->>Server: Player1's turn
    Server -->>Player2: Player1's turn, activates turn
    Server -->>Player3: Player1's turn
    Server -->>Player4: Player1's turn
    Player2 ->>Server: Player2's turn
    Server -->>Player3: Player2's card, activates turn
    Server -->>Player1: Player2's turn
    Server -->>Player4: Player2's turn
```

### Key features

- Create and play a Game of UNO
- Login
- Create an account
- Ability to click and drag cards
- View match history

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Basic elements, creates the structure of each page.
- **CSS** - Basic movement of the cards, makes everything look nice
- **React** - Allows for page navigation and creating components for easy re-use, such as the player profiles displayed in-game, players can click and drag cards.
- **Service** - Saves the result of each match to each player's profile
- **Authentication** - A user can log in and view their match history/create a game.
- **DB/Login** - the Match history page
- **WebSocket** - game end updates match history, players play their cards in real-time

## 🚀 AWS deliverable

This was relatively easy. Although, I made a mistake in picking BYUno as my domain name. It would've been much easier to pick a more generic name that I could then  use it for another programming project! But I still will. It'd be nice to use it as part of my resume.

- [x] **Server deployed and accessible with custom domain name** - [Byuno.click](https://startup.byuno.click/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
