/*
 *  Welcome Message 
 */


// Plugins
import browserCheckPlugin from "@jspsych/plugin-browser-check";

// Global variables
export var participantID = [];
export var studyID = [];
export var sessionID = [];

// Import study details
import { manualStudyID, manualSessionID } from "../experiment";

// Generate random number between 1001 and 9999
function randomID() {
  return Math.floor(Math.random() * 9999) + 1001;
};

// Browser check
export function browserCheck(jsPsych) {
  var browserCheckTrial = {
    type: browserCheckPlugin,
    // Checks a webcam is available and the browser is Chrome
    // Webcam is not turned on at this stage
    inclusion_function: (data) => {
      return data.browser === 'chrome' && data.webcam === true;
    },
    on_load: function() {
        // Get Participant ID, Study ID and Session ID from URL
        // If no participant ID, study ID or session ID is found, assign -1

        // Variables get passed to the results file
        if (jsPsych.data.getURLVariable('participantID') != null) {
            participantID = jsPsych.data.getURLVariable('participantID');
            console.log('Participant ID: ' + participantID);
        } else if (jatos.urlQueryParameters.participantID != null) {
            participantID = jatos.urlQueryParameters.participantID;
            console.log('Participant ID: ' + participantID);
        } else {
            participantID = randomID();
            console.warn('Participant ID set to random');
        };

        if (jsPsych.data.getURLVariable('studyID') != null) {
            studyID = jsPsych.data.getURLVariable('studyID');
            console.log('Study ID: ' + studyID);
        } else if (jatos.urlQueryParameters.studyID != null) {
            studyID = jatos.urlQueryParameters.studyID;
            console.log('Study ID: ' + studyID);
        } else {
            studyID = manualStudyID;
            console.log('Study ID: ' + studyID);
        };

        if (jsPsych.data.getURLVariable('sessionID') != null) {
            sessionID = jsPsych.data.getURLVariable('sessionID');
            console.log('Session ID: ' + sessionID);
        } else if (jatos.urlQueryParameters.sessionID != null) {
            sessionID = jatos.urlQueryParameters.sessionID;
            console.log('Session ID: ' + sessionID);
        } else {
            sessionID = manualSessionID;
            console.log('Session ID: ' + sessionID);
        };
    },
  };
  return browserCheckTrial;
};