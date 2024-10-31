import React from "react";

class Employee {
    constructor(
        private _empName : string,
        private _age? : number,
        private _empJob? : string
    ){}
    printEmp = () : void => {
        console.log(this._empName + '의 나이는' + this._age + '이고, 직업은' + this._empJob + '입니다.')
    }
}

let employee1 = new Employee('kim', 30, '소프트웨어개발자')
