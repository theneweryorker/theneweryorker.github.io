// Function to update the text inside .grid-item based on the X-axis position
gridItems = document.querySelectorAll('.grid-item');

let rating = 0;
const minDragDistance = 50;

gridItems.forEach((gridItem) => {
    gridItem.addEventListener('mousedown', handleDragStart);
    gridItem.addEventListener('mousemove', handleDrag);
    gridItem.addEventListener('mouseup', handleDragEnd);
    gridItem.addEventListener('mouseleave', handleDragEnd);

    let isDragging = false;

    let startPositionX = 0;
    let startPositionY = 0;

    function handleDragStart(event) {
        // grab position at beginning of drag in coordinates relative to viewport to calculate diff later
        startPositionX = event.clientX;
        startPositionY = event.clientY;
        console.log(`start viewport coords: ${startPositionX}, ${startPositionY}`)
        
        gridItem.style.position = 'absolute';
        gridItem.style.zIndex = 1000;
        isDragging = true;
    }

    function handleDrag(event) {
        if (!isDragging) return;
        gridItem.style.transform = `translate(${event.clientX - startPositionX}px, ${event.clientY - startPositionY}px)`;
    }

    function handleDragEnd(event) {
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
});

function determinePositionRelativeToCenter(dragEvent, gridItem) {
    // Get the center point of the containing div
    const divRect = gridItem.parentNode.getBoundingClientRect(); 
    const divCenterX = divRect.left + divRect.width/2;
    const divCenterY = divRect.top + divRect.height/2;
    console.log(`divCenterY: ${divCenterY}`)
    
    // Get the end point of the drag event
    const dragEndX = dragEvent.clientX; 
    const dragEndY = dragEvent.clientY;
    console.log(`dragEndY: ${dragEndY}`)
  
    // Calculate the offset from the center
    const offsetX = dragEndX - divCenterX;
    const offsetY = (dragEndY - divCenterY) * -1; //need to flip since the Y axis is "positive" going down the page
    console.log(`offsetY: ${offsetY}`)
  
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
    const specialHoverText = gridItem.querySelector('.specialhover').textContent.trim();
    const grid_Text = gridItem.querySelector('.grid-text').textContent.trim();
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

    console.log(contentString);
    
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
    const generatedText = data.choices[0].message.content;
    console.log(`Old: ${existingText}`);
    console.log(`New: ${generatedText}`);
    
    const gridText = gridItem.querySelector('.grid-text');
    gridText.textContent = generatedText;
    gridText.style.color = '#D375FF';

    const hoverText = gridItem.querySelector('.specialhover');
    hoverText.textContent = "original: " + existingText;
    hoverText.style.color = '#00000';
}

/**
 * todos:
 * - fix flicker bug
 * - add waiting symbol
 * - dont make it clickable again until answer returns
 */