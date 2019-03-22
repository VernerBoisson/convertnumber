window.onload = function(){
    jsonLoad();
    document.onload = addEvent();
    window.language = 'french'
};

function jsonLoad(){
    let xmlhttp = new XMLHttpRequest();
    let url = "dict-conv-chiffres.json";

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            window.json = JSON.parse(this.response);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function addEvent(){
    const submit = document.getElementById("submit");
    const french = document.getElementById("french_language")
    const england = document.getElementById("england_language")


    submit.addEventListener('click', main)
    window.addEventListener('keypress', enterSubmit);
    french.addEventListener('click', (()=> (changeLanguage('french'), flagclicked(french, england))))
    england.addEventListener('click', (()=> (changeLanguage('english'), flagclicked(england, french))))

    flagclicked(french, england)
}

function flagclicked(e, f){
    e.style = 'border: solid 5px blue;'
    f.style = 'border: none;'
}

function enterSubmit(param){
    if(param.key === "Enter")
        main();
}

function changeLanguage(param){
    window.language = param
}

function main(){
    const divinput = document.getElementById("input");
    const divresult = document.getElementById("result");
    let language = window.language

    if(!isNaN(divinput.value)){
        convertNumeric(divinput.value, divresult, language)
    }else{
        convertString(divinput.value, divresult, language)
    }
}

function convertString(value, divresult, language){
    let tmpobject = window.json[language]
    value = value.split(" ")
    let tmptab = []
    let result = 0
    value.forEach(element => {
        tmptab.push(getKeyByValue(tmpobject, element))
    });
    

    tmptab = tmptab.map(Number)
    
    let compter = 0
    while(tmptab.length>0 && compter<10){
        let largest = getLargest(tmptab)
        let index = tmptab.indexOf(largest)
        let right = tmptab.splice(index+1, tmptab.length)
        let left = tmptab.splice(0, index)
        
        result += calculateLeft(left) * largest
        tmptab = right
        compter++
    }
    

    divresult.innerHTML = result
}

function calculateLeft(array){
    let result
    if(array.length>0){
        let largest = getLargest(array)
        if(largest==100 && array.indexOf(largest)>0){
            result = array[0]*array[1]
        }else if(array.indexOf(largest)==0){
            result = array[0]
        }
        if(array[array.length-1]!=largest)
            result += array[array.length-1] 
    }else
        result = 1
    return result
}

function getLargest(array){
    let largest = array[0]
    for(let i=1; i < array.length; i++)
        if(array[i] > largest)
            largest = array[i]
    return largest
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function isNegative(value){
    return value < 0
}

function hundred(value, string ,language){
    let hundred = Math.trunc(value/100)
    if(hundred > 1){
        string += window.json[language][hundred] + " ";
        string += window.json[language][100] + " "    
    }if(hundred == 1)
        string += window.json[language][100] + " "
    return string
}

function decadeAndUnits(value, string, language){
    if(value<20 && value > 0){
        string += window.json[language][value] + " "
    }else{
        // decade 
        decade = Math.trunc(value/10)
        decade += '0'
        string += window.json[language][decade] + " "

        // unit
        value = value % 10
        if(value != 0){
            string += window.json[language][value] + " "
        }
    }
    return string
}

function bigNumber(value, string, language){
    let length = value.toString().length;
    let vartmp = Math.trunc(length%3)
    let pow = Math.pow(10, length-vartmp)

    while(value>=1000){
        if (value/pow > 1){
            let division = Math.trunc(value/pow)
            string = hundred(division, string, language)
            division = division % 100
            string = decadeAndUnits(division, string, language)
            string += window.json[language][pow] + " "
            
            value = value%pow
        }
        pow /= 1000
        
    }

    return [string, value]
}

function algo(value, result, language){
    let tmp = bigNumber(value, result, language)
    result = tmp[0]
    value = tmp[1]
    
    // Centaines
    if(value<1000){
        result = hundred(value, result, language)
        value = value % 100
    }

    // 0 à 20
    result = decadeAndUnits(value, result, language)

    return result
}

function convertNumeric(value, divresult, language){
    let result = "";
    
    if(isNegative(value)){
        result += "moins "
        value = Math.sqrt(Math.pow(value, 2))
        result = algo(value, result, language)
    }else if(value == 0){
        result = window.json[language][0]
    }else{
        result = algo(value, result, language)
    }
    
    divresult.innerHTML = result;
}