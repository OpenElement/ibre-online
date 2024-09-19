/**
 * @title ibre-online-vi
 * @description Online IBRE (with EyeTracking) Experiment with innocuous words as stimuli. 
 * @version 2.1.0
 *
 * @assets assets/
 */

// Study Details - Used if none are captured from URL
export const manualStudyID = 1001
export const manualSessionID = 1003

// Stylesheets
import "../styles/main.scss";
import "../styles/webgazerCal.css"
import "../styles/style.css"

// Modules and plugins
import { initJsPsych } from "jspsych";

// Import Trials
import { browserCheck } from "./module/browserCheck";
import { welcomeMessage } from "./module/instructions";
import { webGazerInstructions } from "./module/instructions";
import { webgazerCalInstructions } from "./module/instructions";
import { webgazerReCalInstructions } from "./module/instructions";
import { creditReminder } from "./module/instructions";
import { trainingInstructions } from "./module/instructions";
import { testInstructions } from "./module/instructions";
import { dataUpload } from "./module/dataUpload";
import { consentFormP1 } from "./module/consentForm";
import { consentFormP2 } from "./module/consentForm";
import { webGazerCal } from "./module/eyeTracking";
import { webGazerLoad } from "./module/eyeTracking";
import { webGazerReCal } from "./module/eyeTracking";
import { fullscreenTrial } from "./module/eyeTracking";
import { debrief } from "./module/debrief";
import { testPhase } from "./module/testPhase";
import { trainingPhase } from "./module/trainingPhase";
import { webGazerCheck } from "./module/instructions";

// Global variables
export var expCompletion = false;

// Redirection link
import platformRedirect from "../redirection.json"

/**
 *  Build the experiment timeline
 *
 * @type {import("jspsych-builder").RunFunction}
 */

// Main experiment function
export async function run() {

  // Initialize jsPsych
  const jsPsych = initJsPsych({
    on_finish: function() {
      // If the experiment is completed, redirect to the platform
      if (expCompletion === true) {
        const redirect = platformRedirect.redirectLink;

      // Else End the study
      } else {
        confirm("You are unable to proceed in this experiment due to incompatible hardware or software. Please use a desktop or laptop with a webcam and Google Chrome. ");
      }
    }
  })

  // Create the timeline
  const timeline = [];

  // Browser check
  timeline.push(browserCheck(jsPsych));

  // Welcome screen
  timeline.push(welcomeMessage);

  // Consent Form
  timeline.push(consentFormP1);
  timeline.push(consentFormP2);

  // Credit Reminder
  timeline.push(creditReminder);

  // WebGazer Instructions
  timeline.push(webGazerInstructions);

  // WebGazer Load
  timeline.push(webGazerLoad);

  // Fullscreen Trial
  timeline.push(fullscreenTrial);

  // Webgazer Check
  timeline.push(webGazerCheck)

  // WebGazer Calibration Instructions
  timeline.push(webgazerCalInstructions);

  // WebGazer Calibration
  timeline.push(webGazerCal(jsPsych));

  // Training instructions
  timeline.push(trainingInstructions);

  // Training phase
  timeline.push(trainingPhase(jsPsych));

  // WebGazer Re-Calibration Instructions
  timeline.push(webgazerReCalInstructions);

  // WebGazer Re-Calibration
  timeline.push(webGazerReCal(jsPsych));

  // Test instructions
  timeline.push(testInstructions);

  // Test phase
  timeline.push(testPhase(jsPsych));

  // Data upload
  timeline.push(dataUpload(jsPsych));

  // Debrief
  timeline.push(debrief(jsPsych));

  // Run the experiment
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results
  return jsPsych;
}
