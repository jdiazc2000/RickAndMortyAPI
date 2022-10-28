let url = "https://rickandmortyapi.com/api/character";
const dataDiv = document.body

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

    const CharacterBtn = document.createElement('button')
    CharacterBtn.textContent = 'Ver mas..';
    CharacterBtn.setAttribute('id', character.id)

    dataDiv.appendChild(CharacterName);
    dataDiv.appendChild(CharacterStatus);
    dataDiv.appendChild(CharacterBtn)
  });
};

FetchData();

dataDiv.addEventListener('click', async(e) => {
    let target = e.target.id

    if(target != ''){
        console.log(e.target.id)

    await fetch(`https://rickandmortyapi.com/api/character/${target}`)
        .then((res) => res.json())
        .then((data) => localStorage.setItem('CharacterData',JSON.stringify(data)))
        .catch((err) => console.error(err));

        console.log(localStorage.getItem('CharacterData'))
       
        location.href =`/character.html`;
    }
 
})
