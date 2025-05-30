// IGNORE LINES 1-32 FOR NOW
// Initialized vars 
var debug_mode = 0;
var data_save_method = 'csv_server_py';
var normal_exit = false;
var window_height = window.screen.height;
var detectfocus=0
var isinfocus=1
document.addEventListener('mouseleave', e=>{
  detectfocus=detectfocus+1
  isinfocus=0
  //this is to see if user are focus or not
})
document.addEventListener('visibilitychange', e=>{
   if (document.visibilityState === 'visible') {
 //report that user is in focus
 isinfocus=1
  } else {
  detectfocus=detectfocus+1
  isinfocus=0
  //this is to see if user are focus or not
  }  
})
var subject_id = jsPsych.randomization.randomID(8);
let trial_num = 0
// Load PsiTurk
var psiturk = new PsiTurk(uniqueId, adServerLoc, mode);
var condition = psiturk.taskdata.get('condition') + 1; // they do zero-indexing
// Initialize timeline
var timeline = []
// IGNORE END

// Operation Span Experiment
// Name: 


// Look at modifier for writing instructions and defining your operations + letters

// Optional: Generate a random list of letters that is the length of your designated trial length and can span multiple blocks
// Optional: Create probe trials that happen at random
// High level optional: Give feedback on the screen if they do not respond to problem

// 1. Read through these sections-- you will not have to change anything here
//welcome page
var welcome = {
  type: 'survey-html-form',
  html: "<label for='worker_id'>Enter your Prolific Worker ID. Please make sure this is correct! </label><br><input type='text' id='worker_id' name='worker_id' required><br><br>",
  on_finish: function (data) {
    data.trial_type = "id_enter"
    window.useridtouse=data.responses
    window.useridtouse = useridtouse.split('"')[3];
    subject_id=useridtouse
  }
}
//welcome page end

//Instruction page
function createinstruct(instruct_1,number){
  // This instruction takes the html in that was made in modifier.js, and outputs the page and logs the instruction number as well
  var intro={
    type: 'html-keyboard-response',
    choices: ['space'],
    stimulus: instruct_1,
    on_finish: function (data) {
      data.trial_type = 'intro_'+number;
      data.stimulus='instruct'
    }
  }
  return intro
}

function create_full_intro(instruct,instructnames){
  // This loops across all instructions to display them all
  intro={}
for (let i = 0; i < instructnames.length; i++) {
  var instructname=instructnames[i]
  intro[i] = createinstruct(instruct[instructname],i)
}return intro
}

// Initialize variables that represent the set of instruction pages
intro_learn=create_full_intro(instruct,instructnames)


// This is where your timeline starts. We use timeline.push() for single instructions and timelinepushintro() for a set of instructions
timeline.push(welcome)
timelinepushintro(intro_learn,instructnames)


//Instruction page end

// Q1 End

// Main task structure
// Optional: Create multiple blocks of learning
// Optional 2: Figure out how to save the data locally (as csv)

for (i=0;i<num_learn_trials;i++) {
  var math_phase = {
    type: 'html-keyboard-response',
    choices: ['1','2'],
    response_ends_trial: true,
    stimulus:create_math_problem(math_list,trial_num),
    stimulus_duration:3000,
    trial_duration:3000,
    on_finish: function(data) {
      data.trial_type = 'math_phase';
      data.stimulus= // Q2: What can I add here to display the specific math problem? HINT: look at the stimulus function above
      data.math_response = data.key_press - 48
      // Optional: add some way to score in the data whether it was correct or incorrect
    }
  }
  timeline.push(math_phase)
  var letter_phase = {
    type: 'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus: false,// Q3: Remove false and add something here (check room maker)//
    stimulus_duration:1000,
    trial_duration:1000,
    response_ends_trial: false,
    on_finish: function(data) {
      data.trial_type = 'letter_phase';
      data.stimulus= letter_list[trial_num]
      // Optional: add some way to score in the data whether it was correct or incorrect
    } 
  }
  timeline.push(letter_phase);
  var thebreak= {
    type: 'html-keyboard-response',
    choices:jsPsych.NO_KEYS,
    trial_duration: 400,
    stimulus:'<p>+</p>',
    on_finish: function(data) {
      data.trial_type='thebreak'
      data.stimulus='thebreak'
    }
  }
  timeline.push(thebreak); // ITI
  trial_num += 1 // Starts next trial
}

var letter_recall = {
  type: 'survey-text',
  questions: [
    {prompt: "List all the letters you mentioned below", rows: 1, columns: 40}
  ],
  on_finish: function(data){
    var response = JSON.parse(data.responses)
    data.letters_recalled = response.Q0
    // Optional: Try to collect accuracy here
  }
};
timeline.push(/* Q4: what do you put here?*/)


// final thank you
var thank_you = {
  type: false, //Q5: What have we been putting here when the window is something that requires a key press (remove the false)
  choices: [/* Q6 What should be added here given the text below? */],
  stimulus: "<p>(Press space and see your data!) <br> Congratulations, you are all done!</p><p>The secret code to enter at the beginning screen is: AJFHBG897 (for Prolific) </p><p> Please make sure to submit the HIT and email uciccnl@gmail.com if you had any issues! </p>",
  on_finish: function (data) {
    data.trial_type = 'thank_you';
    data.detectfocus = detectfocus;
    save_data(true)
  }
}

timeline.push(thank_you);


// Q7 and Q8 are on modifier.js

//time line here

jsPsych.init({
  timeline: timeline,
  preload_images: all_images,
  max_load_time: 600000,
  on_finish: function () {
    psiturk.recordUnstructuredData("subject_id", subject_id);
    jsPsych.data.displayData('csv')
    // save_data(true)
  },
})
