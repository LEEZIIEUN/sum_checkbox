let elements1 = document.querySelectorAll('.element-1 td');
let elements2 = document.querySelectorAll('.element-2 td');
let elements = [...elements1, ...elements2];
let elements1Sum = 0;
let elements2Sum = 0;

// 모든 월 합 구하기
elements1.forEach(element=>{
  elements1Sum += Number(element.textContent.replace(',',''))
});

elements2.forEach(element=>{
  elements2Sum += Number(element.textContent.replace(',',''))
});

document.getElementById("sum-1").innerHTML = elements1Sum.toLocaleString();
document.getElementById("sum-2").innerHTML = elements2Sum.toLocaleString();

// 각 월의 합 구하기
let printMonthSum = document.getElementsByClassName('print-month-sum');

for (let i = 1; i <= 12; i++) {
  let result = [];
    elements.forEach(element => {
        if (element.getAttribute('data-num') == i.toString()) {
            result.push(Number(element.textContent.replace(',','')));
        }
    });
    
    document.getElementById("print-month-sum").innerHTML += `<td data-num="${i}">${(result[0]+result[1]).toLocaleString()}</td>`;
}

// 총 합 구하기
document.getElementById("print-month-sum").innerHTML +=  `<td data-num="total-sum">${(elements1Sum+elements2Sum).toLocaleString()}</td>`;



