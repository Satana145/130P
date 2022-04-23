song="";
song_2="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
score_left_wrist = 0;
score_right_wrist=0;
song_status=0;
song_2_status=0;
function preload()
{
    song=loadSound("music.mp3");
    song_2=loadSound("music2.mp3");
}

function play()
{
song.play();
song.setVolume(1);
song.rate(1);

}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        console.log("Left_Wrist_X = "+left_wrist_x+", Left_Wrist_Y = "+left_wrist_y);
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("Right_Wrist_X = "+right_wrist_x+", Right_Wrist_Y = "+right_wrist_y);
    }
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw() {
	image(video, 0, 0, 600, 500);
	song_2_status = song_2.isPlaying();
	fill("#e85aed");
	stroke("#e85aed");
	if(score_left_wrist > 0.2)
    {
		circle(left_wrist_x,left_wrist_y,20);
			song.stop();
	if(song_status == false)
    {
			song_2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan";
		}
	}
    song_status = song.isPlaying();
	fill("#e85aed");
	stroke("#e85aed");
	if(score_right_wrist > 0.2)
    {
		circle(right_wrist_x,right_wrist_y,20);
			song_2.stop();
	if(song_2_status == false)
    {
			song.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter";
		}
	}

}

