# Tic Tac Toe

## The game

This Tic-Tac-Toe web-based application has been developed as the first project of General Assembly's Software Engineering Intensive program. 
The game is built using HTML, CSS, and JavaScript, and it runs entirely in the user's web browser. 
The game has a simple and intuitive user interface that allows players to easily customise their token, select their moves and see the current state of the game board, among other features. A user can also choose whether to play against another player or against a computer.

## Deployment Link

Go play! https://purpett.github.io/tic-tac-toe/

## Code Installation

Copy the snippet of code below and paste in your terminal:

`$ git clone https://github.com/purpett/tic-tac-toe`

If you just want to play the game, you can open the index.html file of the cloned repository. 

If you want to code and see live updates in the browser, install the “Live Server” extension in VS Code. Click the “Go Live” button on the right side of the blue bar. It should open automatically in your browser. In case it doesn’t, paste the following in the address bar: “localhost:5500”. Click again on the same button to disable the live server.

## Timeframe & Working Team

The timeframe provided for this project was 7 days. The game was developed independently.

## Technologies

* Languages
    * HTML
    * CSS
    * Javascript 
* Code version control
    - Git: Local machine tool that tracks changes in the application.
    - GitHub: Online service for hosting repositories that uses Git.
* Code and debugging
    - Command line.
    - Visual Studio Code: code editor.
    - Google Chrome Developer Tools.
* Design
    - Freeform: digital whiteboarding app for Apple devices. Used to create wireframe and mockup.
