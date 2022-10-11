class Calculator{
     constructor(previousOperandTextElement,currentOperandTextElement){
     this.previousOperandTextElement=previousOperandTextElement
     this.currentOperandTextElement=currentOperandTextElement
     this.clear()
    }
 
clear(){
      this.previousOperand = ''
      this.currentOperand = ''
      this.operation = ""
     }

appendNumber(number){
    //TO CHECK ONLY ONE PERIOD
    if(number === "." && this.currentOperand.includes('.') ) return
    this.currentOperand=this.currentOperand.toString()+number.toString()

    }

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)

}
chooseOperation(operation){
     if(this.currentOperand ==='')return
     if(this.previousOperand !== ''){
         this.compute()
       }
       this.operation=operation
       this.previousOperand=this.currentOperand
       this.currentOperand=''
 }

 compute(){
       let computation
       const prev =parseFloat(this.previousOperand)
       const current=parseFloat(this.currentOperand)
       if(isNaN(prev)||isNaN(current)) return
       switch(this.operation){
        case '+':
                computation=prev+current
                break
        case '-':
                 computation=prev-current
                break
        case '*':
                 computation=prev*current
                break
        case '+':
                 computation=prev/current
                 break
        default :
               return
        }
    this.currentOperand=computation
    this.operation= ''
    this.previousOperand=''
  
}
getDisplayNumber(number){
    // TO DISPLAY DECIMAL NUMBER
    const stringNumber = number.toString()
    // TO SPLIT NUMBER INTO INTEGER AND DECIMAL
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)){
     integerDisplay=''
    } else {
        //TO NUMBER IN COMMAS
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if(decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

updateDisplay(){
    this.currentOperandTextElement.innerText =this.getDisplayNumber(this.currentOperand)
    // to display previous number and operation
    if(this.operation != null){
        this.previousOperandTextElement.innerText =
           `${this.getDisplayNumber(this.previousOperand)}  ${this.operation}`
    }
    else(
        this.previousOperandTextElement =''
    )

}

}


  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')











const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement)
 
numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button=>{
      calculator.compute()
      calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
  })