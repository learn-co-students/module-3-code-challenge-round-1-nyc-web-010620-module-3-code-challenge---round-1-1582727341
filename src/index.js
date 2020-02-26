document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = `https://randopic.herokuapp.com/images/:id`//Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  fetch(imageURL)
  .then(response => response.json())
  .then(user => displayImage(user))

  let ul = document.getElementById("comments")
  let form = document.getElementById("comment_form")

  document.addEventListener("click", e => {
    if (e.target.className === "comments") {
      let comment = comments[e.target.id]
      let li = document.createElement("li")
      li.innerText =`${comment.name}`
      ul.append(li)

  form.addEventListener("submit", e => {
        e.preventDefault()
        let newComment = {
           form.name.value
        }
        fetch(BASE_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accepts: "application/json"
          },
          body: JSON.stringify(newComment)
        })
          .then(resp => resp.json())
          .then(comment => {
            newComment.innerText += ${comment.name}


                })
              })
  
            
          form.addEventListener("click", function(event) {
              event.preventDefault()
              if (event.target.className === 'like_button') {
          
                let likedImage = event.target.parentNode
                let likedImageId = likedImage.dataset.id
        
                let newLikesCount = parseInt(event.target.previousElementSibling.innerText) + 1
                let likesString = `${newLikesCount} Likes`
                fetch(`${BASE_URL}/${likedImageId }`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      accept: "application/json"
                    },
                    body: JSON.stringify({likes: newLikesCount})
                  })
                  .then(function(response) {
                    return response.json()
                  })
                  .then(function(data) {
                    event.target.previousElementSibling.innerText = `${newLikesCount} likes`;
                  })  
      
})

 function displayImage(user){
 let imageDest = document.getElementById("image")
 imageDest.innerHTML = 
 <img.src = ${user.imageURL}>
}


