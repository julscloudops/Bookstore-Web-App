const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', postAutor);

// const file = document.getElementById('img').src;

// function imageUpload(file) {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Replace the preset name with your own

//   fetch(CLOUDINARY_UPLOAD_URL, {
//     method: 'POST',
//     body: formData
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.secure_url !== '') {
//         this.setState({
//           uploadedFileCloudinaryUrl: data.secure_url
//         });
//       }
//     })
//     .catch(err => console.error(err))
// }

function postAutor(event) {

var formData = new FormData();
formData.append('name', document.getElementById('name').value);
formData.append('description', document.getElementById('description').value);
formData.append('img', document.getElementById('img').value);

  const url = 'http://localhost:3000/autor/registro';

  const fetchOptions = {
      method: 'POST',
      body: formData
  }
     
  

fetch(url, fetchOptions) 
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', JSON.stringify(response)));


}






// function postAutor(event) {
//   event.preventDefault();

//   // Se guardan los valores de cada campo de input para poder pasarlos a formato JSON

//   let data = {
//     name: document.getElementById('name').value,
//     description: document.getElementById('description').value,
//     img: document.getElementById('img').value
//   }



//   fetch(url, fetchOptions).then((res) => {
//       if (res.status != 200)
//         console.log('Ocurrió un error con el servicio: ' + res.status);
//       else
//         return res.json();
//     })
//     .catch(
//       function (err) {
//         console.log('Ocurrió un error con la ejecución', err);
//       }
//     );

// }






//   //  authorForm.addEventListener('submit', function(event) {
//   // // 1. Setup the request
//   // // ================================
  // // 1.1 Headers
  // var headers = new Headers();
  // // Tell the server we want JSON back
  // headers.set('Accept', 'application/json');

  // // 1.2 Form Data
  // // We need to properly format the submitted fields.
  // // Here we will use the same format the browser submits POST forms.
  // // You could use a different format, depending on your server, such
  // // as JSON or XML.
  // var formData = new FormData();
  // for (var i = 0; i < authorForm.length; ++i) {
  //   formData.append(authorForm[i].name, authorForm[i].value);
  // }

  // // This is for the purpose of this demo using jsFiddle AJAX Request endpoint
  // formData.append('json', JSON.stringify({example: 'return value'}));

  // // 2. Make the request
  // // ================================

  // var fetchOptions = {
  //   method: 'POST',
  //   headers,
  //   body: formData
  // };

  // var responsePromise = fetch(url, fetchOptions);

  // // 3. Use the response
  // // ================================
  // responsePromise
  // 	// 3.1 Convert the response into JSON-JS object.
  //   .then(function(res) {
  //     return res.json();
  //   })

  //   // 3.2 Do something with the JSON data
  //   .then(function(jsonData) {
  //   	console.log(jsonData);
  //     document.getElementById('results').innerText =
  // //     	JSON.stringify(jsonData);
  // //   });


  // event.preventDefault();