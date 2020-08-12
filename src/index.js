document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5809

  let image_link = `https://randopic.herokuapp.com/images/${imageId}`
  let likes_url = "https://randopic.herokuapp.com/likes"
  let comment_link ="https://randopic.herokuapp.com/comments"

  let ul = document.getElementById('comments')

  fetch(image_link)
  .then(resp =>resp.json())
  .then(page => (renderPage(page)))


   function renderPage(page){
     let image = document.getElementById('image')
     image.src =page.url
     let name = document.getElementById('name')
     name.innerText=page.name
     let likes = document.getElementById('likes')
     likes.innerText= page.like_count
     
     let comments = page.comments
          comments.forEach(comment=> {
          let li = document.createElement('li')
          li.innerText = comment.content
          ul.appendChild(li)
         })
   }//function renderPage

   let button = document.getElementById('like_button')

   button.addEventListener("click", e=>{
     let likesNumber = parseInt(likes.innerText)
     let newNumber = likesNumber+1
     likes.innerText = newNumber
     body = {image_id: imageId}

    options = {
      method:"POST",
      headers:{
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch(likes_url, options)
   })//addEventListener

   let form = document.getElementById("comment_form")
   form.addEventListener("submit", e=>{
     e.preventDefault()

     let comment = e.target.comment.value
     let li = document.createElement('li')
     li.innerHTML = comment
     ul.appendChild(li)

     let body ={
      image_id: imageId,
      content: comment
    }
     options = {
      method:"POST",
      headers:{
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(body)
    }
     fetch(comment_link, options) 
     
   })
      



   


})//dom load
