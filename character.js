let CharacterSelected = JSON.parse(localStorage.getItem('CharacterData'))
const MainDiv = document.getElementById('charDiv')
console.log(CharacterSelected.name)

MainDiv.innerHTML += `
    <img src="${CharacterSelected.image}">
    <h1>${CharacterSelected.name}</h1>
    <p>${'Gener: ' + CharacterSelected.gender}</p>
    <p>${'Status: ' + CharacterSelected.status}</p>
    <o>${'Origin: ' + CharacterSelected.origin.name}</o>
`
