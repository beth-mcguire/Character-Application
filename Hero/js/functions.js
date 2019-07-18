const checkData = function() {
  const charJSON = localStorage.getItem("char");
  if (charJSON !== null) {
    return JSON.parse(charJSON);
  } else {
    return [];
  }
};

const saveChars = function(char) {
  localStorage.setItem("char", JSON.stringify(characters));
};

const removeCharacter = function(id) {
  const findChar = characters.findIndex(function(char) {
    return char.id === id;
  });

  if (findChar > -1) {
    characters.splice(findChar, 1);
  }
};

const createChar = function(char) {
  const charEl = document.createElement("div");
  const textEl = document.createElement("div");
  const editBtn = document.createElement("button");
  const newBtn = document.createElement("button");
  charEl.classList.add("pDiv");
  editBtn.classList.add("newBtn");

  newBtn.classList.add("newBtn");
  newBtn.textContent = "X";

  editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
  charEl.appendChild(editBtn);

  newBtn.addEventListener("click", e => {
    removeCharacter(char.id);
    renderCharacters(characters, filters);
    saveChars();
  });

  editBtn.addEventListener("click", e => {
    location.assign(`edit.html#${char.id}`);
  });
  charEl.appendChild(newBtn);

  if (char.name.length > 0) {
    textEl.innerHTML = `<p><span>Name:</span> ${
      char.name
    }</p> <p><span>Traits:</span> ${
      char.traits
    }</p> <p><span>Biography:</span> ${char.bio}</p>`;
  } else {
    textEl.textContent = "Unnamed Character";
  }
  charEl.appendChild(textEl);
  return charEl;
};

// Sort Characters

const sortCharacters = function(characters, sortBy) {
  if (sortBy === "byEdited") {
    return characters.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "created") {
    return characters.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alph") {
    return characters.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return characters;
  }
};

// Render Characters

const renderCharacters = function(characters, filters) {
  characters = sortCharacters(characters, filters.sortBy);
  const filteredChars = characters.filter(char => {
    return char.name.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#div").innerHTML = "";
  filteredChars.forEach(char => {
    document.querySelector("#div").appendChild(createChar(char));
  });
};

// Generate last edited message

const generateLastEdited = function(timestamp) {
  return `Last edited: ${moment(timestamp).fromNow()}`;
};
