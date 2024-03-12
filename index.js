require('dotenv').config()

function helloWorld(){
    console.log('Hello')
}

function getEnvar(){
    const firstVar = process.env.FIRST_VAR
    console.log(firstVar)
}

getEnvar()