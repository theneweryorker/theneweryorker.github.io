// Function to update the text inside .grid-item based on the X-axis position
gridItems = document.querySelectorAll('.grid-item');

let rating = 0; 

gridItems.forEach((gridItem) => {

    gridItem.addEventListener('mousedown', handleDragStart);
    gridItem.addEventListener('mousemove', handleDrag);
    gridItem.addEventListener('mouseup', handleDragEnd);
    gridItem.addEventListener('mouseleave', handleDragEnd);

    let isDragging = false;
    let startPositionX = 0;
    let currentPositionX = 0;
    let isPositive = true;

    function handleDragStart(event) {
        console.log("start")
        isDragging = true;
        startPositionX = event.clientX;
        console.log(startPositionX);
        // currentPositionX = parseInt(gridItem.style.transform.split('(')[1]);
        // console.log(currentPositionX);
    }

    function handleDrag(event) {
        if (!isDragging) return;
        const dragOffsetX = event.clientX - startPositionX;
        const newPositionX = currentPositionX + dragOffsetX;
        console.log(dragOffsetX);

        if (dragOffsetX > 0) {
            isPositive = true;
          } else if (dragOffsetX < 0) {
            isPositive = false;
          } else {
            dragDirection = ''; // Reset the direction if there is no drag movement
          }

        // Update the position of the current .grid-item based on drag movement
        gridItem.style.transform = `translateX(${newPositionX}px)`;

        const windowWidth = window.innerWidth;
        rating = Math.floor((dragOffsetX / windowWidth) * 10) + 3;

    }

    function handleDragEnd(event) {
        if (!isDragging) return;
        console.log("end")
        console.log(rating);
        isDragging = false;
        updateTextOnDrop(0, 0, gridItem, isPositive);
    }

    const initialPositionX = 0;
    gridItem.style.transform = `translateX(${initialPositionX}px)`;
});   

async function updateTextOnDrop(positionX, positionY, gridItem, isPositive) {
    console.log("running")


    // Get the existing text inside .grid-item
    const specialHoverText = gridItem.querySelector('.specialhover').textContent.trim();
    const grid_Text = gridItem.querySelector('.grid-text').textContent.trim();
    const existingText = specialHoverText + ' ' + grid_Text;

    // return;

    positiveMessage = "You are a fervent supporter of AI, and believes that it can enhance human potential. You want to convince others of the positive potential of AI."
    
    negativeMessage = "You are a major skeptic of AI, who is confident that it will have detrimental effects for humans and society."
    

  
contentString = "You are a philosophy and sociology professor who is trying to come up with counterpoints to her students' arguments. You will be given a statement about the impact of AI on society, a score from 1 to 10, and a direction. The score will dictate how intensely you interpret the statement, where 1 is someone who feels ambivalently, and 10 is someone who feels very very passionately. Your statement must stay relevant to the original statement/argument you are given. Your statement should come in format of [\"X\",\"Y\"] where \"X\" is your argument — the consequence — in under 30 words, and \"Y\" is explainer text that supports it in less than 30 words." + ( isPositive ? positiveMessage : negativeMessage ) + "Examples: [\"AI can cause emotional damage to young teens\",\"AI image generation can lead to increasing amounts of inappropriate photography\"][\"AI can lead to more seamless ways of communicating with one another\",\"AI can enable more seamless translation, allowing for unprecedented amounts of interlingual communication.\"]"

console.log(isPositive);
console.log(contentString);


    // Construct the OpenAI API request
    const messages = [
        { 'role': 'system', 'content': contentString
        
        // `You are a philosophy and sociology professor who is trying to come up with counterpoints to her students' arguments. You will be given a statement about the impact of AI on society, a score from 1 to 10, and a direction. 


        // If the direction is "positive," you will argue a positive interpretation of the statement you are given. You will be pro-AI.
        // If the direction is "negative," you will argue the opposite of the statement you are given, that assumes that AI will threaten human livelihood and be dangerous.
        
        //  Example: if you are given a direction of "positive", a score of 1, and the statement: "AI might be bad for the economy," you might respond: ["AI can cause increasing labor instability","AI can lead to greater efficiencies in the workplace, leading to reduced workforces or layoffs"]. Conversely, if you are given that same direction (positive), and same statement, but a score of 10, you might respond more enthusiastically: ["AI efficiencies can unlock entirely new echelons of productivity, allowing humans more time and energy","AI can lead to new innovations which can spur the economy."] You should never tell me the numerical score.
        
        // Again, you MUST keep to the ["X","Y"] format. Both your argument and your explainer text must be in quotations, separated by a comma with no spaces. 

        // Examples: 
        
        // ["AI can cause emotional damage to young teens","AI image generation can lead to increasing amounts of inappropriate photography"]
        // ["AI can lead to more seamless ways of communicating with one another","AI can enable more seamless translation, allowing for unprecedented amounts of interlingual communication."]`
    
    },
        { 'role': 'user', 'content': `Statement: ${existingText}, score: ${rating}`},
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

    // Extract the generated text from the API response (same as before)
    // const data = await response.json();
    // const generatedText = data.choices[0].message.content;
    // console.log(generatedText);
    // const parsed = JSON.parse(generatedText);
    // console.log(parsed);
    // const newHeadline = parsed[0];
    // const newExplanation = parsed[1];
    // console.log(newExplanation);


    // // Update the text inside .grid-item (same as before)
    // const gridText = gridItem.querySelector('.grid-text');
    // gridText.textContent = newHeadline;

    // const hoverText = gridItem.querySelector('.specialhover');
    // hoverText.textContent = newExplanation;

    const data = await response.json();
const generatedText = data.choices[0].message.content;
console.log(generatedText);

// Regular expression patterns to match the expected formats
const pattern1 = /^\["([^"]+)",\s*"([^"]+)"\]$/; // Matches ["X", "Y"]
const pattern2 = /^\[([^"]+)\]\s*"([^"]+)"$/; // Matches [X] "Y"
const pattern3 = /^"([^"]+)"$/; // Matches "X"

let newHeadline = '';
let newExplanation = '';

// Attempt to match the patterns and extract the strings
const match1 = generatedText.match(pattern1);
const match2 = generatedText.match(pattern2);
const match3 = generatedText.match(pattern3);

if (match1) {
  newHeadline = match1[1];
  newExplanation = match1[2];
} else if (match2) {
  newHeadline = match2[1];
  newExplanation = match2[2];
} else if (match3) {
  newHeadline = match3[1];
  newExplanation = '';
}

console.log(rating);
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
 * TODOs:
 * - write a summary, and then onhover show the longer version pls
 * - take off the word statement
 * - can we add a button to reset
 * - adding intensity into the prompt
 * 
 * 
 * Thoughts:
 * - how a http request works
 * - organizing all yoru code
 * - temperature doesn't do what you think it does
 */