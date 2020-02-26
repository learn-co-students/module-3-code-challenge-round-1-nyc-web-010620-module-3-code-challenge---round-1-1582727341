
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId =  4662

  const imageURL = `https://randopic.herokuapp.com/images/{$imageURL}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
})


getImage();

function getImage() {
  fetch (`${imageURL}`)
  .then(resp => resp.json())
  .then(image => {
    showImage(image)

  })
}
function showImage(image){
  let imgURL = document.querySelector('#image')
    imgURL.src = image.url;
    imgURL.dataset.id = image.id; 
  let imgName = document.querySelector(`#name`);
  image.innerText = image.name;
  let imgLikes = document.querySelector(`#likes`)
  console.log(imageLikes, "likes")
  imgLikes.innerText = image.like_count
  let coments = document.querySelector('#comments')


  image.comments.forEach(comment => {
    let li = document.createElement('li')
    li.dataset.id = comment.id
    li.className = 'li'
    comments.append(li)
    li.innerHTML = `
    ${comment.content}
    <button class='delete_button' data-id=${comment.id}>delete</button
    `
    let likeBtn = document.querySelector('#like_button')
    likeBtn.addEventListener('click', e =>{
      console.log(e.target, 'like')
      let likes = e.target.parentNode.querySelector('#likes')
      let likeCounter = parseInt(likes.innerText)
      console.log(likeCounter, 'like')
      likeCounter ++ 
      liker.innerText = likeCounter
  
      fetch(`${likeURL}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId
        })
      });
    });
    const form = document.querySelector('#comment_form');
    console.log(form, 'formm');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const newComment = e.target.children[0].value;
      const comments = document.querySelector('#comments');
      const commentLi = document.createElement('li');
      commentLi.dataset.id = newComment.id;
      console.log(e.target)
      comments.append(commentLi);
      commentLi.innerHTML = `
      ${newComment}
      <button class='delete_button' data-id=>delete</button>
      `;
      console.log(newComment, 'target')
      fetch(`${commentsURL}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: newComment
        })
      });
  form.reset(); 
  }); 
    const commentsUl = document.querySelector('#comments');
    commentsUl.addEventListener('click', e => {
      if(e.target.className === 'delete_button') {
        const commentId = e.target.dataset.id;
        const comment = e.target.parentNode
        comment.remove();
        console.log(commentId, 'delete')
        
        fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
     method: 'DELETE', 
      headers: new Headers({
       'Content-Type': 'text/plain'
    })})
    .then(function() { message: 'Comment Successfully Destroyed' });
  }
    })
  })
      
    }
    


