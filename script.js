function getNextTimePeriod() {
    const times = [
        "08:45",
        "09:50",
        "10:55",
        "11:15",
        "12:20",
        "13:25",
        "13:45",
        "14:05",
        "15:10"
    ];
    
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const nowSeconds = now.getSeconds();
    const nowMilliseconds = now.getMilliseconds();
    
    for (let time of times) {
        const [hours, minutes] = time.split(':').map(Number);
        const timeMinutes = hours * 60 + minutes;
        const timeSeconds = 59;
        if (timeMinutes > nowMinutes) {
            return [timeMinutes - nowMinutes, timeSeconds - nowSeconds];
        }
    }
    
    // If no future time found, return the minutes and seconds until the first time period the next day
    const firstTime = times[0].split(':').map(Number);
    const firstTimeMinutes = firstTime[0] * 60 + firstTime[1];
    const remainingMinutes = (24 * 60 - nowMinutes) + firstTimeMinutes;
    const remainingSeconds = 59 - nowSeconds;

    return [remainingMinutes, remainingSeconds];
}

function padnumber(str_) {
    var str = "" + str_
    var pad = "00"
    var ans = pad.substring(0, pad.length - str.length) + str
    return ans
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const timeLeft = getNextTimePeriod();
    const minutesLeft = timeLeft[0];
    const secondsLeft = timeLeft[1];
    
    timerElement.textContent = `Next period is in ${padnumber(minutesLeft)}:${padnumber(secondsLeft)}`;
}

setInterval(updateTimer, 1000);
updateTimer();

// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
   // of the mouse, set with a mousemove event listener below
   var dots = [],
   mouse = {
     x: 0,
     y: 0
   };

// The Dot object used to scaffold the dots
var Dot = function() {
 this.x = 0;
 this.y = 0;
 this.node = (function(){
   var n = document.createElement("div");
   n.className = "trail";
   document.body.appendChild(n);
   return n;
 }());
};
// The Dot.prototype.draw() method sets the position of 
 // the object's <div> node
Dot.prototype.draw = function() {
 this.node.style.left = this.x + "px";
 this.node.style.top = this.y + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
 var d = new Dot();
 dots.push(d);
}

// This is the screen redraw function
function draw() {
 // Make sure the mouse position is set everytime
   // draw() is called.
 var x = mouse.x,
     y = mouse.y;
 
 // This loop is where all the 90s magic happens
 dots.forEach(function(dot, index, dots) {
   var nextDot = dots[index + 1] || dots[0];
   
   dot.x = x;
   dot.y = y;
   dot.draw();
   x += (nextDot.x - dot.x) * .6;
   y += (nextDot.y - dot.y) * .6;

 });
}

addEventListener("mousemove", function(event) {
 //event.preventDefault();
 mouse.x = event.pageX;
 mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
 // everytime the screen repaints via requestAnimationFrame().
function animate() {
 draw();
 requestAnimationFrame(animate);
}

// And get it started by calling animate().
animate();
