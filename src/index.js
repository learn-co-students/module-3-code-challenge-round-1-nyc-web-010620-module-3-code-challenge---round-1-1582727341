document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4672

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image =>{
    
    const div = document.getElementById('image_card')
    div.innerHTML =`
    <div id="image_card" class="card col-md-4">
    <img src="${image.url}" id="image" data-id=""/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    </ul>
  </div>
`
  })

    const likeButtom = document.getElementById('like_button')
    document.addEventListener("click", function(event){
    const span = document.getElementById('likes')
    const number = parseInt(span.innerText)

    const newNumber = number+1

    event.target.parentNode.children[2].innerText = `Likes: ${newNumber}`
    
    const body ={image_id:imageId, like_count: newNumber}
    fetch(likeURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp =>resp.json())
    .then(console.log)
  })


  const form = document.getElementById('comment_form')

  form.addEventListener('click', function(event){
       console.dir(event.target)
       const ul = document.getElementById('comments')
       const li = document.createElement('li')

       li.innerText = event.target.comment.value
       newComment = li.innerText

       ul.append(li)
      
       const body = {comment:newComment}

       fetch(commentsURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify(body)
      })

  })


    









    
    
    
    




  









})//dom load
