# Tic Tac Toe

## The game

This Tic-Tac-Toe (or Noughts and Crosses) game has been developed as the first project of General Assembly's SEI program. 

The rules are just like the traditional game. In turns, the players mark cells of a 3x3 grid with their chosen token. 

The goal of the game is to be the first to place three tokens in a vertical, horizontal, or diagonal row.

## Definition of the product

Web-based application that allows two users to play the classic game of Tic Tac Toe against each other. The game is built using HTML, CSS, and JavaScript, and it runs entirely in the user's web browser. The game has a simple and intuitive user interface that allows players to easily customize their token, select their moves and see the current state of the game board, among other features.

## Technology

* Languages
    * HTML
    * CSS
    * Javascript 
* Code version control
    - Git: Local machine tool that tracks changes in the application
    - GitHub: Online service for hosting repository that uses Git
* Code and debugging
    - Command line
    - Visual Studio Code: code editor
    - Google Chrome Developer Tools
* Design
    - Freeform: digital whiteboarding app for Apple devices. Used to create wireframe and mockup
* Images: 
    - [Canva](https://www.canva.com/): used to find the main tokens
    - Inkscape: open-source vector graphics editor. Used to create different tokens to allow user to choose the preferred variation.

## Requirements

### General Requirements

- [x] **Build a web application from scratch**, without a starter codebas
- [x] Use your programming skills to **work out the game logic for a simple game like Tic Tac Toe**
- [x] **Separate HTML, CSS, and JavaScript files** in your application
- [x] Build an application **to a specification that someone else gives you**
- [x] **Build a dynamic game that allows two players to compete** from the same computer
- [x] **Craft a `README.md` file that explains your app** to the world

### Technical Requirements

- [x] **Render a game board in the browser** 
- [x] **Switch turns** between X and O (or whichever markers you select)
- [x] **Visually display which side won** if a player gets three in a row, or show a draw if neither player wins
- [x] **Include separate HTML / CSS / JavaScript files**
- [x] Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- [x] Use **JavaScript** for **DOM manipulation**
- [x] **Deploy your game online**, where the rest of the world can access it
- [x] Use **semantic markup** for HTML and CSS (adhere to best practices)
- [x] Have well-formatted, and well-commented code


## Extra features

- [x] Keep track of multiple game rounds with a win, lose and tie counter
- [x] Allow players to customize their tokens
- [x] Use localStorage persist data locally to allow games to continue after page refresh or loss of internet connectivity
- [x] Involve Audio in your game
- [x] Make your site fully responsive so that it is playable from a mobile phone
- [x] Get inventive with your styling e.g. use hover effects or animations
- [x] Allow to clear localStorage and reset the game, including the scoreboard

## Approach

1. Create a wireframe and a mockup to have an idea of the layout of the application
2. Code core HTML and CSS
2. Divide the logic of the game
    - Game state: stored in variables (e.g. winning combinations, which squares have been selected on the grid, etc.)
    - Game logic: functions (e.g. updating the score, determining the winner, etc.)
    - DOM manipulation: changing the output in the browser (e.g. event listeners and hanlers, calling of functions, adding elements to the HTML, etc.)
3. Game storage: store the game every time something is updated (state, DOM, etc.) 
4. Code refactoring for readibility, CSS tweaks and implementation of all extra features (HTML, CSS and JS)

## Planning

### Design

1. Wireframe: 
![Screenshot of the wireframe used to design the application](/readme_items/wireframe.jpg)
<sub>Wireframe</sub>
2. Mockup:
![Screenshot of the mockup for a detailed idea of the final product](/readme_items/mockup.jpg)
<sub>Mockup</sub>

### User stories

- As a user, I should be able to start a new tic tac toe game
- As a user, I want to see animation on the tokens so that I know if I can customize them
- As a user, I want to see my customized token on the grid
- As a user, I should be able to click on a square to add X first and then O, and so on
- As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
- As a user, I should not be able to click the same square twice
- As a user, I should not be able to continue playing once I win, lose, or tie
- As a user, I should receive a point every time I win
- As a user, I should be able to see the score of each player and how many ties there have been
- As a user, I should be able to play the game again without refreshing the page
- As a user, I should be able to reset the game and scoreboard so that I can start a brand new game 
- As a user, I should be able to keep playing the game and not lose the score if my page refreshes or there is a temporary internet loss
- As a user, I want to see visual changes when somebody wins
- As a user, I would like to hear sounds when using the application

### Future plans

- [] Create an AI opponent: teach JavaScript to play an unbeatable game
- [] Allow 2 players to play online with each other using any means such as WebSockets, Firebase, or other 3rd-party services.

## Playing

### What you need

* Device (computer, phone, tablet)
* Internet connectivity
* Web Browser

### Link to game

Go play! https://purpett.github.io/tic-tac-toe/