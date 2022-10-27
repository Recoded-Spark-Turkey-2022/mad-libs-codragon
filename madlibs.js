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
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
/* getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    editFunction(processedStory);
    previewFunction();
    hotkeyFunction();
  });
 */

function parseStory(rawStory) {
  let arrayOfObjects = [];
  const result = rawStory.split(" ");
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    if (/\[n\]/.test(result[i]) === true) {
      arrayOfObjects.push({ word: result[i].replace("[n]", ""), pos: "noun" });
    } else if (/\[v\]/.test(result[i]) === true) {
      arrayOfObjects.push({ word: result[i].replace("[v]", ""), pos: "verb" });
    } else if (/\[a\]/.test(result[i]) === true) {
      arrayOfObjects.push({
        word: result[i].replace("[a]", ""),
        pos: "adjective",
      });
    } else {
      arrayOfObjects.push({ word: result[i] });
    }
  }

  return arrayOfObjects;
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    storyFuntion(processedStory);
  });
function storyFuntion(Array) {
  const editSection = document.querySelector(".madLibsEdit");
  const PreviewSection = document.querySelector(".madLibsPreview");
  let counter = 0;
  for (let i = 0; i < Array.length; i++) {
    if (Array[i].pos != null) {
      const EditInput = `<input type="text" placeholder="${Array[i].pos}" class="EditInput" tabIndex="${counter}" maxlength="20">`;

      counter = counter + 1;
      const PreviewInput = `<input type="text" class="PreviewInput" disabled maxlength="20">`;
      editSection.innerHTML = editSection.innerHTML + " " + EditInput;
      PreviewSection.innerHTML = PreviewSection.innerHTML + " " + PreviewInput;
    } else {
      editSection.innerHTML = editSection.innerHTML + " " + Array[i].word;
      PreviewSection.innerHTML = PreviewSection.innerHTML + " " + Array[i].word;
    }
  }
  let BlankInputs = document.querySelectorAll(".EditInput");
  let ViewInputs = document.querySelectorAll(".PreviewInput");
  for (let i = 0; i < BlankInputs.length; i++) {
    BlankInputs[i].addEventListener("input", function () {
      ViewInputs[i].value = BlankInputs[i].value;
    });

    BlankInputs[i].addEventListener("keypress", function (e) {
      if (e.keyCode == 13) {
        let nextInput = document.querySelectorAll(
          '[tabIndex="' + (this.tabIndex + 1) + '"]'
        );
        nextInput[0].focus();
      }
    });
  }
}
