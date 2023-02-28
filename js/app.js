const loadPhone = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit);
}

const displayPhone = (phones,dataLimit) =>{
const phoneContainer = document.getElementById('phones-container');
phoneContainer.textContent = '';

const showAll = document.getElementById('show-all');

if(dataLimit && phones.length > 6){
    phones = phones.slice(0,6);
    showAll.classList.remove('d-none');
}else{
    showAll.classList.add('d-none');
}

const noPhoneFound = document.getElementById('no-phone-found');

if(phones.length === 0){
    noPhoneFound.classList.remove('d-none')
}else{
    noPhoneFound.classList.add('d-none')
}

phones.forEach(phone => {
const phoneDiv = document.createElement('div');
phoneDiv.classList.add = 'col'

phoneDiv.innerHTML = `
<div class="card p-4">
  <img class="w-100" src="${phone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <h5 class="card-title">${phone.brand}</h5>
    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Details</button>
  </div>
</div>
`;
phoneContainer.appendChild(phoneDiv);
});
//loader end
toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function(){
    //loader start 
    processSearch(6);
});

//key enter show value 
document.getElementById('search-field').addEventListener("keypress", function(event) {
//    console.log(event.key);
    if (event.key === "Enter") {
        processSearch(6);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}

//not the best way to show all data loading
document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch();
});
const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerHTML = phone.name;
    const modalImages = document.getElementById('modal-img');
    modalImages.innerHTML = `
    <img src="${phone.image}" alt="">
    `;
    const resesData = document.getElementById('releasDate');
    resesData.innerHTML = `
    <p>Reles Date: ${phone.releaseDate}</p>
    `
}


loadPhone('apple');