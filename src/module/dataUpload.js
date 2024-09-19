/*
 *  End trial 
 */

// Plugins
import keyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Redirection link
import platformRedirect from "../../redirection.json"

import {expCompletion} from "../experiment";
// Import global variables
import {participantID, sessionID, studyID} from "./browserCheck";
import {gazerData} from "./eyeTracking";

// Import the redirection link
export const redirectLink = platformRedirect.redirectLink;

// Local Variables
var completeData;

// Trial that uploads the data to JATOS
export function dataUpload(jsPsych) {
    return {
        type: keyboardResponse,
        stimulus: ['<p style = "font-size:48px;line-height:1;">' +
        'Processing data...' +
        '<p style = "font-size:30px;line-height:1;width:600px ">' +
        '<br><b>Please do not close this page.</b> </p> ' +
        '<p style = "font-size:24px;line-height:1;width:600px ">' +
        '<br>You will be redirected automatically.</p>',],
        choices: [' '],
        trial_duration: 1000,
        on_finish: function () {

            // add participantID to the front of the data
            jsPsych.data.addProperties({
                participantID: participantID,
                studyID: studyID,
                sessionID: sessionID,
            });

            // Captures the data from jsPsych, filters for required trials.
            // Required trials have a column called include with a value of True
            completeData = jsPsych.data.get().filter({include: "TRUE"})

            // Upload IBRE data
            jatos.submitResultData(completeData)

            // Upload eye tracking data
            jatos.uploadResultFile(gazerData, participantID + ".json")
                .then(() => console.log("Results uploaded successfully."))
                .catch(() => console.warn("Results upload failed."));

            // Marks experiment completion as true so participants 
            // will be redirected when they exit the experiment. 
            expCompletion = true;
        },
    };
};