let url = "https://rickandmortyapi.com/api/character";
const dataDiv = document.getElementById("Datadiv");
const LoaderPortal = document.querySelector(".loader-div");

const FetchData = async () => {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => MostrarData(data.results))
    .catch((err) => console.error(err));
};

const MostrarData = (ApiData) => {
  ApiData.forEach((character) => {
    const CharacterName = document.createElement("h1");
    CharacterName.textContent = character.name;

    const CharacterStatus = document.createElement("p");
    CharacterStatus.textContent = character.status;

    const CharacterBtn = document.createElement("button");
    CharacterBtn.textContent = "Ver mas..";
    CharacterBtn.setAttribute("id", character.id);

    const StatusColor = document.createElement("div");
    StatusColor.setAttribute("class", "CharStatus");

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
    CharacterStatus.appendChild(StatusColor);
    dataDiv.appendChild(CharacterBtn);
  });
};

FetchData();

dataDiv.addEventListener("click", async (e) => {
  let target = e.target.id;

  if (target != "" && target != "Datadiv") {
    console.log(e.target.id);
    console.log(typeof target);

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
