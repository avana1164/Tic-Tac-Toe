// Get the canvas and context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let gameWon = document.getElementById('game-won');
let buttons = [];
let player = 1;
for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        buttons[i*3 + j] = {x: j*150, y: i*150, width: 150, height: 150, color: 'blue', text: ''}
    }
}

// Function to draw a line
function drawLine(x1, y1, x2, y2, color, lineWidth) {
    ctx.beginPath();             // Begin a new path
    ctx.moveTo(x1, y1);          // Move the pen to (x1, y1)
    ctx.lineTo(x2, y2);          // Draw a line to (x2, y2)
    ctx.strokeStyle = color;     // Set the stroke color
    ctx.lineWidth = lineWidth;   // Set the line width
    ctx.stroke();                // Apply the stroke
}

// Function to draw buttons
function drawButtons() {
    buttons.forEach(button => {
        ctx.fillStyle = button.color;
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });
}

function drawLines(){
    for(let i = 1; i < 3; i++){
        drawLine(i*150, 0, i*150, 450, 'black', 2);
        drawLine(0, i*150, 450, i*150, 'black', 2);
    }
}
// Initial drawing of buttons
drawButtons();
drawLines();
// Function to check if a point is inside a button
function isInsideButton(x, y, button) {
    return x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height;
}

function verify(){ 
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (buttons[a].text === buttons[b].text && buttons[a].text === buttons[c].text && buttons[a].text != '') {
            return true;
        }
    }

    return false;
}

function tie(){
    let empty_squares = 9;
    for(let i = 0; i < 9; i++){
        if(buttons[i].text != ''){
            empty_squares--;
        }
    }
    if(empty_squares === 0){
        return true;
    }
    return false;
}


// Add event listener for canvas clicks
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    buttons.forEach(button => {
        if (isInsideButton(x, y, button)) { 
            if(verify() === false){  
                if(player == 1 && button.text === ''){
                    button.text = 'x';
                    player = 2;
                }    
                
                if(player == 2 && button.text === ''){
                    button.text = 'o'
                    player = 1;
                }
            }
        }
        gameWon.textContent = 'Player ' + player + '\'s turn';
        drawButtons();
        drawLines();
    });
    if(verify()){
        gameWon.style.left = '625px';
        // Add event listener to disable all buttons
        if(player === 2){
            gameWon.textContent = 'Player 1 won! Please reload page to play again.';
        } else {
            gameWon.textContent = 'Player 2 won! Please reload page to play again.';
        }
    } else if(tie()){
        gameWon.style.left = '625px';
        gameWon.textContent = 'Tie. Please reload page to play again.';
    }
});