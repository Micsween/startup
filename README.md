
# Multiplayer Uno!
# Useful links
- [CSS div styles](https://codepen.io/leesjensen/pen/RwBOPjv)
- [My Notes](notes.md)

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
Examining Simon HTML I more fully understood how the canvas tag works. I also liked that you could tell the page to conform to the width of a device. Seeing a structural version of Simon made me think of how I could display some of my project's features in a way that is easy for playtesting. Such as "X created a game." I believe that will be very useful.

I found out that buttons can submit a get() request to a specific url. I implemented that in the join game page.

I realized that in my initial design, the need to have an entire page dedicated to just navigating to other pages seemed kind of redundant. So I decided to keep the design of using a navbar throughout the entire application, and make the default log-in page your match history. Which is blank, if the profile is new.


- [x] **HTML pages** I decided to make less elements to navigate to and break down what each page does to avoid redundance.
- [x] **Proper HTML element usage** - I think I've learned I should add more divs.
- [x] **Links** - linking the buttons to their respective pages was convenient and made the pages feel cooler.
- [x] **Text** - Lots of filler text
- [x] **3rd party API placeholder** - Im going to put inspirational quotes in the match history page.
- [x] **Images** - I think I'll have 4 default profile pictures that are randomly assigned when a match starts.
- [x] **Login placeholder** - I have a forgot password placeholder which Ive decided i will implement if I have some extra time.
- [x] **DB data placeholder** - my website is going to store the history of a player's games
- [x] **WebSocket placeholder** - You'll see cards being played in real time.

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
