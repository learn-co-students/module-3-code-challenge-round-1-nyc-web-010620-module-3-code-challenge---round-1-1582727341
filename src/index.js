let imageId = 4661 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage()
  fetchLikes()
  fetchComments()
  addLike()
  addComment()

})

function fetchImage(){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(pic => postPicture(pic))
}

function postPicture(pic){
  let wall = document.getElementById("image")
  let title = document.getElementById("name")

  wall.src = pic.url
  title.innerText = pic.name
}

function fetchLikes(){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(pic => postLikes(pic))
}

function postLikes(pic){
  let likes = document.getElementById("likes")

  likes.innerHTML = pic.like_count
}

function addLike(){
  let likeBtn = document.getElementById("like_button")

  let likes = document.getElementById("likes")

  
  likeBtn.addEventListener("click", function(event){

    let likeInt = parseInt(likes.innerHTML)
    likeInt += 1
    likes.innerHTML = likeInt
  
    let data = {
      image_id: imageId
    }

    fetch(likeURL, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
  })
}

function fetchComments(){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(pic => postComments(pic))
}

function postComments(pic){
  let commentWall = document.getElementById("comments")
  
  pic.comments.forEach(function(comment){
    let existingCom = document.createElement("li")

    existingCom.innerHTML = comment.content

    commentWall.append(existingCom)
  })
}

function addComment(){
  let commentForm = document.getElementById("comment_form")

  commentForm.addEventListener("submit", function(event){
    event.preventDefault()

    let commentInput = document.getElementById("comment_input")
    let commentWall = document.getElementById("comments")
    let comment = document.createElement("li")

    comment.innerHTML = commentInput.value

    commentWall.append(comment)

    let data = {
      image_id: imageId,
      content: commentInput.value
    }

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
  })
}