document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4682 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(response => response.json())
  .then(imageJSON => {
    console.log(imageJSON)
    let image = document.querySelector("img")               // img 
    image.setAttribute('src',imageJSON.url)
    
    let imageName = document.getElementById("name")         // h3
    imageName.innerText = imageJSON.name

    let imageLikes = document.getElementById("likes")       // span
    imageLikes.innerText = imageJSON.like_count

    let imageComments = document.getElementById("comments") // ul
    imageJSON.comments.forEach(comment => {
      let addedComment = addCommentToList(comment.content,imageComments)
      addedComment.setAttribute('data-comment-id',comment.id)
      addDeleteButton(addedComment)
    });
  })



  let likeButton = document.getElementById("like_button")   // button

  likeButton.addEventListener("click", () => {
    // change value of likes in DOM
    let imageLikes = document.getElementById("likes")       // possible cleanup: define higher in scope to use in both fetch & like click?
    let numberOfLikes = parseInt(imageLikes.innerText)
    numberOfLikes += 1
    imageLikes.innerText = numberOfLikes.toString()

    // fetch post like to db
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })

    })

  })

  document.addEventListener('submit', (event) => {
    let commentText = document.getElementById("comment_input").value

    // prevent refresh
    event.preventDefault()

    //ensure empty comment does not get created
    if (commentText.length === 0) {return} 

    // add comment to comment list in DOM
    let commentList = document.getElementById("comments")
    let addedComment = addCommentToList(commentText,commentList)
    document.getElementsByTagName("form")[0].reset()
    console.log(commentText)

    // fetch post comment to db
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentText
      })
    }).then(response => response.json())
    .then(createdComment => {
      console.log(createdComment)
      addedComment.setAttribute('data-comment-id',createdComment.id)
      addDeleteButton(addedComment)
    })

  })

  document.addEventListener('click', function(event){
    if (event.target.className != 'delete') {return}
    console.log('delete button clicked!')
    let deleteButton = event.target

    // frontend
    deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode)

    // backend
    fetch(commentsURL + `/${deleteButton.dataset.commentId}`, {
      method: 'delete'
    })

  })

})

function addCommentToList(commentText,list) {
  let newComment = document.createElement("li")
  let commentContent = document.createElement('p')
  commentContent.innerText = commentText
  newComment.appendChild(commentContent)
  list.appendChild(newComment)

  return newComment
}

function addDeleteButton(commentHTMLObject) {
  let deleteButton = document.createElement('button')
  deleteButton.innerText = 'delete'
  deleteButton.className = 'delete'
  commentHTMLObject.appendChild(deleteButton)
  commentHTMLObject.innerHTML += '<hr>'
  deleteButton.setAttribute('data-comment-id',commentHTMLObject.dataset.commentId)
}