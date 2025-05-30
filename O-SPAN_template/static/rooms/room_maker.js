function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;
    return str.replace(/%s/g, () => args[i++]);
}

function create_math_problem(math_problem, trial_num) {
  return parse("<p style='position:absolute;top: 50%;right: 50%;transform: translate(50%, -50%);font-size: 50px;color:black;'>%s</p><p style='position:absolute;top: 80%;right: 50%;transform: translate(50%, -50%);font-size: 25px;color:black;'>Press '1' if the problem is correct and '2' for incorrect</p>"
  ,math_problem[trial_num])
  
}

function create_letter_problem(presented_letter, trial_num) {
  return parse("<p style='position:absolute;top: 50%;right: 50%;transform: translate(50%, -50%);font-size: 50px;color:black;'>%s</p>"
  ,presented_letter[trial_num])
  
}

//function to push the instruct
function timelinepushintro(intro,instructnames){
  for (let i = 0; i < instructnames.length; i++){
    timeline.push(intro[i],)
  }
}

function timelinepresent(intro, instructnames,directmemory_phase) {
  let timelinetemp = [];
  
  for (let i = 0; i < instructnames.length; i++) {
    timelinetemp.push(intro[i]);
  }
  timelinetemp.push(directmemory_phase);
  
  jsPsych.addNodeToEndOfTimeline({ timeline: timelinetemp }, jsPsych.resumeExperiment);
}