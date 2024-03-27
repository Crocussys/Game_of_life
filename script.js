var container = document.getElementById("container");

const cell_size = 20;
const cell_margin = 2;
const activeColor = "white";
const backgroundColor = "black";

const cell_with_margin_size = cell_size + cell_margin * 2;
const height = document.documentElement.scrollHeight;
const width = document.documentElement.scrollWidth;
const n = (height - height % cell_with_margin_size) / cell_with_margin_size;
const m = (width - width % cell_with_margin_size) / cell_with_margin_size;

var run_flag = false;
var mouse_flag = false;
var interId;

let arr = [];
for (let i = 0; i < n; i++) {
    arr.push([]);
    let line = document.createElement("div");
    line.className = "line";
    for (let j = 0; j < m; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        // let rand = Math.floor(Math.random() * 2) === 1;
        let rand = false;
        if (rand){
            cell.style.background = activeColor;
            arr[i].push(1);
        }else{
            cell.style.background = backgroundColor;
            arr[i].push(0);
        }
        cell.mouse = false;
        cell.x = i;
        cell.y = j;
        cell.addEventListener("mouseover", () => {
            if (mouse_flag && !run_flag && !cell.mouse){
                cell.mouse = true;
                cell.style.background = cell.style.background === activeColor ? backgroundColor : activeColor;
                arr[cell.x][cell.y] = arr[cell.x][cell.y] === 1 ? 0 : 1;
            }
        });
        cell.addEventListener("mousedown", () => {
            if (!run_flag){
                cell.mouse = true;
                cell.style.background = cell.style.background === activeColor ? backgroundColor : activeColor;
                arr[cell.x][cell.y] = arr[cell.x][cell.y] === 1 ? 0 : 1;
            }
        });
        cell.addEventListener("mouseout", () => {
            if (cell.mouse){
                cell.mouse = false;
            }
        })
        line.append(cell);
    }
    container.append(line);
};

function update(){
    let newArr = [];
    for (let i = 0; i < n; i++) {
        newArr.push([]);
        for (let j = 0; j < m; j++) {
            let i_ = (i + 1) % n;
            let j_ = (j + 1) % m;
            let _i = i - 1 < 0 ? n - 1 : i - 1;
            let _j = j - 1 < 0 ? m - 1 : j - 1;
            let sum = arr[_i][_j] + arr[_i][j] + arr[_i][j_] + arr[i][_j] + arr[i][j_] + arr[i_][_j] + arr[i_][j] + arr[i_][j_];
            if (arr[i][j] === 1) {
                if (sum < 2 || sum > 3) newArr[i].push(0);
                else newArr[i].push(1);
            } else {
                if (sum === 3) newArr[i].push(1);
                else newArr[i].push(0);
            }
        }
    }
    let lines = container.getElementsByClassName("line");
    for (let i = 0; i < n; i++) {
        let cells = lines[i].getElementsByClassName("cell");
        for (let j = 0; j < m; j++) {
            cells[j].style.background = newArr[i][j] === 1 ? activeColor : backgroundColor;
        }
    }
    arr = newArr;
};

document.addEventListener("keydown", (event) => {
    if (event.key === " "){
        run_flag = run_flag === true ? false : true;
        if (run_flag){
            interId = setInterval(update, 100);
        }else{
            clearInterval(interId);
        }
    }
});

document.addEventListener("mousedown", (event) => {
    if (event.button === 0) mouse_flag = true;
});

document.addEventListener("mouseup", (event) => {
    if (event.button === 0) mouse_flag = false;
});