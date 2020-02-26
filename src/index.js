const imageURL = 'https://randopic.herokuapp.com/images/4678'

const renderImage = () => {
  const imageTag = document.querySelector('#image')
  const imageTitle = document.querySelector('#name')
  const likes = document.querySelector('#likes')

  return fetch(imageURL).then(response => response.json()).then(imgData => {
    const commentsUl = document.querySelector('#comments')
    
    imgData.comments.forEach(comment => {
      const li = document.createElement('li')
      li.innerText = comment.content
      commentsUl.append(li)
    })

    imageTag.src = imgData.url
    imageTitle.innerText = imgData.name
    likes.innerText = imgData.like_count
  })
}

const incrementLike = () => {
  const likes = document.querySelector('#likes')
  let currentLikesCount = parseInt(likes.innerText)

  currentLikesCount++
  likes.innerText = currentLikesCount
}

const addComment = () => {
  const commentInput = document.querySelector('#comment_input')
  const commentsUl = document.querySelector('#comments') 
  const li = document.createElement('li')
  li.innerText = commentInput.value
  commentsUl.append(li)
  

  // commentInput.value
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // let imageId = 4678 //Enter the id from the fetched image here
  // const imageURL = `https://randopic.herokuapp.com/images/${imageId}`


  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  renderImage()

  document.addEventListener('click', event => {
    const likeButton = document.querySelector('#like_button')
    const likes = document.querySelector('#likes')
    const submitButton = document.querySelector('#submit-button')
    // console.log(submitButton);
    
    
    switch (true) {
      case event.target.id === likeButton.id:
        incrementLike()
        fetch(likeURL, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }, 
          body: JSON.stringify({ image_id: 4678, like_count: likes.innerText})
        }).then(response => response.json()).then((data) => console.log('Success:', data)).catch(errors => console.log(errors))
        // console.log(likes.innerText);
        break
      case event.target.id === submitButton.id:
        event.preventDefault()
        addComment()
        break
    }
  })
})


