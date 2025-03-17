//getting info from user
let month = prompt('Enter a number of month, please') - 1;                  
let year = prompt('Enter a year, please!');
let isValidData = true;

if(isNaN(month) || isNaN(year) || month === null || year === null){
  alert('Enter valid data, please!');
  isValidData = false;
} 
let date = new Date(year,month);
//creating basic elements for table
const body = document.querySelector('body');
body.className = 'wrapper';

const table = document.createElement('table');
table.className = 'table';
body.append(table);

//creating table header with month and year from user

let nameOfMonths = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const header = document.createElement('thead');
const headerRow = header.insertRow();

const yearBackCell = document.createElement('th');
const yearBackBtn = document.createElement('button');
yearBackBtn.innerHTML = "&laquo;";
yearBackCell.append(yearBackBtn)
headerRow.append(yearBackCell);

const monthBackCell = document.createElement('th');
const monthBackBtn = document.createElement('button');
monthBackBtn.innerHTML = "&lsaquo;";
monthBackCell.append(monthBackBtn);
headerRow.append(monthBackCell);

const headerTh = document.createElement('th');
headerTh.colSpan = 3;
headerTh.textContent = isValidData === true ? `${nameOfMonths[date.getMonth()]} ${date.getFullYear()} года` : "Error: wrong input!";
headerRow.append(headerTh);

const monthForwardCell = document.createElement('th');
const monthForwardBtn = document.createElement('button');
monthForwardBtn.innerHTML = '&rsaquo;'
monthForwardCell.append(monthForwardBtn)
headerRow.append(monthForwardCell);

const yearForwardCell = document.createElement('th');
const yearForwardBtn = document.createElement('button');
yearForwardBtn.innerHTML = "&raquo;"
yearForwardCell.append(yearForwardBtn)
headerRow.append(yearForwardCell);

table.append(header);

//creating table body 
const tableBody = document.createElement('tbody');
table.append(tableBody);
(function init(){
    for(let i = 1; i<= 7; i++){
        let row = tableBody.insertRow()
        for(let j = 1; j<=7; j++){
            let cell = row.insertCell();
          cell.className = 'usual-cell';
        }
    }
})();
// adding the names of the week days in the first row 
let nameOfDaysForHeader = ['пн', 'вт', 'ср', 'чт', 'пт', 'суб', 'вс']
const rows = [...table.rows];
const cellsOfFirstRow = rows[1].cells;

if(isValidData){
    for(let i = 0; i < cellsOfFirstRow.length; i++ ){
        cellsOfFirstRow[i].textContent = `${nameOfDaysForHeader[i]}`;
    }
}
// puttiing the numbers of the days in td cells for particular month
let tableBodyCells = []
for(let i = 2; i < rows.length; i++){
    tableBodyCells.push(...Array.from(rows[i].cells));
}

function fillTableCells(month, year){
    let date = new Date(year,month);
    let lastDateCurrentMonth = new Date(year, month + 1, 0)
    let currentDate = new Date();
    let lastDatePreviousMonth = new Date(year, month, 0);
    lastDatePreviousMonth = lastDatePreviousMonth.getDate();
    let beforeMonthCellsCount = 0;

//define a day of the week for the first day of the month
    date.setDate(1)
    let firstDayOfMonth = nameOfDaysForHeader.indexOf(nameOfDaysForHeader[date.getDay()-1]);
    firstDayOfMonth = firstDayOfMonth === -1 ? 6 : firstDayOfMonth;

if(isValidData){
  //days before seleccted month
  if(firstDayOfMonth !=0){
    for(let i = firstDayOfMonth-1; i >= 0; i-- ){
      tableBodyCells[i].textContent = lastDatePreviousMonth;
      tableBodyCells[i].className = 'usual-cell';
      beforeMonthCellsCount++;
      lastDatePreviousMonth--;
    }  
  }
  //days of the selected month
for(let i = 1; i <= lastDateCurrentMonth.getDate(); i++){
    date.setDate(i);  
    tableBodyCells[firstDayOfMonth].textContent = `${date.getDate()}`;

  if(currentDate.toDateString() === date.toDateString()){
    tableBodyCells[firstDayOfMonth].className = 'current-day';
  }
  else if(date.getDay() === 0 || date.getDay() === 6){
      tableBodyCells[firstDayOfMonth].className = 'weekend-cell';
    }
  else {
    tableBodyCells[firstDayOfMonth].className = 'selected-cell';
  }
    firstDayOfMonth++;
  }
  //days after the selected month
  let filledCellsCount = beforeMonthCellsCount + lastDateCurrentMonth.getDate();
  for(let i = filledCellsCount, j = 1; i < tableBodyCells.length; i++, j++){
    tableBodyCells[i].textContent = j;
    tableBodyCells[i].className = 'usual-cell';
  }
 }
}

fillTableCells(month, year);

function  changeHeaader (year, month) {
    let date = new Date(year,month);
    headerTh.textContent =  `${nameOfMonths[date.getMonth()]} ${date.getFullYear()} года`
}

function yearBackBtnHandler (){
 year--;
 changeHeaader (year, month)
 fillTableCells(month, year);
}

yearBackBtn.addEventListener('click', yearBackBtnHandler);

function monthBackBtnHandler (){
    month--;
    changeHeaader (year, month)
    fillTableCells(month, year); 
   }
   
monthBackBtn.addEventListener('click', monthBackBtnHandler);

function yearForwardBtnHandler (){
    year++;
    changeHeaader (year, month)
    fillTableCells(month, year);  
}
   
yearForwardBtn.addEventListener('click', yearForwardBtnHandler);

function monthForwardBtnHandler (){
    month++;
    changeHeaader (year, month)
    fillTableCells(month, year);
   }

monthForwardBtn.addEventListener('click', monthForwardBtnHandler);


