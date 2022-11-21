//Environment Variables.
let url = "https://rickandmortyapi.com/api/character";
let SearchText = document.querySelector(".SearchText");
let LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));
let PageCounter = 1;

const dataDiv = document.getElementById("Datadiv");
const LoaderPortal = document.querySelector(".loader-div");
const LenguageBtn = document.getElementById("changeLenguage_btn");
const SearchCharacterBtn = document.getElementById("SrchCharBtn");
const CharacterInput = document.getElementById("SearchCharacter");
const ReturnPageBtn = document.getElementById("RetuPagBtn");
const NextPageBtn = document.getElementById("NextPagBtn");
const PaginationsButtons = document.getElementById("PaginationsButtons");
const ResetSearchBtn = document.getElementById("ResetSearchBtn");

window.addEventListener("DOMContentLoaded", () => {
  ResetSearchBtn.style.display = "none";
  if (LenguagePrefference === null) {
    const Lenguage = {
      LenguagePreff: true,
      TextBtn: "ENG",
      SearchText: "Buscar personaje",
    };

    localStorage.setItem("Lenguage", JSON.stringify(Lenguage));

    LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));

    LenguageBtn.innerText = LenguagePrefference.TextBtn;
    SearchText.innerText = LenguagePrefference.SearchText;
  } else {
    LenguageBtn.innerText = LenguagePrefference.TextBtn;
    SearchText.innerText = LenguagePrefference.SearchText;
  }
});

const Translations_Status = {
  Alive: "Con vida",
  Dead: "Muerto",
  unknown: "Desaparecido",
};

const Translations_Gender = {
  Male: "Masculino",
  Female: "Femenino",
  unknown: "Desconocido",
};

const HideReturnBtn = () => {
  if (PageCounter === 1) {
    ReturnPageBtn.style.visibility = "hidden";
  } else {
    ReturnPageBtn.style.visibility = "visible";
  }
};

const FetchData = async (url) => {
  const LoadingDataDiv = document.createElement("div");
  const LoadingDataText = document.createElement("h1");

  LoadingDataDiv.appendChild(LoadingDataText);
  dataDiv.appendChild(LoadingDataDiv);
  
  await fetch(url)
    .then((res) => res.json())
    .then((data) => { 
  
    for (i = 1; i < data.results.length; i++) {
        const CharacterDiv = document.createElement("div");
        CharacterDiv.classList.add("character-card");
        CharacterDiv.classList.add("LoadingImg");

        dataDiv.appendChild(CharacterDiv);
      }
      MostrarData(data.results);
    })
    .catch((err) => {
      const NotFoundDiv = document.createElement("div");
      const NotFoundText = document.createElement("h1");

      if (
        !JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff === false
      ) {
        NotFoundText.innerText = "Personaje no encontrado :(";
      } else {
        NotFoundText.innerText = "Character not found :(";
      }
      NotFoundDiv.appendChild(NotFoundText);
      dataDiv.appendChild(NotFoundDiv);
      console.log(err);
    });

  SearchCharacterBtn.classList.add("StyledBtn");
  SearchCharacterBtn.classList.remove("DisabledBtn");
  LenguageBtn.classList.add("StyledBtn");
  LenguageBtn.classList.remove("DisabledBtn");

 return LoadingDataDiv.remove();

};

