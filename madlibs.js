/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

function parseStory(rawStory) {
  let arrayOfObjects = [];
  const story = rawStory.split(" "); // spliting story into an array of words
  console.log(story);
  for (let i = 0; i < story.length; i++) {
    // check if the word has n , v or a with regax
    if (story[i].match(/\[n\]/)) {
      // finding [n]
      arrayOfObjects.push({ word: story[i].replace("[n]", ""), pos: "noun" });
    } else if (story[i].match(/\[v\]/)) {
      // finding [v]
      arrayOfObjects.push({ word: story[i].replace("[v]", ""), pos: "verb" });
    } else if (story[i].match(/\[a\]/)) {
      // finding [a]
      arrayOfObjects.push({
        word: story[i].replace("[a]", ""),
        pos: "adjective",
      });
    } else {
      arrayOfObjects.push({ word: story[i] });
    }
  }
  return arrayOfObjects;
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    let textStory = "";
    let previewStory = "";

    console.log(processedStory);
    for (let i = 0; i < processedStory.length; i++) {
      if (processedStory[i].pos) {
        let span = document.createElement("span");
        span.setAttribute("id", i);

        span.innerText = "🔥🔥🔥🔥🔥🐉";

        let input = document.createElement("input");
        input.setAttribute("id", i);
        input.setAttribute("type", "text");

        input.setAttribute("placeholder", processedStory[i].pos);

        previewStory += span.outerHTML + " ";
        textStory += input.outerHTML + " ";
      } else {
        previewStory += processedStory[i].word + " ";
        textStory += processedStory[i].word + " ";
      }
    }
    document.querySelector(".madLibsEdit").innerHTML = textStory;
    document.querySelector(".madLibsPreview").innerHTML = previewStory;
  });

document.addEventListener("input", function (e) {
  let span = document.querySelector(`span[id='${e.target.id}']`);
  span.innerText = e.target.value;
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let nextIn = document.querySelector(`input[id='${e.target.id}']`);
    nextIn.nextElementSibling.focus();
  }
});

const button = document.createElement("button");
button.innerText = "Clear";
button.addEventListener("click", function (e) {
  e.preventDefault();
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  let spans = document.querySelectorAll(".madLibsPreview > span");
  for (let i = 0; i < spans.length; i++) {
    spans[i].innerText = "🔥🔥🔥🔥🔥🐉";
  }
});

document.querySelector('.container').appendChild(button);

button.addEventListener("click", function () {
  const video = document.createElement("video");
  //add class to video
  video.classList.add("video");
  video.src = "./assets/video.mp4";
  video.autoplay = true;
  //window scroll to top with animation
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  //delete body background image and make it black
  document.body.style.backgroundImage = "none";
  //add black-bg.png from assets file to body
  document.body.style.background = "url(./assets/black-bg.png)";

  //when video finish, reload the page
  video.addEventListener("ended", function () {
    location.reload();
  });
  //append video to body
  document.body.appendChild(video);
});

var sample = document.getElementById("got-music");
sample.play();