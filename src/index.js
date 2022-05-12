document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.map(dog => renderDog(dog)))
}

function renderDog(dog) {
    const tr = document.createElement('tr')
    function makeTd(text) {
        const td = document.createElement('td')
        td.textContent = text
        return tr.appendChild(td)
    }
    makeTd(dog.name)
    makeTd(dog.breed)
    makeTd(dog.sex)
    const button = document.createElement('button')
    button.textContent = 'Edit'
    makeTd('').appendChild(button)
    document.querySelector('table').appendChild(tr)
}