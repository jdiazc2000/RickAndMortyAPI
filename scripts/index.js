const url = "https://rickandmortyapi.com/api/character";
const dataDiv = document.getElementById("Datadiv");
const LoaderPortal = document.querySelector(".loader-div");
const LenguageBtn = document.getElementById("changeLenguage_btn");

let LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));

if (LenguagePrefference === null) {
  const Lenguage = {
    LenguagePreff: true,
    TextBtn: "ENG",
  };

  let Lenguage_ENG = Lenguage;
  localStorage.setItem("Lenguage", JSON.stringify(Lenguage_ENG));

  LenguagePrefference = JSON.parse(localStorage.getItem("Lenguage"));
} else {
  //console.log("LENGUAGEPREFFERENCE VARIABLE HAVE NOW A VALUE :)");
}

LenguageBtn.innerText = JSON.parse(localStorage.getItem("Lenguage")).TextBtn;

const FetchData = async () => {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => MostrarData(data.results))
    .catch((err) => console.error(err));
};

LenguageBtn.addEventListener("click", (e) => {
  //e.preventDefault();
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

    return location.href = `index.html`;
  } else {
    const Lenguage = {
      LenguagePreff: false,
      TextBtn: "ESP",
    };

    let Lenguage_ESP = Lenguage;
    localStorage.setItem("Lenguage", JSON.stringify(Lenguage_ESP));

    let NEWTEXTBTN = JSON.parse(localStorage.getItem("Lenguage")).TextBtn;
    LenguageBtn.innerText = NEWTEXTBTN;

    return location.href = `index.html`;
  }
});

const MostrarData = (ApiData) => {
  const Translations_Status = {
    Alive: "Con vida",
    Dead: "Muerto",
    unknown: "Desaparecido",
  };

  const Translations_Gender = {

  }

  ApiData.forEach((character) => {
    console.log(character)
    const CharacterName = document.createElement("h1");
    CharacterName.textContent = character.name;

    const StatusDiv = document.createElement("div");
    StatusDiv.classList.add("CharStatusDiv");

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
      CharacterStatus.innerText = "Status: " + character.status;
    }

    const StatusColor = document.createElement("div");
    StatusDiv.classList.add("CharStatus");

    const CharacterBtn = document.createElement("button");
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
      CharacterStatus.innerText = "Status: " + character.status;
    }

    if (!JSON.parse(localStorage.getItem("Lenguage")).LenguagePreff === false) {
      CharacterBtn.textContent = "Ver más";
    } else {
      CharacterBtn.textContent = "Show more";
    }
    CharacterBtn.setAttribute("id", character.id);

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

    dataDiv.appendChild(CharacterName);
    dataDiv.appendChild(CharacterStatus);
    StatusDiv.appendChild(CharacterStatus);
    StatusDiv.appendChild(StatusColor);
    dataDiv.appendChild(StatusDiv);
    dataDiv.appendChild(CharacterBtn);
  });
};

dataDiv.addEventListener("click", async (e) => {
  let target = e.target.id;

  if (target != "" && target != "Datadiv") {
    LoaderPortal.classList.remove("loading_off");

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

FetchData();
