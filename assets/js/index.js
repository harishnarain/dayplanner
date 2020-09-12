// Get elements
const plannerEl = $("#planner");

// Get current date
const currentDateTime = moment();

// Declare number of hours in work day and offset
const hoursInWorkDay = 8;
const timeOffset = 9;

// Create timeblocks in array
const workDay = [];
for (i = 0; i <= hoursInWorkDay; i++) {
  const time = moment().hour(i).minute(0).add(timeOffset, "hours");
  const timeFormatted = time.format("h a");
  let isCurrent;
  let isPast;
  moment().minute(0).format("h a") === timeFormatted
    ? (isCurrent = true)
    : (isCurrent = false);
  parseInt(time.format("H")) < parseInt(moment().format("H"))
    ? (isPast = true)
    : (isPast = false);
  workDay.push({
    time: timeFormatted,
    isCurrent: isCurrent,
    isPast: isPast,
  });
}

// Create a time block object with:
// Time from 9am to 5pm
// isCurrent
// isPast
// Store time block object in workDay array
const createTimeBlock = (timeBlock, index) => {
  const row = $("<div></div>").addClass("row time-block").appendTo(plannerEl);
  const hour = $("<div></div>").addClass("col-md-1 hour").appendTo(row);
  const textBlock = $("<textarea></textarea>")
    .addClass(`col-md-10 textarea ${"task-"+index}`)
    .appendTo(row);
  hour.text(timeBlock.time);

  if (timeBlock.isCurrent) {
    textBlock.addClass("present");
  } else if (timeBlock.isPast && !timeBlock.isCurrent) {
    textBlock.addClass("past");
  } else {
    textBlock.addClass("future");
  }

  if(localStorage.getItem(timeBlock.time)) {
      textBlock.val(localStorage.getItem(timeBlock.time));
  }

  const saveBtn = $("<div></div>").addClass("col-md-1 saveBtn").appendTo(row);
  saveBtn.attr("value", index);
  $("<i></i>").addClass("far fa-save fa-2x").appendTo(saveBtn);
};

// foreach element in workDay array
// create a time block elements
// hour
// textarea
// save button
workDay.forEach((timeBlock, index) => {
  createTimeBlock(timeBlock, index);
});

// Output current date/time in title
$("#currentDay").text(currentDateTime.format("dddd, MMMM Do YYYY, h:mm a"));

// Create save event listener
$(".saveBtn").on("click", event => {
    const targetTaskId = $(event.currentTarget).attr('value');
    const targetTask = ".task-" + targetTaskId;
    const taskValue = $(targetTask).val();
    const taskTime = workDay[targetTaskId].time;
    localStorage.setItem(taskTime, taskValue);
});