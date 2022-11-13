let CharacterSelected = JSON.parse(localStorage.getItem('CharacterData'))
const MainDiv = document.getElementById('charDiv')
const LoaderPortal = document.querySelector(".loader-div");

console.log(CharacterSelected)

setTimeout(() => {
    LoaderPortal.classList.add("loading_off");
  }, 1000);

if(CharacterSelected != null){
    MainDiv.innerHTML += `
    <div id="CharacterData">
    <img src="${CharacterSelected.image}" title="CharImg">
    <div class="CharacterInfo">
    <h1>${CharacterSelected.name}</h1>
    <p>${'Gender: ' + CharacterSelected.gender}</p>
    <p>${'Status: ' + CharacterSelected.status}</p>
    <p>${'Origin: ' + CharacterSelected.origin.name}</p>
    <p>${'Specie: ' + CharacterSelected.species}</p>
    <p>${'Location: ' + CharacterSelected.location.name}</p>
    <button id="returnBtn" title="returnHomePage"><i class="fa-solid fa-person-walking-arrow-loop-left"></i></button>
    </div>
    </div>
`
}else{
    location.href =`index.html`;
}


document.getElementById('returnBtn').addEventListener('click', () => {
    location.href =`index.html`;
})



