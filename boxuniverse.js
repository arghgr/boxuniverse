$(document).ready(function() {
	var boxNum = 0;
	var rainbowNum = 0;
	var boxes = $(".boxes");

	randomColor = function() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var rgb = "rgb(" + r + "," + g + "," + b + ")";
		console.log(rgb);
		return rgb;
	};
	cycleRainbow = function() {
		var rainbow = ["red","darkorange","yellow","green","blue","indigo"];
		console.log("rainbowNum: " + rainbowNum);
		if (rainbowNum < rainbow.length) {
			var color = rainbow[rainbowNum];
			console.log("color: " + rainbow[rainbowNum]);
			rainbowNum += 1;
			return color;
		} else {
			rainbowNum = 1;
			console.log("color: " + rainbow[0]);
			return rainbow[0];
		}
	};
	addBox = function(boxNumber) {
		var boxN = boxNumber;
		if (boxN < 100) {
			boxes.append($("<div></div>").addClass("box").css("background-color",cycleRainbow()).draggable({
				cursor: "move",
				containment: "parent",
				opacity: 0.7
			}));
			boxN += 1;
			console.log("boxNum+: " + boxN);
			return boxN;
		} else {
			return boxN;
		}
	};
	cycleBoxes = function(boxP) {
		var box = boxP;
		box.position({
			my: "left top",
			at: "left bottom",
			of: ".box:nth-last-of-type(2)",
			collision: "none"
		});
		var boxTop = box.position().top;
		console.log("boxTop: " + boxTop);
		if (boxTop >= (boxes.height() - box.height() + 1)) {
			console.log("boxTop: " + boxTop);
			console.log("It's gonna blooooooow");
			var boxOff = box.position().left + 53;
			box.position({
				my: "left+" + boxOff + "+ top",
				at: "left top+3",
				of: ".boxes",
				collision: "none"
			});
			var newBoxTop = box.position().top;
			console.log("newBoxTop: " + newBoxTop);
			return newBoxTop;
		} else {
			return boxTop;
		}
	};
	removeBox = function(boxNumber) {
		console.log("boxNumber-: " + boxNumber);
		var boxN = boxNumber;
		if (boxNumber > 0) {
			boxN -= 1;
			console.log("boxNum-: " + boxN);
			return boxN;
		} else {
			return boxN;
		}
	};

	$("#add").click(function() {
		boxNum = addBox(boxNum);
		var box = $(".box:last-of-type");
		console.log(">>>>>>CYCLE START<<<<<<");
		console.log("cycleBoxes: " + cycleBoxes(box));
		console.log("------CYCLE END------");
	});

	$("#remove").click(function() {
		$(".box:last-of-type").remove();
		boxNum = removeBox(boxNum);
	});

	$("#clear").click(function() {
		$(".box").effect("explode",500).remove();
		boxNum = 0;
		rainbowNum = 0;
		console.log("boom");
	});
});