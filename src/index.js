document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    document.getElementById('dog-form').addEventListener('submit', (e) => {
        e.preventDefault()
        if (e.target.children[3].id !== 'x') {
            updateDog(e.target)
        }
    })
})

function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.map(dog => renderDog(dog)))
}

function renderDog(dog) {
    const tr = document.createElement('tr')
    tr.className = 'dog-details'
    function makeTd(text) {
        const td = document.createElement('td')
        td.textContent = text
        tr.appendChild(td)
        return td
    }
    makeTd(dog.name)
    makeTd(dog.breed)
    makeTd(dog.sex)
    const button = document.createElement('button')
    button.textContent = 'Edit Dog'
    button.addEventListener('click', (e) => {
        const info = Array.from(e.target.parentElement.parentElement.children)
        populateSubmit(info)
    })
    makeTd('').appendChild(button)
    button.parentElement.id = `dog-${dog.id}`
    document.querySelector('#table-body').appendChild(tr)
}

function populateSubmit(info) {
    const inputs = Array.from(document.querySelectorAll('input'))
    const loopEnd = info.length - 1
    for (let i = 0; i < loopEnd; i ++) {
        inputs[i].value = info[i].textContent
    }
    inputs[3].id = 's-' + info[3].id.split('-')[1]
}

function updateDog(form) {
    const inputs = form.children
    const id = inputs[3].id.split('-')[1]
    const updatedDog = {
        name: inputs[0].value,
        breed: inputs[1].value,
        sex: inputs[2].value
    }
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(updatedDog)
    }
    fetch(`http://localhost:3000/dogs/${id}`, configObj)
    .then(res => res.json())
    .then(() => {
        inputs[3].id = 'x'
        for (let i = 0; i < inputs.length - 1; i++) {
            inputs[i].value = ''
        }
        Array.from(document.querySelector('tbody').children).map(dog => dog.remove())
        getDogs()
    })
}