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
    let currentPositionX = 0;
    let startPositionY = 0;
    let currentPositionY = 0;
    
    let isPositive = true;
    let isBig = true;

    const initialPositionX = 0;
    const initialPositionY = 0;

    gridItem.style.transform = `translateX(${initialPositionX}px)`;
    gridItem.style.transform = `translateY(${initialPositionY}px)`;

    /**
    * we basically need two systems
    * one to figure out where to render new stuff
    * and then math on top of that to figure out where the origin is and what quadrant we're in now
    *   for this we need:
    *   a) figure out origin
    *   b) figure out position relative to origin
    *   c) figure out quadrants based on that 
    */

    // Helper functions below ============>

    function handleDragStart(event) {
        // console.log("start")
        gridItem.style.position = 'absolute';
        gridItem.style.zIndex = 1000;

        isDragging = true;
        startPositionX = event.clientX;
        startPositionY = event.clientY;

        console.log(`Start X: ${event.clientX}`)
        console.log(`Start Y: ${event.clientY}`)

        // currentPositionX = parseInt(gridItem.style.transform.split('(')[1]);
        // console.log(currentPositionX);
    }

    function handleDrag(event) {
        if (!isDragging) return;
        const dragOffsetX = event.clientX - startPositionX;
        const dragOffsetY = event.clientY - startPositionY;
        const newPositionX = currentPositionX + dragOffsetX;
        const newPositionY = currentPositionY + dragOffsetY;

        // console.log(dragOffsetX);

        if (dragOffsetX > 20) {
            isPositive = true;
        } else if (dragOffsetX < 20) {
            isPositive = false;
        } else {
            dragDirection = ''; // Reset the direction if there is no drag movement
        }

        // console.log(`Offset X: ${dragOffsetX}`);

        if (dragOffsetY < 20) {
            isBig = true;
        } else if (dragOffsetY > 20) {
            isBig = false;
        } else {
            dragDirection = ''; // Reset the direction if there is no drag movement
        }

        // console.log(`Offset Y: ${dragOffsetY}`);

        // Update the position of the current .grid-item based on drag movement
        // gridItem.style.transform = `translateX(${newPositionX}px)`;
        // gridItem.style.transform = `translateY(${newPositionY}px)`;

        // fixed code 
        gridItem.style.transform = `translate(${newPositionX}px, ${newPositionY}px)`;


        const absX = Math.abs(dragOffsetX);
        // console.log(`Abs X: ${absX}`);
  
        const absY = Math.abs(dragOffsetY);
        // console.log(`Abs Y: ${absY}`);
        const windowWidth = window.innerWidth;


     if (absX <= 20 && absY >= 20) {
            ratingY = Math.floor((absY / windowWidth) * 10) + 1; 
            rating = 0;
          }
          else if (absX >= 20 && absY <= 20){ 
            rating = Math.floor((absX / windowWidth) * 10) + 3;
            ratingY = 0;
          }
        
        // console.log(`ratingY: ${ratingY}`);
        // console.log(`rating: ${rating}`);
    }

    function handleDragEnd(event) {
        if (!isDragging) return;
        console.log(`End X: ${event.clientX}`)
        console.log(`End Y: ${event.clientY}`)
        isDragging = false;
        // gridItem.style.zIndex = 'auto';
        gridItem.style.position = '';
        console.log(determinePositionRelativeToCenter(event, gridItem))
        updateTextOnDrop(0, 0, gridItem, isPositive, isBig);
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

async function updateTextOnDrop(positionX, positionY, gridItem, isPositive, isBig) {
    // Get the existing text inside .grid-item
    const specialHoverText = gridItem.querySelector('.specialhover').textContent.trim();
    const grid_Text = gridItem.querySelector('.grid-text').textContent.trim();
    const existingText = specialHoverText + ' ' + grid_Text;
    // console.log(`Is positive: ${isPositive}`);
    // console.log(`Is big: ${isBig}`);

    // return;

    positiveMessage = "You are a fervent supporter of AI, and believes that it can enhance human potential. You want to convince others of the positive potential of AI to help humans."

    negativeMessage = "You believe AI will take over the world, at the cost of human happiness or quality of life. You are confident that it will have detrimental effects for humans and society."

    bigMessage = "The statement your students have given you have underestimated the scale of the impact, and that the impact of AI will be much larger than they anticipate."

    smallMessage = "The statement your students have given you are far too are exaggerated, and you will convince them that impact is minimal."

    contentString = "You are a philosophy and sociology professor who is trying to come up with counterpoints to her students' statements. You will be given a statement about the impact of AI on society, and two scores: an intensity score, and a size score. Both scores will range from 1 to 10. Your stance is that " + (isPositive ? positiveMessage : negativeMessage) + "The social intensity score will dictate how enthusiastically you argue this point, where 1 is ambivalently and 10 is very passionately. When it comes to the scale of the impact, your stance is that " + (isBig ? bigMessage : smallMessage) + "The size intensity score you will be given will dictate the size of the impact in your argument, where 1 is a small impact, and 10 is a massive impact. Your response will reflect your stance on AI's positive or negative impact on society, as well as the size of that impact. Your response should have two parts: the first should be your primary argument in under 30 words, and the second part should be explainer text that supports the primary consequence in less than 30 words. Output the two parts of the response as a JSON object. The key of part 1 should be \"headline\" and the key of part 2 should be \"explainer\". Examples: {\"headline\": \"AI can cause emotional damage to young teens\",\"AI image generation can lead to increasing amounts of inappropriate photography\", \"explainer\": \"AI can lead to more seamless ways of communicating with one another\",\"AI can enable more seamless translation, allowing for unprecedented amounts of interlingual communication.\"}"
    

    // console.log(isPositive);
    // console.log(contentString);


    // Construct the OpenAI API request
    const messages = [
        { 'role': 'system', 'content': contentString },
        { 'role': 'user', 'content': `Statement: ${existingText}, social intensity: ${rating}, size intensity:${ratingY}` },
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

    const parsedText = JSON.parse(generatedText)
    const newHeadline = parsedText.headline
    const newExplanation = parsedText.explainer

    console.log('New Headline:', newHeadline);
    console.log('New Explanation:', newExplanation);

    const gridText = gridItem.querySelector('.grid-text');
    gridText.textContent = newHeadline;
    gridText.style.color = '#D375FF';

    const hoverText = gridItem.querySelector('.specialhover');
    hoverText.textContent = newExplanation;
    hoverText.style.color = '#D375FF';


}

/**
 * things to talk bout
 * 
 * Bugs:
 * - make the currently active image and text always zindex max so its above other images
 * - images are click and dragabble to save as assets which messes with ability to actually click and drag them, need to turn that off
 * - enable dragging a component twice, it snaps to starting point back right now 
 * - refactor js files for the new homepage somehow
 * - [p2] refactor the overall directory and make a readnme 
 */