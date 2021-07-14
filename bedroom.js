img = "";
objects = [];
status = "";

function back() {
    window.location = "index.html";
}

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function ModelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results)
        objects = results;
    }
}

function preload() {
    img = loadImage('bedroom.jpg');
}

function draw() {
    image(img, 0, 0, 700, 500);
    if (status != "") {
        if (objects.length > 0) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            for (i = 0; i < objects.length; i++) {
                label = objects[i].label;
                xcoord = objects[i].x;
                ycoord = objects[i].y;
                percent = floor(objects[i].confidence * 100);
                width = objects[i].width;
                height = objects[i].height;

                fill("#77d48e");
                textFont(20);
                text(label + "" + percent + "%", xcoord + 15, ycoord + 15);
                noFill();
                stroke("#FF0000");
                rect(xcoord, ycoord, width, height);
            }
        }
    }
}