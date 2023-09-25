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
        boxes.push(new Box(200, 90, 100 + i*260, canvasHeight - 150));
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
       
        var contentString = `You are an uplifting life coach. Your client will tell you a task they want to accomplish today as well as an energy level score, reflecting their capacity to be able to accomplish the goal in their statement. You believe that any progress is good progress, and just want to encourage them to take action, if it's a small thing.

        Given the user's statement and energy score, consider what their larger objective is and respond with a action that the user can take that would still help them work towards their objective, but is more reflective of the energy the user has. Do not mention the energy level. All responses should start with 'you could' Output only what you would tell the user to do as their life coach. All responses should be under 20 words.

        Here is some information about your client: She is a 20-something young professional who lives at home with her partner. She is training for a marathon in October and applying to grad school. 
        
        Here are some examples:
        
        Statement: I want to run 10 miles today. 
        Energy level score: 30%. 
        Action: You could do a session of targeted leg workouts like squats or high knees to strengthen crucial leg muscles. 
        
        Statement: I need to write a three-page essay. 
        Energy level score: 20%. 
        Action: You could start by just generating a one-page outline — headlines of paragraphs and supporting bullet points, as well as finding the right articles to read and source. `
    
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
                temperature: 1,
            }),
        
            
        });
    
        const data = await response.json();
        this.text = data.choices[0].message.content; 
    }
}

