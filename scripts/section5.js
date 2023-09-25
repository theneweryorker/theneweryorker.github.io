// Array to store text box objects
let boxes = [];
let myCanvasX, myCanvasY;


function setup() {
    // Create canvas
    var canvasHeight = 500;
    myCanvas = createCanvas(windowWidth * 0.9, canvasHeight);
    myCanvasX = myCanvas.position().x;
    myCanvasY = myCanvas.position().y;
    myCanvas.parent("#p5canvas")
    
    // Add initial boxes
    for (let i = 0; i < 4; i++) {
        boxes.push(new Box(100, 50, 150 + i*150, canvasHeight - 150));
    }
}

//a p5.js function that runs when the window is resized
function windowResized() {
    resizeCanvas(windowWidth* 0.9, 500);
}

//a p5.js function that runs repeatedly
function draw() {
    background(220) // redraw white background
    boxes.forEach(box => box.boxDraw())
}

//a p5.js function that runs when a mouse press happens inside the canvas as a whole
function mousePressed() {
    boxes.forEach(box => box.boxMouseDown()) // every time the mouse click happens, do the click logic for each box
    // console.log("huh?");
}

//a p5.js function that runs when a mouse release happens inside the canvas as a whole
function mouseReleased() {
    boxes.forEach(box => box.boxReleased()) //every time the release happens, " "
}

// Text box class
class Box {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x
        this.y = y
        this.isBeingDragged = false;
        
        this.input = createInput('');
        this.input.parent("#p5canvas")
        this.input.position(this.x + myCanvasX, this.y + myCanvasY); 
        this.input.size(this.width, this.height);
        
        this.input.input(foo => {
            console.log(foo)
            console.log(this.input.value())

            // if(foo == )
        });
    }


    boxMouseDown() {
        // Check if the mouse cursor is over the box
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
          // Set the isDragging variable to true
        //   this.dragDistance = 0;
        //   this.dragDistance += Math.abs(mouseY - this.y);
        //   console.log(this.dragDistance);
        //   this.dragDistance = 0;
          this.isBeingDragged = true;
        //   this.isBeingDragged = true;
          this.offsetY = this.y - mouseY;
        } else {
            this.isBeingDragged = false;
            console.log("huh?")
        }
      }

    boxReleased() {
        if (this.isBeingDragged) {
            this.isBeingDragged = false;
        } else {
            // If the box was not being dragged, it was just clicked
            console.log("Just a click");
            console.log(this.isBeingDragged);
        }
    }
    
    
//somewhere here, isBeingDragged flips from false to true 

    boxDraw() {
        // if we are dragging
        if (!this.isBeingDragged){
            return; 
        }

        if(this.isBeingDragged) {
    
            // this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
            this.input.position(this.x + myCanvasX, this.y + myCanvasY);
            console.log(this.y);
            let ease = Math.round(((this.y / 400)*10) + 1);
            console.log(ease);
        }
    }

    boxMouseIsOver(){
        return (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height);
    }

}


async function updateTextOnDrop(boxes, ease) {
    // Get the existing text inside .grid-item
    // const specialHoverText = gridItem.querySelector('.specialhover').textContent.trim(); 

    const existingText = boxes[0].input.value();
    console.log(existingText);
   


    contentString = "You are given a statement from the user about something they want to accomplish today. They will also give you an energy level score, reflecting their capacity to be able to accomplish the goal in their statement. In addition, here is some information about the user: She is a 20-something young professional who lives at home with her partner. She is training for a marathon in October and applying to grad school. She's very anxious about both. She is juggling a lot. Given the user's statement, in bullet points, give me an Objective: what you think their larger objective is, a Task: Given that objective, what a smaller, scoped task would be that is in-line with their goal, but more reflective of the energy the user has. Example: Statement: I want to run 10 miles today. Energy level score: 30%. Objective: The user is probably trying to increase their cardiovascular fitness ahead of their marathon. Task: Hip flexor strength is just as important for long runs as cardiovascular endurance! If you don't have time or energy for 10 miles today, you could do a session of targeted leg workouts like squats or high knees to strengthen crucial leg muscles. Example: Statement: I need to write a three-page essay. Energy level score: 20%. Objective: The user is likely trying to write essays to apply to grad school and is stressed. Task: If you don't have enough capacity today, you could start with just generating a one-page outline — headlines of paragraphs and supporting bullet points, as well as finding the right articles to read and source. Example: Statement: I need to plan a birthday party for Austin in SF. Energy level score: 40%. Objective: The user is likely trying to plan an entire party, complete with invites, theme, location, and timing. Task: To start, you could identify a few fun locations with availability, and jot down the guest list. Interpret the statement, if the user has an energy level score of " + ease + "%."

    

    // Construct the OpenAI API request
    const messages = [
        { 'role': 'system', 'content': contentString },
        { 'role': 'user', 'content': `Statement: ${existingText}`},
    ];

    const response = await fetch('https://us-central1-holly-wrappers.cloudfunctions.net/oaiChatWrapper', {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 1,
        }),
    
        
    });




    const data = await response.json();

    // need to UPDATE DOWN HERE
    const generatedText = data.choices[0].message.content;
    // console.log(`Old: ${existingText}`);
    // console.log(`New: ${generatedText}`);
    
    // const newText = boxes[0].input.value();
    // newText.textContent = generatedText;


    // const gridText = gridItem.querySelector('.grid-text');
    // gridText.textContent = generatedText;
    // gridText.style.color = '#D375FF';

    // const hoverText = gridItem.querySelector('.specialhover');
    // hoverText.textContent = "original: " + existingText;
    // hoverText.style.color = '#00000';

    // on enter turn into a text field
    // on drag turn into something real
}

