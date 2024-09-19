/*
 *  Trials and functions that are used to initialise 
 *  webgazer and calibrate the eye tracking.
 */

// Plugins
import buttonResponse from "@jspsych/plugin-html-button-response";
import fullscreen from "@jspsych/plugin-fullscreen";

// Webgazer
import webgazer from 'webgazer'

// Global Variables
import {participantID, sessionID, studyID} from "./browserCheck";

// Global variables
export let gazerData = [];

// Local variables
let attempts = 0;
const maxAttempts = 10;

// Function that checks webgazer has loaded correctly
function checkData() {
    // Pass
    if (gazerData.length > 0) {
        console.log("Webgazer loaded successfully.");

        // Shows the continue button
        document.getElementById('jspsych-html-button-response-button-0').style.display = 'block';

    // Fail
    } else {
        console.log("No data detected. Trying again in 3 seconds.");
        attempts++;
        // Checks again 10 times before passing
        if (attempts < maxAttempts) {
            setTimeout(checkData, 3000);
        } else {
            console.log("Maximum attempts reached. Proceeding without eye tracking.");
            // Pass - no eye tracking data

            // Shows the continue button
            document.getElementById('jspsych-html-button-response-button-0').style.display = 'block';
        }
    }
}

// Function to load webgazer
export async function webgazerInit() {
    // Load messages
    console.log("Loading webgazer...");

    // Set webgazer peramiters
    webgazer.setRegression('ridge') 
    webgazer.setGazeListener(function(data) {
        if (data == null) {
            return;
        }
        // Records x & y data
        // Data is rouded to save space 
        // and improve performance
        let xpred = Math.round(data.x);
        let ypred = Math.round(data.y);

        // Records participants window 
        // resolution
        let xres = window.screen.width;
        let yres = window.screen.height;

        // Store data
        gazerData.push({participantID: participantID, 
            studyID: studyID,
            sessionID: sessionID,
            xres: xres,
            yres: yres,
            x: xpred,
            y: ypred,
            timestamp: new Date().getTime()});
    }).begin();
};

// Function to resume webgazer
export function resumeWebgazer() {
    webgazer.resume();
};

// Function to pause webgazer
export function pauseWebgazer() {
    webgazer.pause();
};

// Loading Webgaer
export const webGazerLoad = {
    type: buttonResponse,
    stimulus: ['<p style="display:inline-block;align:center;font-size:28pt;' +
        'width:60%">' +
        'Initalising eye tracking. Please wait a moment.' +
        '<br><br>'],
    prompt: '<p style="display:inline-block;align:center;font-size:16pt;' +
        'width:60%">' +
        '<b>Please allow accsess to your camera.</b>' + 
        '<br><br>' +
        'Once the eye tracking has initialised, a button labelled Continue will appear. ' + 
        'This may take up to 60 seconds.',

    duration: 18000,
    on_load: async function() {
        // Hides continue button when the trial starts
        // it re appears when the checkData function detects eyetracking data
        document.getElementById('jspsych-html-button-response-button-0').style.display = 'none';

        webgazerInit();
        checkData();
    },
    choices: ['Continue'],
};

// Switch to fullscreen
export const fullscreenTrial = {
    type: fullscreen,
    fullscreen_mode: true,
};

// Define the HTML for a single box
function boxHTML(id, color) {
    return `<div id="${id}" style="width: 30px; height: 30px; background-color: ${color}; position: absolute;"></div>`;
}

// Initialize click counts for each box
let clicks = {box1: 0, box2: 0, box3: 0, box4: 0, box5: 0, box6: 0, box7: 0};
let clicksReCal = {boxTwo1: 0, boxTwo2: 0, boxTwo3: 0, boxTwo4: 0, boxTwo5: 0, boxTwo6: 0, boxTwo7: 0};

// Initialize an array to store the box clicked and the timestamp
export let clickEvents = [];
export let clickEventsReCal = [];

// WebGazer Calibration Instructions
export function webGazerCal(jsPsych) {
    let calAllClickEvents = [];

    return {
        type: buttonResponse,
        choices: ['Continue'],

        // Function that shows the calibration boxes
        stimulus: function () {
            let calHtml = boxHTML('box1') + boxHTML('box2') + boxHTML('box3') + boxHTML('box4') + boxHTML('box5') + boxHTML('box6') + boxHTML('box7');
            calHtml += '<button id="next">Next</button>';
            return calHtml;
        },
        on_load: function () {
            webgazer.showVideoPreview(false);
            webgazer.showVideo(false);
            document.getElementById('jspsych-html-button-response-button-0').style.display = 'none';

            // Add click listeners to the calibration boxes
            for (let i = 1; i <= 7; i++) {
                document.getElementById('box' + i).addEventListener('click', function () {
                    clicks['box' + i]++;
                    // Puts the clicks into an array
                    let clickEvent = {stimulus_1: 'box' + i, stimulus_timestamp: Date.now()};
                    calAllClickEvents.push(clickEvent);

                    // Turns the box green after it has been clicked 5 times
                    if (clicks['box' + i] >= 5) {
                        this.style.backgroundColor = 'green';
                    }

                    // The continue button will show up after all 7 boxes have been clicked 5 times
                    if (Object.values(clicks).every(val => val >= 5)) {
                        document.getElementById('jspsych-html-button-response-button-0').style.display = 'block';
                    }
                });
            }
        },
        // Adds descriptor columns to the eyetracking calibration data
        data: {
            phase: 'et-calibration',
            include: 'TRUE',
        },
        // Writes the box data to jsPsych data
        on_finish: function () {
            calAllClickEvents.forEach(event => {
                jsPsych.data.write(event);
            });
        }
    };
}

// WebGazer Calibration Instructions
export function webGazerReCal(jsPsych) {
    let calReAllClickEvents = [];

    return {
        type: buttonResponse,
        choices: ['Continue'],

        // Function that shows the calibration boxes
        stimulus: function () {
            let calReHtml = boxHTML('boxTwo1') + boxHTML('boxTwo2') + boxHTML('boxTwo3') + boxHTML('boxTwo4') + boxHTML('boxTwo5') + boxHTML('boxTwo6') + boxHTML('boxTwo7');
            calReHtml += '<button id="next">Next</button>';
            return calReHtml;
        },
        on_load: function () {
            webgazer.showVideoPreview(false);
            webgazer.showVideo(false);
            document.getElementById('jspsych-html-button-response-button-0').style.display = 'none';

             // Add click listeners to the calibration boxes
            for (let i = 1; i <= 7; i++) {
                document.getElementById('boxTwo' + i).addEventListener('click', function () {
                    clicksReCal['boxTwo' + i]++;
                    // Puts the clicks into an array
                    let clickEventsReCal = {stimulus_1: 'boxTwo' + i, stimulus_timestamp: Date.now()};
                    calReAllClickEvents.push(clickEventsReCal); 

                    // Turns the box green after it has been clicked 5 times
                    if (clicksReCal['boxTwo' + i] >= 5) {
                        this.style.backgroundColor = 'green';
                    }

                    // The continue button will show up after all 7 boxes have been clicked 5 times
                    if (Object.values(clicksReCal).every(val => val >= 5)) {
                        document.getElementById('jspsych-html-button-response-button-0').style.display = 'block';
                    }
                });
            }
        },
        // Adds descriptor columns to the eyetracking calibration data
        data: {
            phase: 'et-reCalibration',
            include: 'TRUE',
        },
        // Writes the box data to jsPsych data
        on_finish: function () {
            calReAllClickEvents.forEach(event => {
                jsPsych.data.write(event);
            });
        }
    };
}