// const API_KEY = "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"

// Variable to store the rating
let rating = 0;

// Drag functionality for .grid-item
gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach((gridItem) => {
  let isDragging = false;
  let startPositionX = 0;
  let currentPositionX = 0;

  gridItem.addEventListener('mousedown', handleDragStart);
  gridItem.addEventListener('mousemove', handleDrag);
  gridItem.addEventListener('mouseup', handleDragEnd);
  gridItem.addEventListener('mouseleave', handleDragEnd);

  function handleDragStart(event) {
    isDragging = true;
    startPositionX = event.clientX;
    currentPositionX = parseInt(gridItem.style.transform.split('(')[1]) || 0;
  }

  function handleDrag(event) {
    if (!isDragging) return;

    const dragOffsetX = event.clientX - startPositionX;
    const newPositionX = currentPositionX + dragOffsetX;

    // Update the position of the current .grid-item based on drag movement
    gridItem.style.transform = `translateX(${newPositionX}px)`;
    const windowWidth = window.innerWidth;

    // Calculate the rating based on the drag distance
    rating = Math.floor((dragOffsetX / windowWidth) * 10) + 3;
  }

  function handleDragEnd() {
    isDragging = false;
    // Use the rating variable as needed
    console.log('Rating:', rating);
    updateTextOnDrop(0, 0, gridItem);
  }

  // Example usage
  const initialPositionX = 0;
  gridItem.style.transform = `translateX(${initialPositionX}px)`;
});


async function updateTextOnDrop(positionX, positionY, gridItem) {
    console.log("running")


    // Get the existing text inside .grid-item
    const specialHoverText = gridItem.querySelector('.specialhover').textContent.trim();
    const grid_Text = gridItem.querySelector('.grid-text').textContent.trim();
    const existingText = specialHoverText + ' ' + grid_Text;

    // return;

    // Construct the OpenAI API request
    const messages = [
        { 'role': 'system', 'content': `You are a philosophy and sociology professor. You will be given a statement about the impact of AI on society, and a score from 1 to 10. The score will dictate how positively you interpret the statement, where 1 is someone who feels ambivalent about AI entirely, and 10 is someone who is an AI evangelist and really thinks it will save humanity. Your statement must stay relevant to the original statement/argument you are given. Your statement should come in format of ["X", "Y"], where X is a summary of your argument in less than 20 words and Y is a longer argument in less than 35 words. You should not tell me the score.`},
        { 'role': 'user', 'content': `Here is the first statement: ${existingText} and your score: ${rating}`},
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
        }),
    });

    // Extract the generated text from the API response (same as before)
    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    console.log(generatedText);
    console.log(rating);
    const parsed = JSON.parse(generatedText);
    console.log(parsed);
    const newHeadline = parsed[0];
    console.log(newHeadline);
    const newExplanation = parsed[1];

    // Update the text inside .grid-item (same as before)
    const gridText = gridItem.querySelector('.grid-text');
    gridText.textContent = newHeadline;

    const hoverText = gridItem.querySelector('.specialhover');
    hoverText.textContent = newExplanation;

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