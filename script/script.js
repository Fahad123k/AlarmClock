
// fetch audio of alarm ring
var alarmRing = new Audio("./assests/sounds/assets_alarm.mp3");

// fetch warn audion
var warnaudio = new Audio("./assests/sounds/warn.mp3");
// fetch audio click sound
var audioclick = new Audio("./assests/sounds/click.mp3");
// fetch button to set alarm
const setAlarm = document.getElementById("SetAlarm");


// array to store the added alarms
var alarmListArray = [];
// fetch the element to show the added alarms
const alarmHistory = document.getElementById("alarmTime");


// about clicking effect
const About = document.getElementById("About");
About.addEventListener('click', function onClick(event) {
  // event.target.style.backgroundColor = 'salmon';
  alert("this app is developed by Md nishu Ahmad");

})
// contact clicking effect
const contact = document.getElementById("contact");
contact.addEventListener('click', function onClick(event) {
  // event.target.style.backgroundColor = 'salmon';
  alert("Name: Md Nishu Ahamd '\n'Email:Ahmad.nishu08@gmail.com Add:Ranchi Jharkahnd");

})
// fetch button to switch mode
const btn = document.getElementById('Switch');

var isNightMode = false;
// switch
btn.addEventListener('click', function onClick(event) {
  // 👇️ change background color
  if (isNightMode) {
    // day mode code here
    document.body.style.backgroundColor = 'rgb(165, 184, 187)';
    document.getElementById('container').style.backgroundColor = "rgb(47, 49, 49)";
    document.getElementById('display').style.backgroundColor = "rgb(47, 49, 49)";
    document.getElementById('SetAlarm').style.backgroundColor = "rgb(165, 184, 187)";
    // document.getElementById('nav li a:hover').style.backgroundColor="rgb(165, 184, 187);";
    document.getElementById('heading').style.color = "black";
    document.getElementById('LiveTime').style.color = "white";
    document.getElementById('AlarmLists').style.color = "white";
    document.getElementById('alarmTime').style.color = "white";
    // document.getElementById('delete-btn').style.color="#2feca7";
    event.target.innerText = "Day Mode"
    isNightMode = false;

  }
  else {
    // night mode code here
    document.body.style.backgroundColor = 'rgb(47, 49, 49)';
    document.getElementById('container').style.backgroundColor = "rgb(101, 132, 158)";
    document.getElementById('display').style.backgroundColor = "rgb(101, 132, 158)";
    document.getElementById('SetAlarm').style.backgroundColor = "rgb(47, 49, 49)";
    // document.getElementById('nav li a:hover').style.backgroundColor="black";
    // document.getElementsByTagName(a).style.backgroundColor="rgb(101, 132, 158)";
    document.getElementById('heading').style.color = "white";
    document.getElementById('LiveTime').style.color = "black";
    document.getElementById('AlarmLists').style.color = "black";
    document.getElementById('alarmTime').style.color = "black";
    // document.getElementById('delete-btn').style.color="rgb(47, 49, 49)";

    event.target.innerText = "Night Mode"
    isNightMode = true;

  }


  // 👇️ optionally change text color
  // event.target.style.color = 'white';
});




// function to show the added alarms
function showAlarm(newAlarm) {
  // dom manupulation to add the new alarms 
  var textIs = document.createTextNode(newAlarm);

  var trastIcon = document.createElement("i");
  trastIcon.classList.add("fa-solid");
  trastIcon.classList.add("fa-trash-can")

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");

  var li = document.createElement("li");

  deleteButton.appendChild(trastIcon);
  li.appendChild(textIs);
  li.appendChild(deleteButton);
  alarmHistory.appendChild(li);

  // to delete the alarm from the list
  deleteButton.addEventListener('click', e => {
    e.preventDefault();
    const x = deleteButton.parentElement.textContent;
    const index = alarmListArray.indexOf(x);
    if (index > -1) {
      alarmListArray.splice(index, 1);
      console.log(alarmListArray);
    }

    deleteButton.parentElement.remove();

  })

}




// set alarm after clicking
setAlarm.addEventListener("click", e => {
  console.log("alarm button pressed");
  e.preventDefault();

  // fetch time from input time element;
  const getTime = document.getElementById('time').value;
  console.log(getTime)

  // if input filed in not empty
  if (getTime != '') {
    audioclick.play();
    audioclick.pause();

    // split time 
    var [h, m, s] = getTime.split(":");
    var amPm = ((h % 12 + 12 * (h % 12 == 0)) + ":" + m, h >= 12 ? 'PM' : 'AM');

    if (h > 12) {
      h = h - 12;
    }
    if (h < 10) {
      h = '0' + h;
    }
    // if (m < 10) {
    //   m = '0' + m;
    // }
    // if (s < 10) {
    //   s = '0' + s;
    // }
    // if (s == 000) {
    //   s = '00' ;
    // }



    // alert("alarm set at-" + h + " " + m + " " + s + " " + amPm);
    const newAlarm = `${h}:${m}:${s} ${amPm}`;
    // console.log(h + " " + m + " " + s + " " + amPm)
    console.log(newAlarm)
    if (!alarmListArray.includes(newAlarm)) {
      alarmListArray.push(newAlarm);
      showAlarm(newAlarm);
      console.log(alarmListArray);
      document.getElementById("time").value = ""

    } else {
      console.log("already exist");
      alert(` '${newAlarm}' this alarm already exist`)
    }


  }
  else {
    warnaudio.play();
    alert("! first select time");
    warnaudio.pause();

  }


})
// live update of current time
function LiveTime() {

  let time = new Date();
  let hours = time.getHours();
  let amPm = hours >= 12 ? 'PM' : 'AM';
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  hours = hours % 12;
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (hours == 00) {
    hours = 12;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  const now = `${hours}:${minutes}:${seconds} ${amPm}`;
  // display the clock to user

  // fetch id of alarm to show live tme 
  var liveTimeSet = document.getElementById("LiveTime");
  liveTimeSet.innerText = `${hours}:${minutes}:${seconds} ${amPm}`;

  //  alarm ring and pop up alert to user with audio
  // console.log(now)
  if (alarmListArray.includes(now)) {
    alarmRing.play();
    setTimeout(function () {
      alert(`Ringing....${now}`);
      alarmRing.pause();
      alarmRing.currentTime = 0;
    }, 0);


  }

}



// display the time when the page loaded itself
LiveTime();
// update the time in even second
setInterval(LiveTime, 1000);
