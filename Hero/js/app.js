let characters = checkData();

const filters = {
  searchText: "",
  sortBy: "byEdited"
};

renderCharacters(characters, filters);

document.getElementById("filter").addEventListener("keyup", e => {
  filters.searchText = e.target.value;
  renderCharacters(characters, filters);
});

document.getElementById("filter-by").addEventListener("change", e => {
  filters.sortBy = e.target.value;
  renderCharacters(characters, filters);
});

document.getElementById("add").addEventListener("click", e => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  characters.push({
    id: id,
    name: "",
    traits: [],
    bio: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });
  saveChars();
  renderCharacters(characters, filters);

  location.assign(`edit.html#${id}`);
});
