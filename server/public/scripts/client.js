console.log( 'js' );

function getKoalas(){
  // console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  }).then(function(response) {
    // console.log('getKoalas() response', response.data);
    renderKoalas(response.data);
  }).catch(function(error){
    console.log('error in GET', error);
  });
} // end getKoalas

function saveKoala(event){
  event.preventDefault();
  // console.log( 'in saveKoala' );
  // axios call to server to get koalas
  let name = document.getElementById('nameIn').value;
  let age = document.getElementById('ageIn').value;
  let gender = document.getElementById('genderIn').value;
  let transferStatus = document.getElementById('readyForTransferIn').value;
  let notes = document.getElementById('notesIn').value;
  document.getElementById('nameIn').value = '';
  document.getElementById('ageIn').value = '';
  document.getElementById('genderIn').value = '';
  document.getElementById('readyForTransferIn').value = '';
  document.getElementById('notesIn').value = '';

  axios({
    method: 'POST',
    url:'/koalas',
    data: {
      name: name, 
      age: age, 
      gender: gender,
      readyToTransfer: transferStatus,
      notes: notes
    }
  }).then(function(response) {
    // console.log('saveKoala() response', response.data);
    getKoalas();
  }).catch(function(error){
    console.log('error in POST', error);
  });
}

function renderKoalas(responseData){
  const koalas = document.getElementById('viewKoalas')
  koalas.innerHTML = '';

  for(let i = 0; i < responseData.length; i += 1) {
    let index = responseData[i];
    let transferStatus = ''
    
    if (index.ready_to_transfer) {
      transferStatus = 'Y'
    }
    else{
      transferStatus = "N"
    }

    let text = (`
    <tr data-koalaid=${index.id}>
      <td>${index.name}</td>
      <td>${index.age}</td>
      <td>${index.gender}</td>
      <td>${transferStatus}</td>
      <td>${index.notes}</td>
  `);
    // For each koala, append a new row to our table
    if (index.ready_to_transfer) {
      text+= `<td><button onclick='makeReady(event)'>Not Ready</button></td>`
    }
    else{
      text += `<td><button onclick='makeReady(event)'>Ready</button></td>` 
    }
    text += `<td><button onclick='deleteEntry(event)'>Delete</button></td></tr>`
    koalas.innerHTML+= text;
  }

}

function makeReady(event){
  event.preventDefault()
  let idOfKoala = event.target.closest('tr').getAttribute('data-koalaid')
  axios({
    method: 'PUT',
    url: `/koalas/${idOfKoala}`
  }).then(function(response) {
    // console.log('makeReady() response', response.data);
    getKoalas()
  }).catch(function(error){
    console.log('error in PUT', error);
  });
}

function deleteEntry(event) {
  event.preventDefault()
  console.log("Attempting to Delete!")
  let idOfKoala = event.target.closest('tr').getAttribute('data-koalaid')
  axios({
    method: 'DELETE',
    url: `/koalas/${idOfKoala}`
  }).then(function(response) {
    // console.log('deleteEntry() response', response.data);
    getKoalas()
  }).catch(function(error){
    console.log('error in DELETE', error);
  });
}

getKoalas();
