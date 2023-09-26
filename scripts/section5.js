// Array to store text box objects
let boxes = [];
let myCanvasX, myCanvasY;
let canvasHeight, canvasWidth;



function setup() {
    // Create canvas
    var canvasHeight = 0.8 * windowHeight;
    var canvasWidth = windowWidth * 0.9;
    myCanvas = createCanvas(canvasWidth, canvasHeight);
    // myCanvas.position(windowWidth/2 - canvasWidth/2, windowHeight/2 - canvasHeight/2);

    myCanvasX = myCanvas.position().x;
    myCanvasY = myCanvas.position().y;

    let spacingPercentage = 5; // Adjust this value to control the spacing percentage
    let numBoxes = 4; // Adjust the number of boxes as needed

    // Calculate the spacing based on the current canvas width and the number of boxes
    let spacing = (canvasWidth / (numBoxes + 1)) * (spacingPercentage / 100);

    // Calculate the initial x position for the first box
    let x = spacing;

    for (let i = 0; i < numBoxes; i++) {
        boxes.push(new Box(200, 90, x, canvasHeight - 150));
        x += 200 + spacing; // Adjust the box width as needed
    }

    myCanvas.parent("#p5canvas")



    
    // Add initial boxes
    // for (let i = 0; i < 4; i++) {
    //     boxes.push(new Box(200, 90, 100 + i*(canvasWidth*0.15), canvasHeight - 150));
    // }
}



//a p5.js function that runs when the window is resized
function windowResized() {
    // resizeCanvas(windowWidth* 0.9, 500);
    canvasWidth = windowWidth*0.9;
    resizeCanvas(canvasWidth, canvasHeight);
    let spacingPercentage = 5; // Adjust this value to control the spacing percentage
    let numBoxes = 4; // Adjust the number of boxes as needed

    // Calculate the spacing based on the current canvas width and the number of boxes
    let spacing = (canvasWidth / (numBoxes + 1)) * (spacingPercentage / 100);

    // Calculate the initial x position for the first box
    let x = spacing;

    for (let i = 0; i < numBoxes; i++) {
        boxes[i].updatePosition(x);
        x += boxes[i].width + spacing; 
    }


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

function keyPressed(){
    boxes.forEach(box => box.boxKeyPressed())
}

// Text box class
class Box {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x
        this.y = y
        this.isBeingDragged = false; // can probably remove this

        this.text = "";
        this.isTextField = false;

        // create input field
        this.input = createInput('');
        this.input.parent("#p5canvas")
        this.input.position(this.x + myCanvasX, this.y + myCanvasY); 
        this.input.size(this.width, this.height);

        this.responses = [];
        this.responseIndex = 0;
    }

    updatePosition(newX) {
        this.x = newX;
        this.input.position(this.x + myCanvasX, this.y + myCanvasY);
    }


    boxMouseDown() {
        // Check if the mouse cursor is over the box
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
          // Set the isDragging variable to true
          this.isBeingDragged = true;
          this.offsetY = this.y - mouseY;
        }
      }

    boxReleased() {
        if (this.isBeingDragged) {
            if (this.isTextField){
                console.log("only trigger on releasing drag of txt fields")
                var scaledScore = (Math.round(((this.y / 400)*10) + 1))*10
                console.log(scaledScore);
                this.updateTextOnDrop(scaledScore, this.text)
            }
            this.isBeingDragged = false;
        }
    }

    boxDraw() {
        if (this.isTextField){
            if(this.isBeingDragged) {
                this.y = mouseY + this.offsetY;
                this.input.position(this.x + myCanvasX, this.y + myCanvasY);
            }
            // Display the text as a text field
            fill(255);
            rect(this.x, this.y, this.width, this.height);
            fill(0);
            text(this.text, this.x + (this.width*0.05) , this.y + (this.height * 0.1), this.width *0.9, this.height*0.9);

            //button stuff beow
            const buttonWidth = 70;
            const buttonX = this.x + this.width - buttonWidth - 5;
            const buttonY = this.y + this.height - 25;
            
            fill(100);
            rect(buttonX, buttonY, buttonWidth, 20);
            fill(255);
            text("Try again", buttonX + 10, buttonY + 15);

            // Check if the mouse is over the button
            const isOverButton = mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + 20;

            if (isOverButton && mouseIsPressed) {
            // If the mouse is over the button and is clicked, display the next response
            this.nextResponse();
            }
            
        }

        if(this.isBeingDragged) { // if its a text field then drag around the text field and not the input lol rip
            this.y = mouseY + this.offsetY;
            this.input.position(this.x + myCanvasX, this.y + myCanvasY);
        }
    }

    boxMouseIsOver(){
        return (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height);
    }

    boxKeyPressed() {
        if (keyCode === ENTER && this.isFocused()) {
            this.text = this.input.value();

            // let textDiv = createDiv(this.text);
            // textDiv.parent("#p5canvas");
            // textDiv.position(this.x + 5, this.y + 5);
            // textDiv.size(this.width - 10, this.height - 10);
            // textDiv.style("overflow", "auto");

            this.isTextField = true; // Switch to text field mode
            this.input.remove(); // Remove the input element

    


        
        }
    }

    isFocused() {
        return this.input.elt === document.activeElement;
    }
    
    async updateTextOnDrop(scaledScore, existingText) {
        console.log(existingText);
       
        var contentString = `You are an uplifting professional life coach. Your client will tell you a task they want to accomplish today as well as an energy level score, reflecting their capacity to be able to accomplish the goal in their statement. You believe that any progress is good progress, and just want to encourage them to take action, if it's a small thing. You are a world class innovator and super creative. 

        Given the user's statement and energy score, consider what their larger objective is and respond with a action that the user can take that would still help them work towards their objective, but is more reflective of the energy the user has. Do not mention the energy level. All responses should start with 'you could.' Output only what you would tell the user to do as their life coach. All responses should be under 20 words.    `
    
    // Here are some examples:
        
    // Here is some information about your client: She is a 20-something young professional who lives at home with her partner. She is training for a marathon in October. She reads a lot. 

    //     Statement: I want to run 10 miles today. 
    //     Energy level score: 30%. 
    //     Action: You could do a session of targeted leg workouts like squats or high knees to strengthen crucial leg muscles. 
        
    //     Statement: I need to write a three-page essay. 
    //     Energy level score: 20%. 
    //     Action: You could start by just generating a one-page outline — headlines of paragraphs and supporting bullet points, as well as finding the right articles to read and source. 

        // Construct the OpenAI API request
        const messages = [
            { 'role': 'system', 'content': contentString },
            { 'role': 'user', 'content': 
               `Statement: ${existingText}
                Energy level score: ${scaledScore}`
            },
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
                temperature: 1.3,
            }),
        
            
        });
    
        const data = await response.json();
        // this.text = data.choices[0].message.content; 
        this.responses = data.choices.slice(0,3).map(choice => choice.message.content);
        this.responseIndex = 0;
        this.text = this.responses[this.responseIndex];
    }

    nextResponse(){
        if(this.responses.length > 0){
            this.responseIndex = (this.responseIndex + 1) % this.responses.length;
            this.text = this.responses[this.responseIndex];
        }
    }


}