const MostrarData = (ApiData) => {
  if (ApiData === undefined) {
    NotFoundDiv.appendChild(NotFoundText);
    return dataDiv.appendChild(NotFoundDiv);
  } else {
    ApiData.forEach((character) => {
      //console.log(character)
      let LenguageValue = JSON.parse(
        localStorage.getItem("Lenguage")
      ).LenguagePreff;

      const CharacterDiv = document.createElement("div");
      CharacterDiv.classList.add("character-card");
      CharacterDiv.classList.add("LoadingImg");

      const CharacterImage = document.createElement("img");
      CharacterImage.src = character.image;
      CharacterImage.setAttribute("loading", "lazy");
      CharacterImage.setAttribute("title", "CharacterImage");
      CharacterImage.setAttribute("type", character.name + "_image");
      CharacterImage.classList.add("CharacterImage");

      const CharStatus = document.createElement('div')
      CharStatus.classList.add('statusbox')
      const StatusText = document.createElement('h1')
      
      switch(character.status){
        case 'Alive':
          CharStatus.classList.add('Alive')
        break;
        case 'Dead':
          CharStatus.classList.add('Dead')
        break;
        case 'unknown':
          CharStatus.classList.add('Unknown')
        break;
      }

      const CharInf = document.createElement("div");
      CharInf.classList.add("CharInf");

      const CharacterName = document.createElement("h1");
      CharacterName.textContent = character.name;

      const CharacterStatus = document.createElement("p");

      const CharacterBtn = document.createElement("button");
      CharacterBtn.setAttribute("id", character.id);
      CharacterBtn.classList.add("CharacterBtn");

      if (!LenguageValue === false) {
        CharacterBtn.textContent = "Ver más";

        //I personally will use switch statement but doesn't work too well with two conditions :(.
        if (character.status === "Alive" && character.gender === "Male") {
          StatusText.innerText = Translations_Status.Alive
          CharacterStatus.innerText = Translations_Gender.Male
        } else if (character.status === "Alive" && character.gender === "Female") {
          StatusText.innerText = Translations_Status.Alive
          CharacterStatus.innerText = Translations_Gender.Female
        } else if (character.status === "Dead" && character.gender === "Male") {
          StatusText.innerText = Translations_Status.Dead
          CharacterStatus.innerText = Translations_Gender.Male
        } else if (character.status === "Dead" && character.gender === "Female") {
          StatusText.innerText = Translations_Status.Dead
          CharacterStatus.innerText = Translations_Gender.Female
        } else if (character.status === "unknown" && character.gender === "Male") {
          StatusText.innerText = Translations_Status.unknown
          CharacterStatus.innerText = Translations_Gender.Male
        } else if (character.status === "unknown" && character.gender === "Female") {
          StatusText.innerText = Translations_Status.unknown
          CharacterStatus.innerText = Translations_Gender.Female
        } else if (character.status === "unknown" && character.gender === "unknown") {
          StatusText.innerText = Translations_Status.unknown
          CharacterStatus.innerText = Translations_Gender.unknown
        } else if (character.status === "Alive" && character.gender === "unknown") {
          StatusText.innerText = Translations_Status.Alive
          CharacterStatus.innerText = Translations_Gender.unknown
        } else if (character.status === "Dead" && character.gender === "unknown") {
          StatusText.innerText = Translations_Status.Dead
          CharacterStatus.innerText = Translations_Gender.unknown
        }
      } else {
        CharacterStatus.innerText = character.gender
        StatusText.innerText = character.status
        CharacterBtn.textContent = "Show more";
      }

      const StatusColor = document.createElement("div");
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

      CharacterDiv.appendChild(CharacterImage);
      CharStatus.appendChild(StatusText)
      CharacterDiv.appendChild(CharStatus)
      CharInf.appendChild(CharacterName);
      CharInf.appendChild(CharacterStatus);
      CharInf.appendChild(CharacterBtn);
      CharacterDiv.appendChild(CharInf);
      dataDiv.firstChild.remove();
      dataDiv.appendChild(CharacterDiv);
    });
  }
};

SearchCharacterBtn.addEventListener("click", () => {
  const filter = SearchCharacter.value.toLowerCase();

  if (filter.length != 0) {
    SearchCharacterBtn.classList.remove("StyledBtn");
    SearchCharacterBtn.classList.add("DisabledBtn");
    SearchCharacterBtn.setAttribute("disabled", "disabled");

    url = `https://rickandmortyapi.com/api/character/?name=${filter}`;
    PaginationsButtons.style.visibility = "hidden";
    ReturnPageBtn.style.visibility = "hidden";
    ResetSearchBtn.style.display = "block";

    dataDiv.innerHTML = "";
    SearchCharacterBtn.removeAttribute("disabled");
    return FetchData(url);
  }
});

ResetSearchBtn.addEventListener("click", () => {
  url = "https://rickandmortyapi.com/api/character";
  SearchCharacter.value = "";
  PaginationsButtons.style.visibility = "visible";
  ResetSearchBtn.style.display = "none";
  ReturnPageBtn.style.visibility = "hidden";
  dataDiv.innerHTML = "";
  return FetchData(url);
});

LenguageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let DataLenght = document.querySelectorAll('div.CharInf h1').length
  let value = JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff;

  if (!value) {
    const Lenguage = {
      LenguagePreff: true,
      TextBtn: "ENG",
      SearchText: "Buscar personaje",
    };

    localStorage.setItem("Lenguage", JSON.stringify(Lenguage));

    LenguageBtn.innerText = JSON.parse(localStorage.getItem("Lenguage")).TextBtn;

    SearchText.innerText = JSON.parse(localStorage.getItem("Lenguage")).SearchText;

    for(i = 0; i < DataLenght; i++){ 
      document.querySelectorAll('div.CharInf button')[i].textContent = 'Ver más'
    }

    for(i = 0; i < DataLenght; i++){
      switch(document.querySelectorAll('div.CharInf p')[i].textContent){
        case 'Male':
        document.querySelectorAll('div.CharInf p')[i].textContent = 'Masculino'
        break;
        case 'Female':
        document.querySelectorAll('div.CharInf p')[i].textContent = 'Femenino'
        break;
        case 'unknown':
        document.querySelectorAll('div.CharInf p')[i].textContent = 'Desconocido'
        break;
      }
    }


    for(i = 0; i < DataLenght; i++){
      switch(document.querySelectorAll('div.statusbox h1')[i].textContent){
        case 'Alive':
        document.querySelectorAll('div.statusbox h1')[i].textContent = 'Con vida'
        break;
        case 'Dead':
        document.querySelectorAll('div.statusbox h1')[i].textContent = 'Muerto'
        break;
        case 'unknown':
        document.querySelectorAll('div.statusbox h1')[i].textContent = 'Desaparecido'
        break;
      }
    }

  } else {
    const Lenguage = {
      LenguagePreff: false,
      TextBtn: "ESP",
      SearchText: "Search character",
    };

    localStorage.setItem("Lenguage", JSON.stringify(Lenguage));

    LenguageBtn.innerText = JSON.parse(localStorage.getItem("Lenguage")).TextBtn;

    SearchText.innerText = JSON.parse(localStorage.getItem("Lenguage")).SearchText;
    
    for(i = 0; i < DataLenght; i++){ 
      document.querySelectorAll('div.CharInf button')[i].textContent = 'Show more'
    }

    for(i = 0; i < DataLenght; i++){
      switch(document.querySelectorAll('div.statusbox h1')[i].textContent){
        case 'Con vida':
        document.querySelectorAll('div.statusbox h1')[i].textContent = 'Alive'
        break;
        case 'Muerto':
        document.querySelectorAll('div.statusbox h1')[i].textContent = 'Dead'
        break;
        case 'Desaparecido':
        document.querySelectorAll('div.statusbox h1')[i].textContent = 'unknown'
        break;
      }
    }

    for(i = 0; i < DataLenght; i++){
      switch(document.querySelectorAll('div.CharInf p')[i].textContent){
        case 'Masculino':
        document.querySelectorAll('div.CharInf p')[i].textContent = 'Male'
        break;
        case 'Femenino':
        document.querySelectorAll('div.CharInf p')[i].textContent = 'Female'
        break;
        case 'Desaparecido':
        document.querySelectorAll('div.CharInf p')[i].textContent = 'unknown'
        break;
      }
    }
  }
});

dataDiv.addEventListener("click", async (e) => {
  let target = e.target.id;

  if (target != "" && target != "Datadiv") {
    LoaderPortal.classList.remove("loading_off");
    document.body.style.overflow = "hidden";

    await fetch(`https://rickandmortyapi.com/api/character/${target}`)
      .then((res) => res.json())
      .then((data) =>
        localStorage.setItem("CharacterData", JSON.stringify(data))
      )
      .catch((err) => console.error(err));

    setTimeout(() => {
      LoaderPortal.classList.add("loading_off");
      document.body.style.overflow = "";
      return (location.href = `/character.html`);
    }, 1000);
  }
});

NextPageBtn.addEventListener("click", () => {
  PageCounter = PageCounter + 1;
  ReturnPageBtn.style.visibility = "visible";
  dataDiv.innerHTML = "";
  url = `https://rickandmortyapi.com/api/character?page=${PageCounter}`;
  return FetchData(url);
});

ReturnPageBtn.addEventListener("click", () => {
  if (PageCounter != 1) {
    PageCounter = PageCounter - 1;
    dataDiv.innerHTML = "";
    url = `https://rickandmortyapi.com/api/character?page=${PageCounter}`;
    FetchData(url);
    return HideReturnBtn();
  }
});

HideReturnBtn();
FetchData(url);
