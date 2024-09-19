/*
 *  Test phase of the experiment
 */

// Plugins
import keyboardResponse from "@jspsych/plugin-html-keyboard-response";
import categorizeHtml from '@jspsych/plugin-categorize-html';

// Import required functions
import { getBlockData } from "./experimentUtility";
import { filterTestTrials } from "./experimentUtility";

// Import global variables
import { trialOrder } from "./trainingPhase";

// Local Variables 
var blockNumber = 1;

var testData = [];
var blockData = [];

var keepLooping = true;

// Filter for test trials
testData = filterTestTrials(trialOrder);

// Get initla block data
blockData = getBlockData(testData, blockNumber);

// Create the test phase
export function testPhase(jsPsych) {
  var testPhaseTimeline = {
    // Timeline for the training block
    timeline:
    [
      { // Timeline for block
        timeline: [
          {
            type: categorizeHtml,
            // If Stim 2 is not present, only present stim 1 in the center of the screen 
            stimulus: function() {
              if (jsPsych.timelineVariable("stimulus2") === undefined) {
                return '<div id="stim3">' + jsPsych.timelineVariable("stimulus1") + '</div>';
              } else {
                return '<div id="stim1">' + jsPsych.timelineVariable("stimulus1") + '</div><div id="stim2">' + jsPsych.timelineVariable("stimulus2") + '</div>';
              }
            },
            prompt: ['<div id="prompt"> ' +
                      'Does the patient has disease X or disease Y? ' +
                      '</div>'],
            choices: ['x', 'y'],
            key_answer: 'z',
            stimulus_duration: 5000,
            trial_duration: 5000,
            feedback_duration: 1000,
            show_stim_with_feedback: false,
            show_feedback_on_timeout: false,
            correct_text: '<p style = "font-size:42px">Response recorded.</p>',
            incorrect_text: '<p style = "font-size:42px">Response recorded.</p>',
            timeout_message: '<p style = "font-size:42px">Please respond faster!</p>',
            on_start: function(trial) {
              trial.data = {
                ...trial.data,
                stimulus_timestamp: Date.now(),
              };
            },
            data: {
              seed: jsPsych.timelineVariable("seed"),
              phase: jsPsych.timelineVariable("phase"),
              block: jsPsych.timelineVariable("block"),
              trial: jsPsych.timelineVariable("trial"),
              include: "TRUE",
              stimulus1: jsPsych.timelineVariable("stimulus1"),
              // if stim 2 is not present, set it to NULL
              stimulus2: function () {
                if (jsPsych.timelineVariable("stimulus2") === undefined) {
                  return "NULL";
                } else {
                  return jsPsych.timelineVariable("stimulus2");
                }
              },
              symptom1: jsPsych.timelineVariable("symptom1"),
              symptom2: jsPsych.timelineVariable("symptom2"),
            },
          },
        ],
        timeline_variables: blockData,
      },
      { // Rest Trial
        type: keyboardResponse,
        stimulus: 
        [
          '<p style = "font-size:24px;line-height:2;width:600px ">' +
            'You have completed a block. Take ' +
            'a breath and press space when you are ready to continue</p>'
        ],
        choices: [' '],
        on_start: function() {
          // Increment block number and get new block data
          blockNumber++;
          blockData = getBlockData(testData, blockNumber);
          console.log("Block: " + blockNumber)
          console.log(blockData);

          // End test trial
          if (blockNumber >= 13) {
            keepLooping = false;
          } else {
            keepLooping = true;
          }
          return keepLooping;
        }
      }
    ],
    loop_function: function() {
      if (keepLooping) {
        return true;
      } else {
        return false;
      }
    }
  };
  return testPhaseTimeline;
};