document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4663 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imgLikes = document.querySelector("#likes")
  let commentList = document.querySelector("#comments")


  fetch(imageURL) //  Step 1 - Get the Image Data
  .then(res => res.json())
  .then(ele => {
    let imgSrc = document.querySelector("#image")
    let imgTitle = document.querySelector("#name")
    
    imgSrc.src = ele.url //Populating Image Fields
    imgTitle.innerText = ele.name
    imgLikes.innerText = ele.like_count
    
    ele.comments.forEach(singleComment=> { //Populating Comments
      let imgComment = document.createElement("li")
      imgComment.innerHTML = `
      ${singleComment.content}
      <button class="deleteButton">Delete</button>` 
      imgComment.dataset.commentId = singleComment.id 
      commentList.append(imgComment)
    })
  })

  document.getElementById("like_button").addEventListener("click",(event)=> { // Step 2 - Like Feature (Frontend)
    let currLikes = parseInt(imgLikes.innerText)
    currLikes++
    imgLikes.innerText = currLikes // Optimistic rendering
    
    fetch(likeURL, { // Step 3 - Like Feature (Backend)
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  })

  document.getElementById("submit_button").addEventListener("click",(event)=> { // Step 4 - Comment Feature (Frontend)
    event.preventDefault()
    let newCommentText = event.target.parentNode.querySelector("#comment_input").value

    let newComment = document.createElement("LI")
    newComment.innerHTML = `
    ${newCommentText} 
      <button class="deleteButton">Delete</button>
    `
    commentList.append(newComment) // Optimistic rendering

    fetch(commentsURL,{ //Step 5 - Comment Feature (Backend)
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: newCommentText
      })
    })
    .then(res => res.json()) //Gets response for element ID, remove button in step 6
    .then(ele => newComment.dataset.commentId = ele.id) //Used for step 6
  })

  commentList.addEventListener("click", (event)=> { //Step 6 - Delete a comment feature
    if(event.target.className == "deleteButton"){
      let deletedCommentId = event.target.parentNode.dataset.commentId
      fetch(`${commentsURL}${deletedCommentId}`,{
        method: "delete"
      })
      .then(event.target.parentNode.remove()) //Pessimistic Rendering
    }
  }) 

})