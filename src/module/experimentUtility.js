/*
 *  Utility functions for the experiment modules
 */

// Local variables
var blockData = [];
var trialOrder = [];
var trainingData = [];
var testData = [];
var trialOrderSeed = 0;
var blockNumber = 1;

// Generate random number between 1 and 10
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    trialOrderSeed = Math.floor(Math.random() * (max - min + 1)) + min;
    return trialOrderSeed;
};

// Filter json data for seed
export function filterJsonData(trialOrderDb, trialOrderSeed) {
    trialOrder = trialOrderDb.filter((trialOrderDb) => trialOrderDb.seed === trialOrderSeed);
    return trialOrder;
};

// Filter for training trials
export function filterTrainingTrials(trialOrder) {
    trainingData = trialOrder.filter((trialOrder) => trialOrder.phase === "training");
    return trainingData;
};

// Filter for test trials
export function filterTestTrials(trialOrder) {
    testData = trialOrder.filter((trialOrder) => trialOrder.phase === "test");
    return testData;
};

// Function that gets block data
export function getBlockData(inputData, blockNumber) {
    blockData = inputData.filter((inputData) => inputData.block === blockNumber);
    return blockData;
};