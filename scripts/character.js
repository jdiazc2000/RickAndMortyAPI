let CharacterSelected = JSON.parse(localStorage.getItem('CharacterData'))
const MainDiv = document.getElementById('charDiv')
const LoaderPortal = document.querySelector(".loader-div");

console.log(CharacterSelected)

setTimeout(() => {
    LoaderPortal.classList.add("loading_off");
  }, 1000);

if(CharacterSelected != null){
    MainDiv.innerHTML += `
    <img src="${CharacterSelected.image}">
    <h1>${CharacterSelected.name}</h1>
    <p>${'Gender: ' + CharacterSelected.gender}</p>
    <p>${'Status: ' + CharacterSelected.status}</p>
    <o>${'Origin: ' + CharacterSelected.origin.name}</o>
`
}else{
    location.href =`index.html`;
}




