document.addEventListener('DOMContentLoaded', e => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false
  let toyCollection = document.querySelector('#toy-collection')
  const addToyForm = document.querySelector('.add-toy-form')

  // YOUR CODE HERE
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }

  })

  getToys()

  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      // console.log(toys)
      toys.forEach(toy => {
        // console.log(toyCollection)
        let divCard = document.createElement('div')
        divCard.className = 'card'
        divCard.setAttribute('data-id', toy.id)
        // console.log(divCard)
        let h2 = document.createElement('h2')
        let img = document.createElement('img')
        let p = document.createElement('p')
        let button = document.createElement('button')
        h2.innerText = toy.name
        img.src = toy.image
        img.className = 'toy-avatar'
        p.innerText = `${toy.likes}`
        button.className = 'like-btn'
        button.innerText = 'Like <3'
        divCard.append(h2)
        // console.log(divCard)
        divCard.append(img)
        // console.log(divCard)
        divCard.append(p)
        divCard.append(button)
        // console.log(divCard)
        toyCollection.append(divCard)
        // console.log(toyCollection)
      })
    })
  }

  addToyForm.addEventListener("submit", e => {
    e.preventDefault()
    let toyName = e.target[0].value
    // console.log(toyName)
    let toyImage = e.target[1].value

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
      {
        "name": toyName,
        "image": toyImage,
        "likes": 0
    })
    })
    .then(res => res.json())
    .then(toy => {
      // console.log(toyCollection)
      let divCard = document.createElement('div')
      divCard.className = 'card'
      divCard.setAttribute('data-id', toy.id)
      // console.log(divCard)
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let p = document.createElement('p')
      let button = document.createElement('button')
      h2.innerText = toy.name
      img.src = toy.image
      img.className = 'toy-avatar'
      p.innerText = `${toy.likes}`
      button.className = 'like-btn'
      button.innerText = 'Like <3'
      divCard.append(h2)
      // console.log(divCard)
      divCard.append(img)
      // console.log(divCard)
      divCard.append(p)
      divCard.append(button)
      // console.log(divCard)
      toyCollection.append(divCard)
  })
  })

  toyCollection.addEventListener('click', e => {
    if (e.target.classList.contains('like-btn')){
      const likeText = e.target.parentNode.querySelector('p').innerText
      const likeNo = parseInt(likeText)
      const id = e.target.parentNode.getAttribute('data-id')
      const p = e.target.parentNode.querySelector('p')
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        body: JSON.stringify(
        {
          "likes": likeNo + 1
        })
      })
      .then(res => res.json())
      .then(toy => {
        p.innerText = toy.likes
      })
    }
  })
}) //DOMContentLoaded
