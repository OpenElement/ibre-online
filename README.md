# IBRE Experiment - "viral diagnosis" with eye tracking

## Getting started

**Perquisites**
- Install [Node.js](https://nodejs.org/en/download/package-manager) 
-   Install a code editor like [VS Code](https://code.visualstudio.com/download).
-   You need a computer with a webcam and [Google Chrome](https://www.google.com/intl/en_uk/chrome/).

**Download the Code**

1.  Clone the repository:
    
    `git clone git@github.com:OpenElement/ibre-online-vi.git` 
    
    Or download as a ZIP by clicking `Code` -> `Download ZIP`.

## Set Up the Experiment

1.  Open a terminal in the code directory.
2.  Install required packages:
    
    `npm install` 
    
3.  Edit the WebGazer package:
    -   Open `packages/webgazer/src/utils.mjs`.
    -   Add this line at the top:
        
        `import webgazer from 'webgazer';` 
        
## Run the Experiment

1.  Start the experiment:
    
    `npm run start` 
    
2.  Click the link provided to test. Use `Ctrl + C` to stop the session.

## Customising the Experiment

**Redirection Link**

Create a file named `redirection.json` with the following content:


    {
	    "platformRedirect": "LINK" 
    }




-   Replace `LINK` with the redirection link from your participant recruitment platform (e.g., SONA or Prolific). 

**Messages**

Edit the consent form and debrief using the templates in the `assets` directory.
    

## Deploying the experiment

Run this command to compile the experiment for JATOS:

    npm build jatos

This will generate a `.jzip` file that you can import into JATOS. 
