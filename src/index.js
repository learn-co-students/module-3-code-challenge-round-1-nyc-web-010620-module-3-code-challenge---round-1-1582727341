const BASE_URL = "http://localhost:3000"
let imageId = 4665 //Enter the id from the fetched image here (my image id: 4665)
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const postsURL = "http://localhost:3000/posts"


document.addEventListener('DOMContentLoaded', () => {
  // const BASE_URL = "http://localhost:3000"
  // let imageId = 4665 //Enter the id from the fetched image here (my image id: 4665)
  // const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  // const likeURL = `https://randopic.herokuapp.com/likes/`
  // const commentsURL = `https://randopic.herokuapp.com/comments/`
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // GET 'https://randopic.herokuapp.com/images/:id'
  fetch(imageURL)
  .then(function(response) {
    return response.json()
    console.log(response)
  })
  .then(function(data) {
    handleImage(image)
  })

// Use the data from the API response to change what's currently on the page (take a look at the already provided index.html). 
// the image url
// the image name
// the number of likes
// any comments in an unordered list

  function handleImage(image) {
    const imageCard = document.getElementById("image_card")
    const newImageCard = document.createElement("div")
    // const imageContainer = getElementById("image-content")
    //the HTML for everything exists already, we just have to feed the correct info in 
    newImageCard.innerHTML = ` 
    <img src="${image[":url"]}" id="image" data-id="${imageId}"/>
    <h4 id="name">${image[":name"]}</h4>
    <span>Likes:
      <span id="likes">${image[":likes"]}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
       <!-- <li> for each comment goes here -->
    </ul>
    `

    imageCard.append(newImageCard)
  }
    
  //   <div id="image_card" class="card col-md-4">
  //   <img src="" id="image" data-id=""/>
  //   <h4 id="name">Title of image goes here</h4>
  //   <span>Likes:
  //     <span id="likes">Likes Go Here</span>
  //   </span>
  //   <button id="like_button">Like</button>
  //   <form id="comment_form">
  //     <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  //     <input type="submit" value="Submit"/>
  //   </form>
  //   <ul id="comments">
  //        <!-- <li> for each comment goes here -->
  //   </ul>
  // </div>


//   "id": 1,
//   "url": "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
//   "name": "The Internet!",
//   "like_count": 0,
//   "comments": [
//     {
//       "id": 5941,
//       "content": "first comment!",
//       "image_id": 1158,
//       "created_at": "2018-10-18T17:06:14.859Z",
//       "updated_at": "2018-10-18T17:06:14.859Z"
//     }
//   ]
// }
    


})//DOMContentLoaded closing

// ** GET request
// As a user, when the page loads, I should see:
// an image
// any comments that image has
// the number of likes that image has

