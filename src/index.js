const photoDiv = document.getElementById("image_card")
let likeButton = document.getElementsByClassName("like-button")
let likeSpan = document.getElementsByClassName("like-span")


// function renderComments(response){

// }

function renderPhoto(response){
  photoDiv.innerHTML =  `
    <img src="${response.url}" id=${response.id}/>
          <h4 id="name">${response.name}</h4>
          <span>Likes:
            <span id=${response.id} class= "like-span">${response.like_count}</span>
          </span>
          <button id=${response.id} class="like-button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" id="submit-button" value="Submit"/>
          </form>
          <ul id="comments">
               ${(response.comments.map(comment => `<li id = ${comment.id}> ${comment.content} </li>`)).join("")}
          </ul>
    `
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4666

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    renderPhoto(response)
  })

  document.addEventListener("click", function(event){
    if (event.target.className === "like-button"){
      let likes = parseInt(likeSpan[0].innerText) 
      likes++
      likeSpan[0].innerText = likes

      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: parseInt(event.target.id)
        })
      })
    }
  })
  document.addEventListener("submit", function(event){
      event.preventDefault()
      let commentsUl = document.getElementById("comments")
      let image = document.getElementsByTagName("img")
      let newComment = event.target.elements[0].value
      const form = document.getElementById("comment_form")
      commentsUl.innerHTML += `<li>${newComment}</li>`

      fetch('https://randopic.herokuapp.com/comments', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: parseInt(image[0].id), 
          content: newComment
        })
      }).then(form.reset())
  })

})
