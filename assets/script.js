// TIME DATE START

let timeSlot = {
    "7AM": "",
    "8AM": "",
    "9AM": "",
    "10AM": "",
    "11AM": "",
    "12PM": "",
    "1PM": "",
    "2PM": "",
    "3PM": "",
    "4PM": "",
};

// TIME DATE END

// remember to use MOMENT.JS
// https://momentjs.com/docs/#/-project-status/
$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm a'));


// for loop and vars for the time sections START
var counter = 7;
for(const property in timeSlot) {
    var textInput = "#text-input" + counter;
    $(textInput).text(timeSlot[property]);
    var hourId = "#hour" + counter;
    var presentHour = moment().hour();
    var timeString = $(hourId).text();
    var time = hourNumberFromHourString(timeString);
     
    if(time < presentHour) {
        // past
        $(textInput).addClass("past");
    } else if (time > presentHour) {
        // future
        $(textInput).addClass("future");
    } else {
        // present
        $(textInput).addClass("present");
    }
    // counter ++ (confirmed)
    counter ++;
}
// END

// BUTTON START (go through console log to see if its not saving)
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();

    // confirm if saving (confirmed)
    saveSchedule(hourString, value);
});
// BUTTON END



// SWITCH START (hour string - > hour number)
function hourNumberFromHourString(hourString) {
    switch(hourString) {
        // typo on return 16, comment out..
        case "7AM": return 7;
        case "8AM": return 8;
        case "9AM": return 9;
        case "10AM": return 10;
        case "11AM": return 11;
        case "12PM": return 12;
        case "1PM": return 13;
        case "2PM": return 14;
        case "3PM": return 15;
        case "4PM": return 16;
    }
}
// SWTICH END



// LOCAL STORAGE START
$(document).ready(function(){
    // nothing in LS -> update tasks
    if(!localStorage.getItem('timeSlot')) {
      updateTasks(timeSlot);
    } else {
      // if not, update tasks
      updateTasks(JSON.parse(localStorage.getItem('timeSlot')));
    }
})

function loadCorrectDataset() {
    result = localStorage.getItem('timeSlot')
    return (result ? result : timeSlot);
}

function initializeLocalStorage() {
    localStorage.setItem('timeSlot', JSON.stringify(timeSlot));
};

function saveToLocalStorage(dayEl) {
    localStorage.setItem('timeSlot', JSON.stringify(dayEl));
}
// LOCAL STORAGE END



// SAVE FEATURE START (debug later)
function saveSchedule(hourString, val) {

    if(!localStorage.getItem('timeSlot')) {
        initializeLocalStorage();
    }

    var workHours = JSON.parse(localStorage.getItem('timeSlot'));
    workHours[hourString] = val

    saveToLocalStorage(workHours);
}
// SAVE FEATURE START (debug later)



// UPDATING TASKS START
function updateTasks(dayElement) {
    $(".schedule-row").each(function(index) {
        var res = $(this).children("div");
        $(this).children("textarea").text(dayElement[res.text()]);
    })
}
// UPDATING TASKS END