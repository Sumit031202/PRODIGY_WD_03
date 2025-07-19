let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let para = document.querySelector(".para");
let turn = true;
let t = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // prevent overwriting
        box.innerText = turn ? "X" : "O";
        box.style.color = turn ? "#BA0021" : "greenyellow";
        turn = !turn;
        t++;
        if (checkWinner()) return;
        if (t === 9) {
            para.innerText = "Draw";
            resetBtn.innerText = "New Game";
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let value1 = boxes[pattern[0]].innerText;
        let value2 = boxes[pattern[1]].innerText;
        let value3 = boxes[pattern[2]].innerText;

        if (value1 !== "" && value1 === value2 && value2 === value3) {
            para.innerText = `Hurray! Player ${value1} won`;
            resetBtn.innerText = "New Game";
            disableBoxes();
            return true;
        }
    }
    return false;
};

const disableBoxes = () => {
    boxes.forEach((box) => box.style.pointerEvents = "none");
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
    });
    turn = true;
    t = 0;
};

resetBtn.addEventListener("click", () => {
    enableBoxes();
    para.innerText = "";
    resetBtn.innerText = "Reset Game";
});
