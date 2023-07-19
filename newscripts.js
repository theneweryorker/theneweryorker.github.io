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
        gridItem.style.position = 'absolute';
        gridItem.style.zIndex = 100;

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
        gridItem.style.zIndex = 'auto';
        gridItem.style.position = '';
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

    negativeMessage = "You believe AI will take over the world, at the cost of human happiness or quality of life. You are confident that it will have detrimental effects for humans and society."



    contentString = "You are a philosophy and sociology professor who is trying to come up with counterpoints to her students' arguments. You will be given a statement about the impact of AI on society, a score from 1 to 10, and a direction. The score will dictate how intensely you interpret the statement, where 1 is someone who feels ambivalently, and 10 is someone who feels very very passionately. Your statement must stay relevant to the original statement/argument you are given. Your response should have two parts: the first should be your primary argument — the consequence — in under 30 words, and the second part should be explainer text that supports the primary consequence in less than 30 words. Output the two parts of the response as a JSON object. The key of part 1 should be \"headline\" and the key of part 2 should be \"explainer\"" + (isPositive ? positiveMessage : negativeMessage) + "Examples: {\"headline\": \"AI can cause emotional damage to young teens\",\"AI image generation can lead to increasing amounts of inappropriate photography\", \"explainer\": \"AI can lead to more seamless ways of communicating with one another\",\"AI can enable more seamless translation, allowing for unprecedented amounts of interlingual communication.\"}"

    console.log(isPositive);
    console.log(contentString);


    // Construct the OpenAI API request
    const messages = [
        { 'role': 'system', 'content': contentString },
        { 'role': 'user', 'content': `Statement: ${existingText}, score: ${rating}` },
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

    const parsedText = JSON.parse(generatedText)
    const newHeadline = parsedText.headline
    const newExplanation = parsedText.explainer

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