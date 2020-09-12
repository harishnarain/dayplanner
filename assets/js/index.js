// Init
// Get elements
const plannerEl = $("#planner");

// Get current date
const currentTime = moment();

// Output current date/time in title
$("#currentDay").text(currentTime.format("dddd, MMMM Do YYYY, h:mm a"));

// Declare workday array
const workDay = [];

// Generate time block objects
// Declare number of hours in work day
// For every hour in work day
    // Create a time block object with:
        // Time from 9am to 5pm
        // isCurrent
        // isPast
    // Store time block object in workDay array


// foreach element in workDay array
    // create a time block elements
        // hour
        // textarea
        // save button
