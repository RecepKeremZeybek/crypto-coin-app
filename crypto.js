
const form = document.querySelector(".top-banner form");

const input = document.querySelector(".top-banner input");

const msgSpan = document.querySelector(".container .msg");

const coinList = document.querySelector(".ajax-section .container .coins");

//*localstoreage

localStorage.setItem(
  "apiKey",
  EncryptStringAES(
    "coinranking5787f1b20234b3e445601abdfdba9358393fbf304707a9ff"
  )
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCoinDataFromApi();
  form.reset();
});

const getCoinDataFromApi = async() => {
  const apiKey = DecryptStringAES(localStorage.getItem("apiKey")) 

  const url=`https://api.coinranking.com/v2/coins?search=${input.value}&limit=1`

  const options = {
    headers: {
      
       'x-access-token': apiKey,
    },
  };

  
// fetch
  
//  const response = await fetch(url, options)
// .then((response) => response.json())
// .then((result) => console.log(result.data.coins[0]));

const response =await axios(url,options);
// console.log(response.data.data.coins[0])

const {price,name,change,iconUrl,symbol}=response.data.data.coins[0];


// coin Control

const coinNameSpans=coinList.querySelectorAll("h2 span");
const filteredArray=[...coinNameSpans].filter((span)=>(span.innerText==name)
);
if(filteredArray.length>0){msgSpan.innerText=`You already know the data for ${name}, Please search for another coin 😉`
return;
};



const createdLi=document.createElement("li")
createdLi.classList.add("coin")
createdLi.innerHTML=`

<h2 class="coin-name" data-name=${name}>
    <span>${name}</span>
    <sup>${symbol}</sup>
</h2>
<div class="coin-temp">$${Number(price).toFixed(6)}</div>
    <figure>
    <img class="coin-icon" src=${iconUrl}>                
    <figcaption style='color:${change<0?"red":"green"}'>
        <span><i class="fa-solid fa-chart-line"></i></span>
        <span>${change}</span>
    </figcaption>
    </figure>
    <span class="remove-icon">
        <i class="fas fa-window-close" style="color:red"></i>
    </span>
`;


coinList.prepend(createdLi)

createdLi.querySelector(".remove-icon").addEventListener("click", ()=>{
    createdLi.remove()
})
};
