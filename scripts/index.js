//Environment Variables.
let url = "https://rickandmortyapi.com/api/character";
let SearchText = document.querySelector(".SearchText");
let LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));
let PageCounter = 1

const dataDiv = document.getElementById("Datadiv");
const LoaderPortal = document.querySelector(".loader-div");
const LenguageBtn = document.getElementById("changeLenguage_btn");
const SearchCharacterBtn = document.getElementById('SrchCharBtn')
const CharacterInput = document.getElementById("SearchCharacter");
const ReturnPageBtn = document.getElementById('RetuPagBtn')
const NextPageBtn = document.getElementById('NextPagBtn')
const PaginationsButtons = document.getElementById('PaginationsButtons')
const ResetSearchBtn = document.getElementById('ResetSearchBtn')

window.addEventListener("DOMContentLoaded", () => {
  ResetSearchBtn.style.display='none'
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
  if(PageCounter === 1){
    ReturnPageBtn.style.visibility = 'hidden'
  }else{
    ReturnPageBtn.style.visibility = 'visible'
  }
}

const FetchData = async (url) => {

  const LoadingDataDiv = document.createElement("div");
  const LoadingDataText = document.createElement("h1");
  
  if (localStorage.getItem('Lenguage') != null && JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff != false) {
    LoadingDataText.innerText = "Cargando Personajes...";
  } else {
    LoadingDataText.innerText = "Loading Characters...";
  }
  
  LoadingDataDiv.appendChild(LoadingDataText);
  dataDiv.appendChild(LoadingDataDiv);

  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      MostrarData(data.results)
    })
    .catch((err) => console.error(err));

    SearchCharacterBtn.classList.add('StyledBtn')
    SearchCharacterBtn.classList.remove('DisabledBtn')
    LenguageBtn.classList.add('StyledBtn')
    LenguageBtn.classList.remove('DisabledBtn')
    
    return LoadingDataDiv.remove()
};

