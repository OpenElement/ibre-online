/*
 *  Debrief phase of experiment, 
 *  during this phase data is uploaded to JATOS
 */

// Plugins
import externalHtml from '@jspsych/plugin-external-html';
import {expCompletion} from "../experiment";

// Trial that shows the debrief to participants
export function debrief(jsPsych){
    var debrief = {
        type: externalHtml,
        url: 'assets/debrief.html',
        cont_btn: 'exit',
        on_load: function() {
            console.log(expCompletion)
        }
    };
    return debrief;
}