let CharacterSelected = JSON.parse(localStorage.getItem("CharacterData"));

const LenguageValue = JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff
//False = English
//True = Spanish

const MainDiv = document.getElementById("charDiv");
const LoaderPortal = document.querySelector(".loader-div");

setTimeout(() => {
  LoaderPortal.classList.add("loading_off");
}, 1000);

if (CharacterSelected != null) {
  let CharGender = CharacterSelected.gender;
  let CharStatus = CharacterSelected.status;
  let CharSpecie = CharacterSelected.species;
  let CharOrigin = CharacterSelected.origin.name;

  const Translations_Gender = {
    Male: "Masculino",
    Female: "Femenino",
    unknown: "Desconocido",
  };

  const Translations_Status = {
    Alive: "Con vida",
    Dead: "Muerto/a",
    unknown: "Desaparecido",
  };

  const Translations_Specie = {
    Human: "Humano",
    Alien: "Alien",
    unknown: "Desconocido",
  };

  switch (CharGender) {
    case "Male":
      CharGender = Translations_Gender.Male;
      break;
    case "Female":
      CharGender = Translations_Gender.Female;
      break;
    case "unknown":
      CharGender = Translations_Gender.unknown;
      break;
  }

  switch (CharStatus) {
    case "Alive":
      CharStatus = Translations_Status.Alive;
      break;
    case "Dead":
      CharStatus = Translations_Status.Dead;
      break;
    case "unknown":
      CharStatus = Translations_Status.unknown;
      break;
  }

  switch (CharSpecie) {
    case "Human":
      CharSpecie = Translations_Specie.Human;
      break;
    case "Alien":
      CharSpecie = Translations_Specie.Alive;
      break;
    case "unknown":
      CharSpecie = Translations_Specie.unknown;
      break;
  }

  switch(CharOrigin){
    case "unknown":
    CharOrigin = 'Desconocido'
    break;
  }

  if (LenguageValue) {
    MainDiv.innerHTML += `
    <div id="CharacterData">
    <img src="${CharacterSelected.image}" title="CharImg">
    <div class="CharacterInfo">
    <h1>${CharacterSelected.name}</h1>
    <p>${"Género: " + CharGender}</p>
    <p>${"Estado: " + CharStatus}</p>
    <p>${"Origen: " + CharOrigin}</p>
    <p>${"Especie: " + CharSpecie}</p>
    <p>${"Locación: " + CharacterSelected.location.name}</p>
    <button id="returnBtn" title="returnHomePage"><i class="fa-solid fa-person-walking-arrow-loop-left"></i></button>
    </div>
    </div>
`;
  } else {
    MainDiv.innerHTML += `
    <div id="CharacterData">
    <img src="${CharacterSelected.image}" title="CharImg">
    <div class="CharacterInfo">
    <h1>${CharacterSelected.name}</h1>
    <p>${"Gender: " + CharacterSelected.gender}</p>
    <p>${"Status: " + CharacterSelected.status}</p>
    <p>${"Origin: " + CharacterSelected.origin.name}</p>
    <p>${"Specie: " + CharacterSelected.species}</p>
    <p>${"Location: " + CharacterSelected.location.name}</p>
    <button id="returnBtn" title="returnHomePage"><i class="fa-solid fa-person-walking-arrow-loop-left"></i></button>
    </div>
    </div>
`;
  }
} else {
  location.href = `index.html`;
}

document.getElementById("returnBtn").addEventListener("click", () => {
  location.href = `index.html`;
});
