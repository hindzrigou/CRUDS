let title= document.getElementById('title')
let price= document.getElementById('price')
let taxes= document.getElementById('taxes')
let ads= document.getElementById('ads')
let discount= document.getElementById('discount')
let total= document.getElementById('total')
let count= document.getElementById('count')
let category= document.getElementById('category')
let submit= document.getElementById('submit')
let mood='create';
let tmp;




//get total
function getTotal()
{
  if(price.value !=''){
     let result=(+price.value + +taxes.value + +ads.value )- +discount.value;
      total.innerHTML=result;
      total.style.background ='green';
  }
  else{
    total.style.background= 'rgb(122, 3, 3)';
  }

}



//create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = []; 
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };  
    if(title.value!=''){
        
        if(mood==='create'){
            if (newPro.count>1 && newPro.count<=100){
                for(let i=0;i<newPro.count;i++){ //count
                    dataPro.push(newPro); 
                }
        
        
            }else if(newPro.count<1 || newPro.count>100){
                alert('count invalide');

            }else{
                dataPro.push(newPro);    
            }
        }
        else{
                dataPro[tmp]=newPro;
                mood='create';
                submit.innerHTML=('Create');
                count.style.display='block';
        }
    }


    localStorage.setItem('product', JSON.stringify(dataPro)); //save localstorage
    clearData();  
    showData();
};

//clear inputs
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
    total.style.background='rgb(122, 3, 3)';
};


//read
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete=document.getElementById('deleteAll');
    if(dataPro.length>0){
        btnDelete.innerHTML=`
        <button onclick=deleteAll()>  Delete All (${dataPro.length}) </button>
        `
    }else{
        btnDelete.innerHTML='';
    }
}



//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();
    }

function deleteAll(){
localStorage.clear();
dataPro = []; // Réinitialiser complètement la liste
showData();
}


//update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;   
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML=('Update');
    mood='update';
    tmp=i;
    scroll({
          top:0,
          behavior:"smooth"
    })
}
//search

let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById('search');
    if(id=='searchTitle'){
        searchMood='title';
        search.placeholder=('Search By Title')
    }else{
        searchMood='category';
        search.placeholder=('Search By Category')
    }
    search.focus() ; 
    search.value()="";
    showData();
}
function searchData(value){
    let table='';
    if(searchMood=='title'){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value.toLowerCase()))
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
            `;

        }


    }else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase()))
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
            `;

        }



    }

    document.getElementById('tbody').innerHTML = table;
}