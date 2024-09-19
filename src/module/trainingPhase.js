/*
 *  Training phase of the experiment
 */

// Plugins
import keyboardResponse from "@jspsych/plugin-html-keyboard-response";
import categorizeHtml from '@jspsych/plugin-categorize-html';

// Import required functions
import { getRandomInt } from "./experimentUtility";
import { getBlockData } from "./experimentUtility";
import { filterTrainingTrials } from "./experimentUtility";
import { filterJsonData } from "./experimentUtility";

// Import trial order database
import trialOrderDb from "../../trial-order/tr_combined.json";
import { gazerData } from "./eyeTracking";

// Global Variables
export var trialOrderSeed = 0;
export var trialOrder = [];

// Local Variables
var blockNumber = 1;
var trainingAccuracy = 0;

var trainingData = [];
var blockData = [];

var keepLooping = true;

var startTime = 0;

// Generate random seed
trialOrderSeed = getRandomInt(1, 10);
console.log("Trial Order: " + trialOrderSeed);

// Filter trialOrder based on seed
trialOrder = filterJsonData(trialOrderDb, trialOrderSeed);

// Filter for training trials
trainingData = filterTrainingTrials(trialOrder);

// Get initla block data
blockData = getBlockData(trainingData, blockNumber);

export function trainingPhase(jsPsych) {
    var trainingPhaseTimeline = {
      // Timeline for the training phase  
      timeline: 
      [
        { // Timeline for block 
          timeline: [
            {
              type: categorizeHtml,
              stimulus: function() {
                return '<div id="stim1">' + jsPsych.timelineVariable("stimulus1") + '</div><div id="stim2">' + jsPsych.timelineVariable("stimulus2") + '</div>';
              },
              prompt: ['<div id="prompt">' +
                      'Does the patient has disease X or disease Y? ' +
                      '</div>'],
              choices: ['x', 'y'],
              key_answer: jsPsych.timelineVariable("key"), 
              stimulus_duration: 5000,
              trial_duration: 5000,
              feedback_duration: 1000,
              show_stim_with_feedback: false,
              show_feedback_on_timeout: false,
              correct_text: function() {
                return '<p style = "font-size:42px">' +
                        '<font color="green">Correct! </font>' + 'It was disease ' +
                        jsPsych.timelineVariable("key") + '.</p>';
              },
              incorrect_text: function() {
                return '<p style = "font-size:42px">' +
                        '<font color="red">Incorrect! </font>' + 'It was disease ' +
                        jsPsych.timelineVariable("key") + '.</p>';
              },
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
                category: jsPsych.timelineVariable("category"),
                include: "TRUE",
                stimulus1: jsPsych.timelineVariable("stimulus1"),
                stimulus2: jsPsych.timelineVariable("stimulus2"),
                symptom1: jsPsych.timelineVariable("symptom1"),
                symptom2: jsPsych.timelineVariable("symptom2"),
                key: jsPsych.timelineVariable("key"),
              },

              on_finish: function(data) {
                if (data.correct) {
                  trainingAccuracy++;
                } else {
                  trainingAccuracy = 0;
                }
                }
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
            // // Pause eyetracking
            // webgazer.pause();

            // Increment block number and get new block data
            blockNumber++;
            blockData = getBlockData(trainingData, blockNumber);

            // Reset training accuracy
            if (trainingAccuracy < 8) {
              trainingAccuracy = 0;
            } else if (trainingAccuracy > 8 && trainingAccuracy < 16) {
              trainingAccuracy = 0;
            }
            return blockData, trainingAccuracy;
          },

          on_finish: function() {
            // // Resume eyetracking
            // webgazer.resume();

            // Training accuracy reset
            if (trainingAccuracy >= 16) {
              keepLooping = false;
            } else if (blockNumber >= 6) {
              keepLooping = false;
            } else {
              keepLooping = true;
            }
            return keepLooping;
          },
        },

      ],
      loop_function: function() {
        if (keepLooping) {
          return true;
        } else {
          return false;
        }
      }
    };
    return trainingPhaseTimeline;
}
