const list = document.querySelector('#list')
const inputs=document.querySelectorAll('inputs')
const add=document.querySelector('#add')

//GRUD Http methods
//C-Create  POST
//Read-GET
//U-UPDATE
//D-DELETE

const url='https://dummyjson.com/products'
async function getProducts() {
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.products);
        showProducts(data.products)


    } catch (err) {
        console.log(err);

    }

}
getProducts()

function showProducts(arr) {
    for (const pr of arr) 
        {
        list.innerHTML +=`
        <li >
        <h4>onclick=delProduct(${pr.id})${pr.title}</h4>
        <img src=${pr.thumbnail} />
        <button onclick="changeProduct(${pr.id})">Update</button>
        </li>
        `
    }

}
async function  delProduct(id){
    try{
        const res=await fetch(url+'/'+id,{
          method:'DELETE',
          headers:{
          'Content-Type': 'application/json'
          }
        })
        const data=await res.json()
        console.log(data);
        getProducts()

        
    } catch(err){
    console.log(err);
    }

}

async function changeProduct(id){
    const inputTitle=prompt("Enter title")
    const img=prompt("Enter image url")
    const res=await fetch(`${url}/${id}`,{
        method:"PUT",
        header:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({title:inputTitle,image: imageUrl})

    })
    const data=await res.json()
    getProducts()

}
async function createProduct(params){
    const res= await fetch(url,{
        method:"POST" ,
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title:inputs[0].value,
            price:inputs[1].value,
            imge:inputs[2].value
        })
    })
    const data=await res.json()
    console.log(data);
    
    getProducts()
}
