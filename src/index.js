let imageId = 4669
const imageURL = `https://randopic.herokuapp.com/images/${4669}`
const likeURL = `https://randopic.herokuapp.com/likes`
const commentsURL = `https://randopic.herokuapp.com/comments`

document.addEventListener('DOMContentLoaded', () => {
  fetch(imageURL)
    .then(resp => resp.json())
      .then(images => {
          renderImage(images)
      })
})

function displayComments(images){
  let comments = images.comments
  for (let i = 0; i < comments.length; i++){
    return `<li>${comments[i].content}</li>`
  }
}

function renderImage(images){
  let image = document.getElementById('image')
  let title = document.getElementById('name')
  let likes = document.getElementById('likes')
  let comments = document.getElementById('comments')
    image.src = images.url
    title.innerText = images.name
    likes.innerText = `${images.like_count} `
    comments.innerHTML = `${displayComments(images)}`
}

const likeBtn = document.getElementById('like_button')
likeBtn.addEventListener('click', function(e){
  let likes = document.getElementById('likes')
  e.target.parentElement.children[2].firstElementChild.innerText++

  fetch(likeURL, {
    method: 'POST',
    headers: { 'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      'image_id' : 4669,
      "likes" : likes
    })
  })
})

document.addEventListener('submit', function(e){
  e.preventDefault()
  let comments = document.getElementById('comments')
  let userComment = e.target.elements[0].value
    comments.innerHTML += `<li>${userComment}</li>`

    fetch(commentsURL, {
      method: 'POST',
      headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image_id' : 4669,
        "content" : userComment
      })
    }).then(e.target.reset())
})