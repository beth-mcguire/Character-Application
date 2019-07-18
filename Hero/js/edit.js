const nameChar = document.querySelector("#name");
const traitsChar = document.querySelector("#traits");
const bioChar = document.querySelector("#bio");
const charId = location.hash.substring(1);
const dateEl = document.querySelector("#last-edited");
let characters = checkData();
let character = characters.find(function(char) {
  return char.id === charId;
});

if (character === undefined) {
  location.assign("index.html");
}

nameChar.value = character.name;
traitsChar.value = character.traits;
bioChar.value = character.bio;
dateEl.textContent = generateLastEdited(character.updatedAt);

nameChar.addEventListener("input", e => {
  character.name = e.target.value;
  character.updatedAt = moment().valueOf();
  dateEl.textContent = generateLastEdited(character.updatedAt);
  saveChars(characters);
});
traitsChar.addEventListener("input", e => {
  character.traits = e.target.value;
  character.updatedAt = moment().valueOf();
  dateEl.textContent = generateLastEdited(character.updatedAt);

  saveChars(characters);
});
bioChar.addEventListener("input", e => {
  character.bio = e.target.value;
  character.updatedAt = moment().valueOf();
  dateEl.textContent = generateLastEdited(character.updatedAt);
  saveChars(characters);
});

document.querySelector("#remove").addEventListener("click", e => {
  removeCharacter(character.id);
  saveChars(characters);
  location.assign("index.html");
});
