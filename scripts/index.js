//Environment Values.
const url = "https://rickandmortyapi.com/api/character";
const dataDiv = document.getElementById("Datadiv");
const LoaderPortal = document.querySelector(".loader-div");
const LenguageBtn = document.getElementById("changeLenguage_btn");
const CharacterInput = document.getElementById("SearchCharacter");

//This var gets the Lenguage Data from LocalStorage.
let LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));

//When the page is open for the first time, this function creates the localstorage item and set the data,
//the first lenguage in the page is Spanish and print the ENG text on Lenguage change button.
window.addEventListener("DOMContentLoaded", () => {
  if (LenguagePrefference === null) {
    const Lenguage = {
      LenguagePreff: true,
      TextBtn: "ENG",
    };

    let Lenguage_ENG = Lenguage;
    localStorage.setItem("Lenguage", JSON.stringify(Lenguage_ENG));

    LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));
    LenguageBtn.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).TextBtn;
  } else {
    LenguageBtn.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).TextBtn;
  }
});

//Function who gets the data from the Rick And Morty API.
const FetchData = async () => {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => MostrarData(data.results))
    .catch((err) => console.error(err));
};

//Function who change the data inside the localstorage item "Lenguage",
//who leads the lenguage selected from the user and this changes when the user click it (False = ESP, True = ENG).
LenguageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let value = JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff;

  if (!value) {
    const Lenguage = {
      LenguagePreff: true,
      TextBtn: "ENG",
    };

    let Lenguage_ENG = Lenguage;
    localStorage.setItem("Lenguage", JSON.stringify(Lenguage_ENG));

    let NEWTEXTBTN = JSON.parse(localStorage.getItem("Lenguage")).TextBtn;
    LenguageBtn.innerText = NEWTEXTBTN;
  } else {
    const Lenguage = {
      LenguagePreff: false,
      TextBtn: "ESP",
    };

    let Lenguage_ESP = Lenguage;
    localStorage.setItem("Lenguage", JSON.stringify(Lenguage_ESP));

    let NEWTEXTBTN = JSON.parse(localStorage.getItem("Lenguage")).TextBtn;
    LenguageBtn.innerText = NEWTEXTBTN;
  }

  //This part cleans al the data from the div and pastes it again with the lenguage changed.
  dataDiv.innerHTML = "";
  FetchData();
});

