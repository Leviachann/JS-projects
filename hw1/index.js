const display = document.querySelector(".display");
const sdisplay = document.querySelector(".sdisplay");
const buttons = document.querySelectorAll("td");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let soutput="";
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
    soutput = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
    soutput = soutput.toString().slice(0, -1);
  } else {
    if (output === "" && specialChars.includes(btnValue)) return;
    
    if (specialChars.includes(btnValue)) {
      soutput = ""; // Clear soutput when an operator is pressed
    }else{
    soutput += btnValue;
    }
    
    output += btnValue;
  }
  display.value = output;
  sdisplay.value = soutput;
};

buttons.forEach((button) => {
  
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
  
function LightMode(){
    document.getElementById('mainstruct').classList.add('lightbg');
    document.getElementById('nightday').classList.add('lightswitch');
    document.getElementById('result').classList.add('lightheadings');
    document.getElementById('calculation').classList.add('lightheadings');
    document.getElementById('percentage').classList.add('textlight');
    document.getElementById('backspace').classList.add('textlight');
    document.getElementById('divide').classList.add('textlight');
    document.getElementById('divide').classList.add('lightbuttons');
    document.getElementById('seven').classList.add('textlight');
    document.getElementById('eight').classList.add('textlight');
    document.getElementById('nine').classList.add('textlight');
    document.getElementById('multiply').classList.add('textlight');
    document.getElementById('multiply').classList.add('lightbuttons');
    document.getElementById('four').classList.add('textlight');
    document.getElementById('five').classList.add('textlight');
    document.getElementById('six').classList.add('textlight');
    document.getElementById('minus').classList.add('textlight');
    document.getElementById('minus').classList.add('lightbuttons');
    document.getElementById('one').classList.add('textlight');
    document.getElementById('two').classList.add('textlight');
    document.getElementById('three').classList.add('textlight');
    document.getElementById('plus').classList.add('textlight');
    document.getElementById('plus').classList.add('lightbuttons');
    document.getElementById('doublezero').classList.add('textlight');
    document.getElementById('zero').classList.add('textlight');
    document.getElementById('dot').classList.add('textlight');
    document.getElementById('equal').classList.add('textlight');
    document.getElementById('equal').classList.add('lightbuttons');
    document.getElementById('endline').classList.add('linelight');
    document.getElementById('sunicon').classList.remove('fa-sun');
    document.getElementById('sunicon').classList.add('fa-circle');
    document.getElementById('moonicon').classList.remove('fa-circle');
    document.getElementById('moonicon').classList.add('fa-moon');
}
function DarkMode(){
    document.getElementById('mainstruct').classList.remove('lightbg');
    document.getElementById('nightday').classList.remove('lightswitch');
    document.getElementById('result').classList.remove('lightheadings');
    document.getElementById('calculation').classList.remove('lightheadings');
    document.getElementById('percentage').classList.remove('textlight');
    document.getElementById('backspace').classList.remove('textlight');
    document.getElementById('divide').classList.remove('textlight');
    document.getElementById('divide').classList.remove('lightbuttons');
    document.getElementById('seven').classList.remove('textlight');
    document.getElementById('eight').classList.remove('textlight');
    document.getElementById('nine').classList.remove('textlight');
    document.getElementById('multiply').classList.remove('textlight');
    document.getElementById('multiply').classList.remove('lightbuttons');
    document.getElementById('four').classList.remove('textlight');
    document.getElementById('five').classList.remove('textlight');
    document.getElementById('six').classList.remove('textlight');
    document.getElementById('minus').classList.remove('textlight');
    document.getElementById('minus').classList.remove('lightbuttons');
    document.getElementById('one').classList.remove('textlight');
    document.getElementById('two').classList.remove('textlight');
    document.getElementById('three').classList.remove('textlight');
    document.getElementById('plus').classList.remove('textlight');
    document.getElementById('plus').classList.remove('lightbuttons');
    document.getElementById('doublezero').classList.remove('textlight');
    document.getElementById('zero').classList.remove('textlight');
    document.getElementById('dot').classList.remove('textlight');
    document.getElementById('equal').classList.remove('textlight');
    document.getElementById('equal').classList.remove('lightbuttons');
    document.getElementById('endline').classList.remove('linelight');
    document.getElementById('moonicon').classList.remove('fa-moon');
    document.getElementById('moonicon').classList.add('fa-circle');
    document.getElementById('sunicon').classList.remove('fa-circle');
    document.getElementById('sunicon').classList.add('fa-sun');
}