* Images: 
    - [Canva](https://www.canva.com/): used to find the main tokens
    - [Inkscape](https://inkscape.org/): open-source vector graphics editor. Used to create different tokens to allow user to choose the preferred variation.

## Brief

### General Requirements

* **Build a web application from scratch**, without a starter codebase.
* Use your programming skills to **work out the game logic for a simple game like Tic Tac Toe**.
* **Separate HTML, CSS, and JavaScript files** in your application.
* Build an application **to a specification that someone else gives you**.
* **Build a dynamic game that allows two players to compete** from the same computer.
* **Craft a `README.md` file that explains your app** to the world.

### Technical Requirements

* **Render a game board in the browser**.
* **Switch turns** between X and O (or whichever markers you select).
* **Visually display which side won** if a player gets three in a row, or show a draw if neither player wins.
* **Include separate HTML / CSS / JavaScript files**.
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles.
* Use **JavaScript** for **DOM manipulation**.
* **Deploy your game online**, where the rest of the world can access it.
* Use **semantic markup** for HTML and CSS (adhere to best practices).
* Have well-formatted, and well-commented code.


## Extra features

* Keep track of multiple game rounds with a win, lose and tie counter.
* Allow players to customize their tokens.
* Use localStorage persist data locally to allow games to continue after page refresh or loss of internet connectivity.
* Involve Audio in your game.
* Make your site fully responsive so that it is playable from a mobile phone.
* Get inventive with your styling e.g. use hover effects or animations.
* Allow to clear localStorage and reset the game, including the scoreboard.
* Create an AI opponent that plays an almost unbeatable game.

## Planning

1. I started the project by planning what I wanted the game to look like. I used the Freeform app to sketch the wireframe, which contains all the key components of the app and their respective position: 
![Screenshot of the wireframe used to design the application](/readme_items/wireframe.jpg)
<sub>Wireframe</sub>
2. Working from the wireframe, I chose a colour scheme, then found the tokens on Canva, and added everything to the mockup. This includes a more specific design, closer to the final result:
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
- As a computer, I want to play my move so that I can mostly win or tie (rarely lose)
- As a computer, I want to prioritize my own winning over preventing the user from winning
- As a user, I should be able to choose whether player 2 will be a human or a computer
- As a user, I want to hear sounds when switching player 2 
- As a user, I want to reset the game and the scoreboard when I switch player 2
- As a user, I should be able notice that I can change player 2
- As a user, I want to play against a computer to have fun without a second human player
- As a user, I want the move of the computer to be shown after some time, to make the game look more natural
- As a user, I want to see the word "Computer" instead of "Player 2" so that I know if I am playing against one.

## Code Process

1. I coded core HTML and CSS with all the needed elements for an MVP (Minimum Viable Product).
2. I divided the logic of the game, keeping code in the respective areas:
    * I stored the game state in variables at the top of the code file.
        * `isX` is true if it’s X’s turn, false if it’s not X’s turn. 
        * `boxStatus` is an empty array that will get filled with ‘x’ or ‘o’, depending on the selected box: e.g. `[ ‘x’, _, ‘o’, _, ‘x’, _, _, _ ]` where `boxStatus[0]` represents the first box in the game grid. 
        * `player2` is “Player 2” by default but gets changed to “Computer” when a player wants to play with the AI opponent.
        * The `winner` variable is assigned to `undefined` to default because it will get filled whenever the `determineWinner()` function is called. 
        * The `winningCombination` variable stores an array of triples that represent the indexes of each element of a winning combination. 

        ![game-state](/readme_items/ttt-state.png)

    * In the second section I put all the functions with the game logic (e.g. updating the score, determining the winner, etc.).
        * The `mark(index)` function checks who’s turn it is, picks the relevant marker (‘x’ or ‘o’) and fills the `boxStatus` array at the index chosen by the users with the marker selected. It checks if there has been a winner after every turn.

        ![mark-function](/readme_items/mark-function.png)

        * The `determineWinner()` function returns the winner. It goes through the `boxStatus` array and checks if it has been filled with three of the same markers. It uses the indexes of `winningCombinations`, triple by triple, as the indexes of `boxStatus` to find a winning combination.

        ![determine-winner-function](/readme_items/determine-winner.png)

        * The `isTie()` function checks if all the boxes of the game grid have been filled, then checks the status of the `winner` variable (if still undefined and all boxes are full, then there is no winner and the game is over).

        ![is-tie-function](/readme_items/isTie.png)

        * Logic of the computer opponent. `findTwoThirds()` uses the same procedure as `determineWinner()` but it only checks if there have been 2 out of 3 of the same marker in one winning combination at a time. `computerMove()` uses the `findTwoThirds()` function to check if the computer (‘o’) can win first, then if Player 1 is about to win, so as to choose where to place the computer marker and eventually beat Player 1. `computerFallbackChoices()` is used to choose a box to mark when it’s too soon to check for winning combinations. It prioritises the centre, and if it’s taken, it fills the first available box. 

        ![computer-logic](/readme_items/computer-ai.png)
    
    * Where I could, I grouped the DOM manipulation in the third section: changing the output in the browser (e.g. event listeners and handlers, calling of functions, adding elements to the HTML, etc.).
        * The `updateGridBoxes()` function checks the status of the `boxStatus` array to fill the boxes in the game grid every time a box is clicked, through the DOM. This function gets also called when a player changes its token to display the new token in the grid.

        ![update-grid-function](/readme_items/updateGridBoxes.png)
        ![token-change](/readme_items/change-tokens.gif)
      
        <sub>The grid updates every time a token is changed<sub>
3. Game storage: `storeGame()`  and `loadGame()` functions, using localStorage. The game is loaded when the page refreshes or closes. Throughout the code, the current game is stored every time something is updated (e.g. in functions and event handlers). 
    ![localStorage](/readme_items/localStorage.png)
4. I then refactored code for readability, I tweaked the CSS and implemented minor extra features. 

## Challenges

* Keeping the different parts of the game separated, managing the state changes and updating the DOM. I often had to remind myself that the DOM is not supposed to contain state, it’s supposed to reflect the changes of the state in the output.
* Deciding the best data structure for the game state, whether to use classes or to keep everything in one single file and dividing the game into sections (state, logic, DOM manipulation). I started coding using the latter and at the end of the project I tried to refactor into classes but I don’t think it would have made a large difference in terms of readability.
* Solving the question of determining a winner. This was challenging because I did not want to brute-force it with a long and intricate if statement, but rather use a smarter algorithm and have cleaner code. So I broke it down, and tackled every bit of the winner logic by writing pseudocode, to then replace it with actual code.
* Deciding a logic for the AI. I was hesitant to implement this feature at first because I was not sure how to start. With the use of pseudocode, I started imagining the beginning of the turn, what the Computer should consider when choosing its move, and built up from there. But what I found the most challenging was making the AI unbeatable. I played over and over, making sure that the Computer would prevent the player from winning or try to win.

## Wins

* Writing a good amount of working, DRY code, and creating a full web application.
* Building the AI opponent and making it (almost) unbeatable. I tweaked the code every time I won against the Computer so that it would prevent me from doing that move the next time. There is only ONE combination remaining that wins against the Computer, but it’s quite difficult getting there. 
* The overall design! I believe it looks pretty neat. I fixed all the bugs I found while using the GUI, and implemented lots of little features that just make the UX much better. I particularly like the sounds, the reset button (resets the scoreboard and erases the localStorage), and the option of switching between Player 2 and Computer on a single page with a drop-down. The selection of either Player 2 or Computer automatically resets the scoreboard and the game. 

## Key learnings

* I can now use the Chrome debugger confidently, which is a vast improvement compared to before this project. 
* I have discovered localStorage, how it works, its advantages and pitfalls (e.g. it only accepts strings, so conversion to JSON is necessary, especially to load the information later on). 
* I have understood and successfully used Event propagation/bubbling to reduce the number of event listeners.
* I’ve learned to split a larger project into small tasks and tackle them one by one without feeling overwhelmed. The user stories (provided and written) were extremely useful as they guided me and kept me focused on one task at a time.

### Future plans

* Make the AI opponent 100% unbeatable.
* Allow 2 players to play online with each other using a 3rd-party service.
* Make the game container shorter on larger screens.
