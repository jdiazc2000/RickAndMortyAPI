//Environment Variables.
let url = "https://rickandmortyapi.com/api/character";
let filterurl = "";
const dataDiv = document.getElementById("Datadiv");
const LoaderPortal = document.querySelector(".loader-div");
const SearchForm = document.getElementById('SearchForm')
const LenguageBtn = document.getElementById("changeLenguage_btn");
const CharacterInput = document.getElementById("SearchCharacter");

const Translations_Status = {
  Alive: "Con vida",
  Dead: "Muerto",
  unknown: "Desaparecido",
};

const Translations_Gender = {
  Male: "Masculino",
  Female: "Femenino",
};

let SearchText = document.querySelector(".SearchText");
let LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));

window.addEventListener("DOMContentLoaded", () => {
  if (LenguagePrefference === null) {
    const Lenguage = {
      LenguagePreff: true,
      TextBtn: "ENG",
      SearchText: "Search character",
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

const FetchData = async (url) => {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => MostrarData(data.results))
    .catch((err) => console.error(err));
};

//Fetch all the data when the page loads
FetchData(url);

const MostrarData = (ApiData) => {
  if (ApiData === undefined) {
    console.log("ERROR");

    const NotFoundDiv = document.createElement("div");
    const NotFoundText = document.createElement("h1");

    if (!JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff === false) {
      NotFoundText.innerText = "Personaje no encontrado";
    } else {
      NotFoundText.innerText = "Character not found";
    }

    NotFoundDiv.appendChild(NotFoundText);
    dataDiv.appendChild(NotFoundDiv);
  } else {
    ApiData.forEach((character) => {
      //console.log(character)
      let LenguageValue = JSON.parse(
        localStorage.getItem("Lenguage")
      ).LenguagePreff;

      const CharacterDiv = document.createElement("div");
      CharacterDiv.classList.add("CharacterDiv");

      const CharacterImage = document.createElement("img");
      CharacterImage.src = character.image;
      CharacterImage.setAttribute("loading", "lazy");
      CharacterImage.setAttribute("title", "CharacterImage");
      CharacterImage.setAttribute("type", character.name + "_image");
      CharacterImage.classList.add("CharacterImage");

      const CharacterName = document.createElement("h1");
      CharacterName.textContent = character.name;

      const CharacterStatus = document.createElement("p");

      const CharacterBtn = document.createElement("button");
      CharacterBtn.setAttribute("id", character.id);

      const CharacterGender = document.createElement("p");

      if (!LenguageValue === false) {
        CharacterBtn.textContent = "Ver más";

        switch (character.status && character.gender) {
          case ("Alive", "Male"):
            CharacterStatus.innerText =
              Translations_Status.Alive + " - " + Translations_Gender.Male;
            break;
          case "Dead":
            CharacterStatus.innerText = Translations_Status.Dead;
            break;
          case "unknown":
            CharacterStatus.innerText = Translations_Status.unknown;
            break;
        }
      } else {
        CharacterStatus.innerText = character.status + " - " + character.gender;
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
      CharacterDiv.appendChild(CharacterName);
      CharacterDiv.appendChild(CharacterStatus);
      CharacterStatus.appendChild(StatusColor);
      CharacterDiv.appendChild(CharacterStatus);
      CharacterDiv.appendChild(CharacterGender);
      CharacterDiv.appendChild(CharacterBtn);
      dataDiv.appendChild(CharacterDiv);
    });
  }
};

SearchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const filter = SearchCharacter.value.toLowerCase();

  if (filter.length === 0) {
    filterurl = "https://rickandmortyapi.com/api/character";
  } else {
    filterurl = `https://rickandmortyapi.com/api/character/?name=${filter}`;
  }

  dataDiv.innerHTML = "";
  FetchData(filterurl);
});

LenguageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let value = JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff;

  if (!value) {
    const Lenguage = {
      LenguagePreff: true,
      TextBtn: "ENG",
      SearchText: "Search character",
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
      SearchText: "Buscar personaje",
    };

    localStorage.setItem("Lenguage", JSON.stringify(Lenguage));

    LenguageBtn.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).TextBtn;

    SearchText.innerText = JSON.parse(
      localStorage.getItem("Lenguage")
    ).SearchText;
  }

  dataDiv.innerHTML = "";

  if (filterurl.length === 0) {
    return FetchData(url);
  } else {
    return FetchData(filterurl);
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

    console.log(localStorage.getItem("CharacterData"));

    setTimeout(() => {
      LoaderPortal.classList.add("loading_off");
      document.body.style.overflow = "";
      location.href = `/character.html`;
    }, 1000);
  }
});