const MostrarData = (ApiData) => {
  if (ApiData === undefined) {

    const NotFoundDiv = document.createElement("div");
    const NotFoundText = document.createElement("h1");

    if (!JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff === false) {
      NotFoundText.innerText = "Personaje no encontrado :(";
    } else {
      NotFoundText.innerText = "Character not found :(";
    }

    NotFoundDiv.appendChild(NotFoundText);
    return dataDiv.appendChild(NotFoundDiv);
  } else {
    ApiData.forEach((character) => {
     //console.log(character)
      let LenguageValue = JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff;

      const CharacterDiv = document.createElement("div");
      CharacterDiv.classList.add("character-card");
      CharacterDiv.classList.add("LoadingImg");

      const CharacterImage = document.createElement("img");
      CharacterImage.src = character.image

      CharacterImage.setAttribute("title", "CharacterImage");
      CharacterImage.setAttribute("type", character.name + "_image");
      CharacterImage.classList.add("CharacterImage");

      const CharInf = document.createElement('div')
      CharInf.classList.add('CharInf')

      const CharacterName = document.createElement("h1");
      CharacterName.textContent = character.name;

      const CharacterStatus = document.createElement("p");
      CharacterStatus.setAttribute("style", "display: flex; line-height: 1.2rem;");

      const CharacterBtn = document.createElement("button");
      CharacterBtn.setAttribute("id", character.id);
      CharacterBtn.classList.add('CharacterBtn')

      if (!LenguageValue === false) {
        CharacterBtn.textContent = "Ver más";

        //I personally will use switch statement but doesn't work too well with two conditions :(.
        if(character.status === 'Alive' && character.gender === 'Male'){
          CharacterStatus.innerText = Translations_Gender.Male +  " - " + Translations_Status.Alive 
        }else if (character.status === 'Alive' && character.gender === 'Female'){
          CharacterStatus.innerText = Translations_Gender.Female + " - " + Translations_Status.Alive 
        }else if (character.status === 'Dead' && character.gender === 'Male'){
          CharacterStatus.innerText = Translations_Gender.Male + " - "  + Translations_Status.Dead
        }else if (character.status === 'Dead' && character.gender === 'Female'){
          CharacterStatus.innerText = Translations_Gender.Female + " - " +  Translations_Status.Dead 
        }else if (character.status === 'unknown' && character.gender === 'Male'){
          CharacterStatus.innerText = Translations_Gender.Male + " - " + Translations_Status.unknown 
        }else if (character.status === 'unknown' && character.gender === 'Female'){
          CharacterStatus.innerText = Translations_Gender.Female + " - "  + Translations_Status.unknown
        }else if (character.status === 'unknown' && character.gender === 'unknown'){
          CharacterStatus.innerText = Translations_Gender.unknown + " - " + Translations_Status.unknown 
        }else if (character.status === 'Alive' && character.gender === 'unknown'){
          CharacterStatus.innerText = Translations_Gender.unknown + " - " + Translations_Status.Alive 
        }else if (character.status === 'Dead' && character.gender === 'unknown'){
          CharacterStatus.innerText = Translations_Gender.unknown + " - " + Translations_Status.Dead 
        }

      } else {
        CharacterStatus.innerText = character.gender + " - " + character.status
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
      CharInf.appendChild(CharacterName);
      CharInf.appendChild(CharacterStatus);
      CharacterStatus.appendChild(StatusColor);
      CharInf.appendChild(CharacterBtn);
      CharacterDiv.appendChild(CharInf)
      dataDiv.appendChild(CharacterDiv);
    });
  }
};

SearchCharacterBtn.addEventListener("click", () => {
  const filter = SearchCharacter.value.toLowerCase();

  if (filter.length != 0) {
    SearchCharacterBtn.classList.remove('StyledBtn')
    SearchCharacterBtn.classList.add('DisabledBtn')
    SearchCharacterBtn.setAttribute('disabled','disabled')

    url = `https://rickandmortyapi.com/api/character/?name=${filter}`;
    PaginationsButtons.style.visibility='hidden'
    ReturnPageBtn.style.visibility= 'hidden'
    ResetSearchBtn.style.display='block'

    dataDiv.innerHTML = "";
    SearchCharacterBtn.removeAttribute('disabled')
    return FetchData(url)
  }
});

ResetSearchBtn.addEventListener('click', () => {
  url = 'https://rickandmortyapi.com/api/character'
  SearchCharacter.value = ''
  PaginationsButtons.style.visibility='visible'
  ResetSearchBtn.style.display='none'
  ReturnPageBtn.style.visibility= 'hidden'
  dataDiv.innerHTML = "";
  return FetchData(url);
})

LenguageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let value = JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff;

  if (!value) {
    const Lenguage = {
      LenguagePreff: true,
      TextBtn: "ENG",
      SearchText: "Buscar personaje",
    };

    localStorage.setItem("Lenguage", JSON.stringify(Lenguage));

    LenguageBtn.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).TextBtn;

    SearchText.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).SearchText;
  } else {
    const Lenguage = {
      LenguagePreff: false,
      TextBtn: "ESP",
      SearchText: "Search character",
    };

    localStorage.setItem("Lenguage", JSON.stringify(Lenguage));

    LenguageBtn.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).TextBtn;

    SearchText.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).SearchText;
  }
  
  LenguageBtn.classList.remove('StyledBtn')
  LenguageBtn.classList.add('DisabledBtn')
  dataDiv.innerHTML = "";
  return FetchData(url);
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
      return location.href = `/character.html`;
    }, 1000);

  }
});

NextPageBtn.addEventListener('click', () => {
  PageCounter = PageCounter + 1
  ReturnPageBtn.style.visibility = 'visible'
  dataDiv.innerHTML = "";
  url = `https://rickandmortyapi.com/api/character?page=${PageCounter}`
  return FetchData(url)
})

ReturnPageBtn.addEventListener('click', () => {
  if(PageCounter != 1){
    PageCounter = PageCounter - 1
    dataDiv.innerHTML = "";
    url = `https://rickandmortyapi.com/api/character?page=${PageCounter}`
    FetchData(url)
    return HideReturnBtn()
  }
})

HideReturnBtn()
FetchData(url);