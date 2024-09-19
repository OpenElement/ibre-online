/*
 *  All instructions for the experiment 
 */

// Plugins
import keyboardResponse from "@jspsych/plugin-html-keyboard-response";
import {clickEvents} from "./eyeTracking";

// ************************************************************************************************* //

// Credit reminder
export const creditReminder = {
    type: keyboardResponse,
    stimulus: ['<h1>Payment</h1>' +
        '<p style="display:inline-block;align:center;font-size:16pt;' +
        'width:60%">In order to receive the allocated payment after completing the experiment, ' +
        'you must read the debrief and click on the <strong> EXIT EXPERIMENT </strong> button.' +
        '<br><br> Press \'space\' to continue.'],
    choices: [' '],
    };

// ************************************************************************************************* //

// Welcome Message
export const welcomeMessage = {
    type: keyboardResponse,
    stimulus: ['<p style = "font-size:48px;line-height:1;">' +
    'Welcome to the Experiment!' +
    '<p style = "font-size:30px;line-height:1;width:600px ">' +
    '<br><b>When asked, please allow the browser to access your camera.</b> </p> ' +
    '<p style = "font-size:24px;line-height:1;width:600px ">' +
    '<br>Press \'space\' to continue.</p>',],
    choices: [' '],
    };

// WebGazer Instructions
export const webGazerInstructions = {
    type: keyboardResponse,
    stimulus: ['<h1>Eye Tracking</h1>' +
        '<p style="display:inline-block;align:center;font-size:14pt;' +
        'width:40%">' +
        'Before proceeding with the experiment, you need to conduct a ' +
        'calibration trial for the eye tracker. There will be 5 red ' + 
        'boxes on your screen. Please focus on each red box and click '+
        'on it 5 times until it turns green. Once completed you will '+
        'be able to proceed to the experiment.' +
        '<br><br>' +
        'Please ensure you are in a well-lit room, your camera is '+
        'turned on, and when asked, you give permission for your browser to '+
        'access your camera. </p>' +
        '<br>Press \'space\' to continue.'],
    choices: [' '],
    };

// WebGazer Instructions part 2
export const webGazerCheck = {
    type: keyboardResponse,
    stimulus: ['<h1>Eye Tracking</h1>' +
        '<p style="display:inline-block;align:center;font-size:14pt;' +
        'width:40%">' +
        'Please ensure you are in a well-lit room, your camera is '+
        'turned on, and you have given permission for your browser to '+
        'access your camera; a live video feed should currently be '+
        'displayed in the top left corner of the screen. Please '+
        'ensure you can see yourself in the video feed, and your '+
        'head is within the box. Once you begin the experiment, the '+
        'video feed will be hidden; however, your camera will still '+
        'be on. </p>' +
        '<br>Press \'space\' to continue.'],
    choices: [' '],
};

// WebGazer calibration instructions
export const webgazerCalInstructions = {
    type: keyboardResponse,
    stimulus: ['<h1>Eye Tracking</h1>' +
        '<p style="display:inline-block;align:center;font-size:14pt;' +
        'width:40%">' +
        'You will now need to complete the calibration trial for the ' +
        'eye tracker. There will be 5 red boxes on your screen. Please ' + 
        'focus on each red box and click on it 5 times until it turns  '+
        'green. Once completed you will be able to proceed to the experiment.' +
        '<br><br>' +
        '<br>Press \'space\' to continue.'],
    choices: [' '],
    };

// WebGazer re-calibration instructions
export const webgazerReCalInstructions = {
    type: keyboardResponse,
    stimulus: ['<h1>Eye Tracking</h1>' +
        '<p style="display:inline-block;align:center;font-size:14pt;' +
        'width:40%">' +
        'You will now need to recomplete the calibration trial for the ' +
        'eye tracker. There will be 5 red boxes on your screen. Please ' + 
        'focus on each red box and click on it 5 times until it turns  '+
        'green. Once completed you will be able to proceed in the experiment.' +
        '<br><br>' +
        '<br>Press \'space\' to continue.'],
    choices: [' '],
    };
    



// Training instructions
export const trainingInstructions = {
    type: keyboardResponse,
    stimulus: ['<p style="display:inline-block;align:center;font-size:16pt;' +
        'width:60%">' +
        'You will now begin the first phase of the experiment. ' +
        'You will be presented with a variety of different symptoms, and you ' +
        'will be asked to decide whether they belong to Disease X or ' +
        'Disease Y. If you think it is Disease X, press the X key on your keyboard. If you ' +
        'think it is Disease Y, press the Y key on your keyboard. You will receive feedback ' +
        'on whether you picked the right disease after every choice. ' +
        '<br><br>You need to complete two consecutive errorless blocks of ' +
        '8 trials to move on to the next phase.</p>' +
        '<br>Press \'space\' to continue.'],
    choices: [' '],
    on_start: function() {
        console.log(clickEvents)
    }
};

// Test instructions
export const testInstructions ={
    type: keyboardResponse,
    stimulus: ['<p style="display:inline-block;align:center;font-size:16pt;' +
        'width:60%">' +
        'Well done on completing the first phase! Now, you will begin ' +
        'the test phase. You will be required to do the same thing as ' +
        'you did before, but without corrective feedback. ' +
        'If you think the symptoms on the screen belong to Disease X, ' +
        'press the X key on your keyboard. If you think the symptoms ' +
        'belong to Disease Y, press the Y key on your keyboard.<p>' +
        '<p>This phase will have 6 blocks of 12 trials. You will have a chance' +
        ' to rest between blocks.</p>' +
        '<br>Press \'space\' to continue.'],
    choices: [' '],
    };