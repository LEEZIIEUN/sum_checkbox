let elements1 = document.querySelectorAll('.element-1 td');
let elements2 = document.querySelectorAll('.element-2 td');
let elements = [...elements1, ...elements2];
let elements1Sum = 0; // 모든 월의 첫번째 줄 값의 합
let elements2Sum = 0; // 모든 월의 두번째 줄 값의 합
let checkboxes = document.querySelectorAll("input[type='checkbox']");
let checkAllCB = document.querySelector("input[type='checkbox'][name='total']");
let monthCB = document.querySelectorAll("input[type='checkbox'][name='m']");
let quarterCB = document.querySelectorAll("input[type='checkbox'][name='q']");
let halfCB = document.querySelectorAll("input[type='checkbox'][name='h']");
let checkedMonth = new Set();
let arr = new Array();
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


checkboxes.forEach(checkbox=>checkbox.addEventListener("change", selectBoxes));

function selectBoxes() {
  let num = this.getAttribute("value");
  let type = this.getAttribute('name');
  let isChecked = this.checked;
  // 전체 체크박스를 눌렀을 때
  if (type == 'total'){
    checkboxes.forEach(elements => {
      if(elements.value != 'total'){
      isChecked?checkedMonth.add(Number(elements.value)):checkedMonth.clear()};
    })
  }
  // 각 월 체크박스를 눌렀을 때
  if (type == 'm') {
    isChecked?checkedMonth.add(Number(num)):checkedMonth.delete(Number(num))
  } else { // 분기 체크박스를 눌렀을 때
    let calc = type == 'q' ? 3 : 6;
    let t = num * calc;
    for (let i = t; i > t - calc; i--) {    
      isChecked?checkedMonth.add(i):checkedMonth.delete(i)
    };
  }
  console.log(checkedMonth);
  checkRender();
}

function checkRender() {
  const months = Array.from(checkedMonth);

  for (const cb of monthCB) {
    const month = Number(cb.value);
    if (months.includes(month)) {
      cb.checked = true;
    } else {
      cb.checked = false;
    }
  }
  (checkedMonth.size >= 12)?(checkAllCB.checked = true)&&checkboxes.forEach(checkbox=>checkbox.checked=true):(checkAllCB.checked = false);

  (checkedMonth.size == 0)?(checkboxes.forEach(checkbox=>checkbox.checked=false)):'';

  checkedMonth.has(1&&2&&3)?((input[type='checkbox'][name='q'][value='1']).checked = true):console.log(`1분기꺼짐`);
  checkedMonth.has(4&&5&&6)?console.log(`2분기켜짐`):console.log(`2분기꺼짐`);
  checkedMonth.has(7&&8&&9)?console.log(`3분기켜짐`):console.log(`3분기꺼짐`);
  checkedMonth.has(10&&11&&12)?console.log(`4분기켜짐`):console.log(`4분기꺼짐`);
}
selectBoxes();