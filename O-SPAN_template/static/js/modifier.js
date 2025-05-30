//debug moode on/off
debugmode= true
if (debugmode==true){
  num_learn_trials = 5
}else{
  num_learn_trials = 25
}

//Text for instruction

// Q7: Change instructions to reflect typical operation span task instructions
instruct_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 55px;margin-bottom:40px'><b>Welcome!</b></p><p style ='font-size: 50px;line-height:1.5'>Write something here</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_2="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 50px;line-height:1.5'>You can <b>bold</b> or <u>underline</u> like so </p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_3="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 50px;line-height:1.5'>Images are presented like so: <br><img src= '../static/images/isi.png' width='100' height='100'></img><br /><br><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",

instructnames = ["instruct_1","instruct_2","instruct_3"]// IF you want to add or decrease number of page for instruct, just delete or add var name here.
instruct={instruct_1,instruct_2,instruct_3} // IF you want to add or decrease number of page for instruct, just delete or add var here.


// Q8: Add your own list of math problems and letters to be recalled
math_list = [

]

letter_list = [

]

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

