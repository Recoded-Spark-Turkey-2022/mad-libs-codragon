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

        let input = document.createElement("input");
        input.setAttribute("id", i);
        input.setAttribute("type", "text");
        input.setAttribute("type", "text");

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

const button = document.createElement("button");
button.innerText = "Clear";
button.addEventListener("click", function () {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document.querySelectorAll("span").forEach((span) => {
    span.innerText = "";
  });
});
document.body.appendChild(button);