//This function print the data inside the HTML,
//THIS FUNC have two "Dictionaries" who leads how the text is translated depending on the Lenguage prefference who changes the user (ENG or ESP).
const MostrarData = (ApiData) => {
  //Dictionary for Status.
  const Translations_Status = {
    Alive: "Con vida",
    Dead: "Muerto",
    unknown: "Desaparecido",
  };

  //Dictionary for Gender.
  const Translations_Gender = {
    Male: "Masculino",
    Female: "Femenino",
  };

  //Every time the page gets data for one character, runs the loop and prints the character data inside the page.
  ApiData.forEach((character) => {
    //console.log(character)

    //Create the Div who contains all the character data and adds the CharacterDiv class.
    const CharacterDiv = document.createElement("div");
    CharacterDiv.classList.add("CharacterDiv");

    //Create the image from the character, adds the Lazy loading attribute for more perfomance on the page,
    //in img type adds the name from the character + "_image" and adds the CharacterImage class.
    const CharacterImage = document.createElement("img");
    CharacterImage.src = character.image;
    CharacterImage.setAttribute("loading", "lazy");
    CharacterImage.setAttribute("type", character.name + "_image");
    CharacterImage.classList.add("CharacterImage");

    //Create the h1 node and adds the character name inside.
    const CharacterName = document.createElement("h1");
    CharacterName.textContent = character.name;

    //Create the status div for the character and adds the "CharStatusDiv" class.
    const StatusDiv = document.createElement("div");
    StatusDiv.classList.add("CharStatusDiv");

    //Create the p node and pastes inside the Status of this character,
    //if the lenguage preff is ESP this function uses the dictinary to change the respective text for the version in spanish.
    const CharacterStatus = document.createElement("p");
    if (!JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff === false) {
      switch (character.status) {
        case "Alive":
          CharacterStatus.innerText = "Estado: " + Translations_Status.Alive;
          break;
        case "Dead":
          CharacterStatus.innerText = "Estado: " + Translations_Status.Dead;
          break;
        case "unknown":
          CharacterStatus.innerText = "Estado: " + Translations_Status.unknown;
          break;
      }
    } else {
      //if the lenguage preff is ENG, just print the status in english.
      CharacterStatus.innerText = "Status: " + character.status;
    }

    //Change the Show more button text for the version in spanish deppending on the lenguage prefference, and adds the id of the character to the button.
    const CharacterBtn = document.createElement("button");
    CharacterBtn.setAttribute("id", character.id);
    if (!JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff === false) {
      CharacterBtn.textContent = "Ver más";
    } else {
      CharacterBtn.textContent = "Show more";
    }

    //Create the div node, and paste de gender of the character inside using the node p,
    //if the lenguage preff is ESP this function uses the dictinary to change the respective text for the version in spanish.
    const GenderDiv = document.createElement("div");
    const CharacterGender = document.createElement("p");
    if (!JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff === false) {
      switch (character.gender) {
        case "Male":
          CharacterGender.innerText = "Género: " + Translations_Gender.Male;
          break;
        case "Female":
          CharacterGender.innerText = "Género: " + Translations_Gender.Female;
          break;
      }
    } else {
      //if the lenguage preff is ENG, just print the gender in english.
      CharacterGender.textContent = "Gender: " + character.gender;
    }

    //This function adds the Status of the character color inside a Div, and depending on the status of the character this adds the class who contains the status style.
    const StatusColor = document.createElement("div");
    StatusDiv.classList.add("CharStatus");
    switch (character.status) {
      case "Alive":
        StatusColor.classList.add("CharStatus_green");
        break;
      case "Dead":
        StatusColor.classList.add("CharStatus_red");
        break;
      case "unknown":
        StatusColor.classList.add("CharStatus_grey");
        break;
    }

    //This statements puts the data inside of the correspondients divs and positions.
    CharacterDiv.appendChild(CharacterImage);
    CharacterDiv.appendChild(CharacterName);
    CharacterDiv.appendChild(CharacterStatus);
    StatusDiv.appendChild(CharacterStatus);
    StatusDiv.appendChild(StatusColor);
    CharacterDiv.appendChild(StatusDiv);
    GenderDiv.appendChild(CharacterGender);
    CharacterDiv.appendChild(GenderDiv);
    CharacterDiv.appendChild(CharacterBtn);
    dataDiv.appendChild(CharacterDiv);
  });
};

/* Search character function 😁*/
CharacterInput.addEventListener("keyup", () => {
  const filter = CharacterInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.CharacterDiv')

  listItems.forEach((item) => {
    let text = item.textContent
    if(text.toLowerCase().includes(filter.toLowerCase())){
      item.style.display = '';
    }else{
      item.style.display = 'none'
    }
  })
});

//Depending on the id of the button, loads the character data using a fetch for search the chracter data and save it inside the local storage,
//this function send you to the "character" page and use the local storage for load the data inside the characters page.
dataDiv.addEventListener("click", async (e) => {
  let target = e.target.id;

  if (target != "" && target != "Datadiv") {
    LoaderPortal.classList.remove("loading_off");
    document.body.style.overflow = 'hidden'

    await fetch(`https://rickandmortyapi.com/api/character/${target}`)
      .then((res) => res.json())
      .then((data) =>
        localStorage.setItem("CharacterData", JSON.stringify(data))
      )
      .catch((err) => console.error(err));

    console.log(localStorage.getItem("CharacterData"));

    setTimeout(() => {
      LoaderPortal.classList.add("loading_off");
      location.href = `/character.html`;
    }, 1000);
  }
});

//Fetch all the data when the page loads
FetchData();
