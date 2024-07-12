let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");

let BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

for(let dropdown of dropdowns)
{
    for(let i in countryList)
    {
        let option = document.createElement("option");
        option.innerText = i;
        option.value = i;
        if(dropdown.name === "from" && i === "USD")
        {
            option.selected = "selected";
        }
        else if(dropdown.name === "to" && i === "IND")
        {
            option.selected = "selected";
        }
        dropdown.append(option);
    }

    dropdown.addEventListener("change",(evt)=>{
        updateImage(evt.target);
    });
}

const exchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let val = amount.value;
    if(val==="" || val<1)
    {
        let msg = document.querySelector(".msg");
        msg.innerHTML = "<big>Enter a Valid Value</big>";
        amount.value = 100;
        amount.innerText = 100;
    }
    else
    {
        let URL = `${BaseURL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let arr = data[fromCurr.value.toLowerCase()];
        let conversionValue = arr[toCurr.value.toLowerCase()];

        console.log(conversionValue);
        
        let msg = document.querySelector(".msg");
        msg.innerText = `${val} ${fromCurr.value} = ${conversionValue*val} ${toCurr.value}`;
    }

}

function updateImage(element)
{
    let val = element.value;
    let currCode = countryList[val];
    let link = `https://flagsapi.com/${currCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = link;
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    exchangeRate();
})

window.addEventListener("load",exchangeRate);
