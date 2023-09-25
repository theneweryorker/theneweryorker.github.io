// Function to update the text inside .grid-item based on the X-axis position
gridItems = document.querySelectorAll('.grid-item');


let rating = 0;
const minDragDistance = 50;
let isDragging = false;
let startPositionX = 0;
let startPositionY = 0;

// add listeners for existing griditems
gridItems.forEach((gridItem) => {
    gridItem.addEventListener('mousedown', handleDragStart);
    gridItem.addEventListener('mousemove', handleDrag);
    gridItem.addEventListener('mouseup', handleDragEnd);
    gridItem.addEventListener('mouseleave', handleDragEnd);
});

// add listener for user submitted griditems
document.querySelector('#submit').addEventListener('click', handleSubmitClick);


// EVERYTHING BELOW IS FUNCTIONS, EVERYTHING ABOVE RUNS WHEN THE PAGE LOADS
function handleDragStart(event) {
    const gridItem = event.currentTarget;
    
    // grab position at beginning of drag in coordinates relative to viewport to calculate diff later
    startPositionX = event.clientX;
    startPositionY = event.clientY;
    
    gridItem.style.position = 'absolute';
    gridItem.style.zIndex = 1000;
    isDragging = true;  
}

function handleDrag(event) {
    const gridItem = event.currentTarget;

    if (!isDragging) return;
    gridItem.style.transform = `translate(${event.clientX - startPositionX}px, ${event.clientY - startPositionY}px)`;
}

function handleDragEnd(event) {
    const gridItem = event.currentTarget;
    if (!isDragging) return;    
    // Measure movement from beginning of drag in coordinates relative to viewport
    offsetX = event.clientX - startPositionX;
    offsetY = event.clientY - startPositionY;

    // Update element's position in coordinates relative to element's parent
    gridItem.style.left = `${gridItem.offsetLeft + offsetX}px`; 
    gridItem.style.top = `${gridItem.offsetTop + offsetY}px`;
    
    // Reset transform
    gridItem.style.transform = '';
    gridItem.style.position = '';

    isDragging = false;
    relativePosition = determinePositionRelativeToCenter(event, gridItem);
    updateTextOnDrop(gridItem, relativePosition);
}

function handleSubmitClick(event){
    const gridItem = document.querySelector('.grid-item-input');

    // Copy text from textarea 
    const userText = document.querySelector('#speculation').value;
    document.querySelector('#speculation').style.color = 'red';


    // Create new grid text div
    const newTextDiv = document.createElement('div');
    newTextDiv.classList.add('grid-text');  
    newTextDiv.textContent = userText;

    // Append to grid item
    gridItem.appendChild(newTextDiv);
    // TODO update the css so it looks "like" a regular future but maybe with red?

    // Cleanup - remove elements and update classes
    gridItem.classList.add('grid-item');
    gridItem.classList.remove('grid-item-input');
    document.querySelector('#speculation').remove(); 
    document.querySelector('#submit').remove();

    // add event listeners
    gridItem.addEventListener('mousedown', handleDragStart);
    gridItem.addEventListener('mousemove', handleDrag);
    gridItem.addEventListener('mouseup', handleDragEnd);
    gridItem.addEventListener('mouseleave', handleDragEnd);
}

function determinePositionRelativeToCenter(dragEvent, gridItem) {
    // Get the center point of the containing div
    const divRect = gridItem.parentNode.getBoundingClientRect(); 
    const divCenterX = divRect.left + divRect.width/2;
    const divCenterY = divRect.top + divRect.height/2;
    
    // Get the end point of the drag event
    const dragEndX = dragEvent.clientX; 
    const dragEndY = dragEvent.clientY;
  
    // Calculate the offset from the center
    const offsetX = dragEndX - divCenterX;
    const offsetY = (dragEndY - divCenterY) * -1; //need to flip since the Y axis is "positive" going down the page
  
    // Determine quadrant based on offset signs
    let quadrant = "";
    if (offsetX > 0 && offsetY >= 0) {
      quadrant = "top_right"; 
    } else if (offsetX <= 0 && offsetY > 0) {
      quadrant = "top_left";
    } else if (offsetX < 0 && offsetY <= 0) {
      quadrant = "bottom_left";
    } else {
      quadrant = "bottom_right";
    }
  
    // Get width and height of containing div
    const divWidth = gridItem.clientWidth;
    const divHeight = gridItem.clientHeight;

    // Scale offsets to a range of 0 to 10
    const offsetXScaled = Math.round((offsetX / (divWidth/2)) * 10);
    const offsetYScaled = Math.round((offsetY / (divHeight/2)) * 10);

    // Offset scales will now be 0 to 10 relative to div size
    return {
        offsetX: offsetXScaled, 
        offsetY: offsetYScaled,
        quadrant
    };
  }

async function updateTextOnDrop(gridItem, relativePosition) {
    // Get the existing text inside .grid-item
    // const specialHoverText = gridItem.querySelector('.specialhover').textContent.trim(); 

    const specialHoverText = gridItem.querySelector('.specialhover') ? gridItem.querySelector('.specialhover').textContent.trim() : '';
    const grid_Text = gridItem.querySelector('.grid-text').textContent.trim();
    console.log(grid_Text);
    const existingText =  grid_Text;
   
   

    if (relativePosition.offsetX > 0) {
        stance = "optimistic";
    } else {
        stance = "pessimistic";
    }

    if (relativePosition.offsetY > 0) {
        rolename = "Isaac Asimov, the sci-fi author";
        method = "Paint a sci-fi future"
    } else {
        rolename = "Confucius, the poet";
        method = "Write a poem"
    }



    severityY = Math.abs(relativePosition.offsetY) > 30 ? "a very intense version of" : "a pretty chill version of"
    severityX = Math.abs(relativePosition.offsetX) > 30 ? "extremely" : "a little"

    contentString = "You are " + severityY + " " + rolename + ". You are" + severityX + " " + stance + "about the effects of AI." + method + " in response to the statement you are given in 20 words or less."
    

    // Construct the OpenAI API request
    const messages = [
        { 'role': 'system', 'content': contentString },
        { 'role': 'user', 'content': `Statement: ${grid_Text}`},
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
    const generatedText = data.choices[0].message.content;
    console.log(`Old: ${grid_Text}`);
    console.log(`New: ${generatedText}`);
    
    const gridText = gridItem.querySelector('.grid-text');
    gridText.textContent = generatedText;
    gridText.style.color = '#D375FF';

    const hoverText = gridItem.querySelector('.specialhover');
    hoverText.textContent = "original: " + grid_Text;
    hoverText.style.color = '#00000';
}

/**
 * todos:
 * - add waiting symbol
 * - dont make it clickable again until answer returns
 */