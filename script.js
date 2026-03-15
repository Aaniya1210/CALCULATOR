class Calculator {

    constructor(previousOperandTextElement,currentOperandTextElement)
    {
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear()
    }
    clear()
    {
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined;


    }
    delete()
    {
        this.currentOperand=this.currentOperand.toString().slice(0,-1)

    }
    appendNumber(number)
    {
        if(number==='.'&&this.currentOperand.includes('.')) return
       this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperations(operation)
    {
        if(this.currentOperand==='')return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''

    }
    compute()
    {
        let computation
        const prev=parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(curr)) return
        switch(this.operation){
            case'+':
            computation=prev+curr
            break
            case'-':
            computation=prev-curr
            break
            case'*':
            computation=prev*curr
            break
            case'÷':
            computation=prev/curr
            break
            default:
                return
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''
    }
    getDisplayNumber(number)
    {
        const stringnumber=number.toString()
        const intDig=parseFloat(stringnumber.split('.')[0])
        const DecDig=(stringnumber.split('.')[1])
        let integerdisplay
        if(isNaN(intDig))
            integerdisplay=''
        else
            integerdisplay=intDig.toLocaleString('en',{maximumFractionDigits:0})
        if(DecDig!=null)
            return `${integerdisplay}.${DecDig}`
        else
            return integerdisplay

    }
    updateDisplay()
    {
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null)
        {
            this.previousOperandTextElement.innerText=
            `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
        }
        else
            this.previousOperandTextElement.innerText=''
    }
}


const numberButtons= document.querySelectorAll('[data-numbers]')
const operationButtons= document.querySelectorAll('[data-operations]')
const equalsButton= document.querySelector('[data-equals]')
const allclearButton= document.querySelector('[data-allclear]')
const delButton=document.querySelector('[data-delete]')
const previousOperandTextElement= document.querySelector('[data-previous-operands]')
const currentOperandTextElement= document.querySelector('[data-current-operands]')


 const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement)
 numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
 })
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperations(button.innerText)
        calculator.updateDisplay()
    })
 })
 equalsButton.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
 })
allclearButton.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
 })
 delButton.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
 })



