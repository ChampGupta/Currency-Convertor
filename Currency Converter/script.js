const baseURL="https://latest.currency-api.pages.dev/v1/currencies";
const dropDown=document.querySelectorAll(".selector");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector("#fc");
const toCurr=document.querySelector("#tc");
const msg=document.querySelector(".msg");

for(let select of dropDown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="fromCurrency"&&currCode==="USD"){
            newOption.selected="selected"
        }
        else if(select.name==="toCurrency"&&currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(elem)=>{
    let currCode=elem.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=elem.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("#amount");
    if(amount.value===""||amount.value<0){
        amount.value="1";
    }
    const URL=`${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let fromData=data[fromCurr.value.toLowerCase()];
    let toData=fromData[toCurr.value.toLowerCase()];
    let rate=toData;
    let finalAmount=rate*(amount.value);
    if(isNaN(finalAmount)){
        msg.innerText=`Invalid Input`;
    }else{
    msg.innerText=`${amount.value} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
    }
});

