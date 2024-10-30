// result element in html
let result = document.querySelector(".result")

// condition in html
let condition = document.querySelector(".condition")

// keep math symbol
let symbol = ""

// second number change sign flag
let flag = false

// write a something into result
function writeTextIntoElement(text){
    // if text is empty then it is clear all
    if(text == ''){
        symbol = ''
        result.innerText = ''
        flag = false
        return;
    }
    // check flag
    if(flag && text !== ''){
        let temp1 = result.innerText.split(symbol)
        let temp2 = temp1[1].split('')
        if(temp2[0] === '('){
            temp2.shift()
            temp2.unshift('(')
            temp2.pop()
            temp2.push(text)
            temp2.push(')')
        }else{
            temp2.unshift('(')
            temp2.push(')')
        }
        temp2 = temp2.toString().replaceAll(",","")
        result.innerText = `${temp1[0]}${symbol}${temp2}`
        console.log(temp2)
        return;
    }
    
    if(result.innerText == '0'){
        if(text !== '.'){
            if(text.split('').length !=3){
                result.innerText = text
                return;
            }
        }
    }
    // else add text next of innerText
    if(toAddEmpthEndOfResult()){
        result.innerText += ` ${text}`
        return
    }
        result.innerText += text 
}

// backspace 
function backspace(){
    // first we get innerText of result
    let temp = result.innerText
    // next we split it into characters and get array
    temp = temp.split('')
    // next we change value of list item of array to empty
    if(temp[temp.length - 1] == symbol){
        symbol=''
    }
    temp[temp.length - 1] = ''
    // next we filter value that if value doesn't equal to empty
    temp = temp.filter(function(element){
        return element != ''
    })
    // next we change array to string
    temp = temp.toString().replaceAll(",","")
    // final we write a temp text to result
    result.innerText = temp
}

function calculate(){
    let answer = result.innerText
    let temp = result.innerText.split(symbol)
    temp[1] = temp[1].split('(').toString().replaceAll(',',"")
    temp[1] = temp[1].split(')').toString().replaceAll(',',"")
    console.log(temp)
    switch(symbol){
        case ' + ':
            condition.innerText = `${temp[0]} + ${temp[1]}`
            answer = (Number(temp[0]) + Number(temp[1])).toFixed(2)
            break;
        case ' - ':
            condition.innerText = `${temp[0]} - ${temp[1]}`
            answer = (Number(temp[0]) - Number(temp[1])).toFixed(2)
            break;
        case ' / ':
            condition.innerText = `${temp[0]} / ${temp[1]}`
            answer = (Number(temp[0]) / Number(temp[1])).toFixed(2)
            break;
        case ' x ':
            condition.innerText = `${temp[0]} x ${temp[1]}`
            answer = Number(temp[0]) * Number(temp[1]).toFixed(2)
            break;
    }
    symbol = ''
    flag=false
    return answer
}

// check symbol have or not
function checkSymbol(){
    let temp
    let isSecondSizeIsEmpty = false

    // check if user write like this : 5+ then we cannot add pont into innerText of result
    switch(symbol){
        case " + ":
            temp = result.innerText.split(" +")
            console.log(temp)
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break;
        case " / ":
            temp = result.innerText.split(" /")
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break;
        case " - ":
            temp = result.innerText.split(" -")
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break;
        case " x ":
            temp = result.innerText.split(" x")
            if(temp[1] == ''){
                isSecondSizeIsEmpty = true
            }else{
                isSecondSizeIsEmpty = false
            }
            break
    }
    console.log(isSecondSizeIsEmpty)

    return isSecondSizeIsEmpty;
}

//write point into text
function writePointToResult(){
    // check if text have pont then doesn't add another point
    if(symbol === ''){
        if(!result.innerText.includes(".") && !checkSymbol()){
            writeTextIntoElement(".")
        }
    }else{
        let temp = result.innerText.split(symbol)
        if(temp[1] !== '' && !temp[1].includes('.')){
            writeTextIntoElement(".")
        }
    }
}

//plus function
function plus(){
    if(!result.innerText.includes(" + ") && !checkSymbol() && result.innerText != ''){
        if(symbol==''){
            symbol = " + "
        }
        let temp = result.innerText.split(symbol)
        console.log(temp)
        if(temp[1] != undefined){
            result.innerText = calculate()
        }
        symbol = " + "
        writeTextIntoElement(" + ")
        return;
    }
    let temp = result.innerText.split(symbol)
    temp[1] = temp[1].split('(').toString().replaceAll(',',"")
    temp[1] = temp[1].split(')').toString().replaceAll(',',"")
    console.log(temp)
    if(temp.length == 2 && temp[1] != ''){
        let answer = Number(temp[0]) + Number(temp[1])
        condition.innerText = `${temp[0]} + ${temp[1]}`
        result.innerText = String(answer) + " + "
    }
}

