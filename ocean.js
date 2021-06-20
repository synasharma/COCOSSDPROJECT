function home()
{
    window.location="index.html";
}

status="";
img="";
objects=[];

function preload()
{
img=loadImage("fiah.jpeg");
}

function setup()
{
    canvas=createCanvas(800,600);
    canvas.center();
    objectDetection=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
    console.log('Model has Loaded!');
    status=true;
    objectDetection.detect(img,getResult);
}

function getResult(error,result)
{
    if(error)
    {
        console.log(error);
    }

    else
    {
        console.log(result);
        objects=result;
    }
}

function draw()
{
    image(img,0,0,700,500);
    if (status!="")
    {
for (i=0;i<objects.length;i++)
{
    document.getElementById("status").innerHTML="Status: Detected Objects";
    fill('red');
    textSize(20);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20);
    noFill();
    stroke('red');
    strokeWeight(2);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
    }
}
