/*
 * Consent Form for experiment
 */

// Plugins
import externalHtml from '@jspsych/plugin-external-html';

// Function that checks if the consent tickbox has been checked
function checkConsent() {
  if (document.getElementById('consent_checkbox').checked) {
    return true; 
  } else { 
    alert('If you wish to participate, you must check the box next to' +
          ' the statement \'I agree to participate in this study.\'');
    return false;
  }
}

// Consent form has been split in half to fit on screens

// Part 1 of the consent form. 
export const consentFormP1 = {
    type: externalHtml,
    url: 'assets/consentP1.html',
    cont_btn: 'continue',
    };

// Part 2 of the consent form. 
export const consentFormP2 = {
    type: externalHtml,
    url: 'assets/consentP2.html',
    cont_btn: 'start',
    // Checks that the consent checkbox is checked
    check_fn: checkConsent,
};