//divide function
function divide(){
    if(!result.innerText.includes(" / ") && !checkSymbol() && result.innerText != ''){
        if(symbol==''){
            symbol = " / "
        }
        let temp = result.innerText.split(symbol)
        console.log(temp)
        if(temp[1] != undefined){
            result.innerText = calculate()
        }
        symbol = " / "
        writeTextIntoElement(" / ")
        return;
    }
    let temp = result.innerText.split(symbol)
    temp[1] = temp[1].split('(').toString().replaceAll(',',"")
    temp[1] = temp[1].split(')').toString().replaceAll(',',"")
    if(temp.length == 2 && temp[1] != ''){
        let answer = Number(temp[0]) / Number(temp[1]).toFixed(2)
        condition.innerText = `${temp[0]} / ${temp[1]}`
        result.innerText = String(answer) + " / "
    }
}

// subtruction
function subtruction(){
    // if(result.innerText[0] == " - "){
    //     symbol = " - "
    //     writeTextIntoElement(" - ")
    //     return
    // }
    if(!result.innerText.includes(" - ") && !checkSymbol() && result.innerText != ''){
        if(symbol==''){
            symbol = " - "
        }
        let temp = result.innerText.split(symbol)
        console.log(temp)
        if(temp[1] != undefined){
            result.innerText = calculate()
        }
        symbol = " - "
        console.log(symbol)
        writeTextIntoElement(" - ")
        console.log(result.innerText.split(''))
        return;
    }
    let temp = result.innerText.split(symbol)
    temp[1] = temp[1].split('(').toString().replaceAll(',',"")
    temp[1] = temp[1].split(')').toString().replaceAll(',',"")
    console.log(temp)
    if(temp.length == 2 && temp[1] != ''){
        let answer = (Number(temp[0]) - Number(temp[1])).toFixed(2)
        condition.innerText = `${temp[0]} - ${temp[1]}`
        result.innerText = String(answer) + " - "
    }
}

// multiplication
function multiplication(){
    if(!result.innerText.includes(" x ") && !checkSymbol() && result.innerText != ''){
        if(symbol==''){
            symbol = " x "
        }
        let temp = result.innerText.split(symbol)
        console.log(temp)
        if(temp[1] != undefined){
            result.innerText = calculate()
        }
        symbol = " x "
        writeTextIntoElement(" x ")
        return;
    }
    let temp = result.innerText.split(" x ")
    temp[1] = temp[1].split('(').toString().replaceAll(',',"")
    temp[1] = temp[1].split(')').toString().replaceAll(',',"")
    if(temp.length == 2 && temp[1] != ''){
        let answer = (Number(temp[0]) * Number(temp[1])).toFixed(2)
        condition.innerText = `${temp[0]} x ${temp[1]}`
        result.innerText = String(answer) + " x "
    }
}

// equal
function equal(){
    result.innerText = calculate()
}

// percent
function percent(){
    result.innerText = (Number(result.innerText)/100).toFixed(2)
}

// change sign
function changeSign(){
    if(symbol == ''){
        result.innerText = -(Number(result.innerText))
    }else{
        let temp1 = result.innerText.split(symbol)
        let temp2 = temp1[1].split('')
        console.log(temp2)
        if(temp2[0] == '('){
            flag=false
            temp2[0] = ''
            temp2[1] = ''
            temp2[temp2.length-1] = ''
            temp2 = temp2.filter(function(element){
                return element !== ''
            })
        }else{
            flag=true
            console.log(temp2)
            temp2.unshift('-')
            temp2.unshift('(')
            temp2.push(')')
        }
        temp2 = temp2.toString().replaceAll(",","")
        console.log(temp2)
        result.innerText = `${temp1[0]}${symbol}${temp2}`
    }
}

function toAddEmpthEndOfResult(){
    let temp = result.innerText.split('')
    if(temp[temp.length-1] == "-" || temp[temp.length-1] == "+" || temp[temp.length-1] == "/" || temp[temp.length-1] == "x"){
        return true;
    }
}