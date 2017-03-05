		require('./style.scss');

		(function(){
		var snake = [{'top': 200, 'left': 400}],
			pts = [{'top': 100, 'left': 200, 'type': 'green'}],
			size = 20,
			points = Number(0),
			snakebody = document.querySelectorAll(".snakepart"),
			counter = document.querySelector("#counter"),
			body = document.querySelector("body"),
			head = document.querySelector("#bggame>div:first-child"),
			speed = 100,
			curtop = 32,
			curleft = 26,
			direc = {
				'ver': -1,
				'hor': -1,
				'vertail': 0,
				'hortail': 0
			};
		function wall(top, left,snakepoz) {
			if (snakepoz[0].top<=curtop+8 || snakepoz[0].top>=curtop+388)
			{ 
				if (snakepoz[0].top<=curtop+8) {
					snakepoz[0].top=curtop+387;
				} else if (snakepoz[0].top>=curtop+388)	{
					snakepoz[0].top=curtop+9;	
				}
			};
			if (snakepoz[0].left<=curleft+8 || snakepoz[0].left>=curleft+788)
			{ 
				if (snakepoz[0].left<=curleft+8) {
					snakepoz[0].left=curleft+787;
				}
				if (snakepoz[0].left>=curleft+788)	{
					snakepoz[0].left=curleft+9;	
				}
			};
		}
		function movehead(snake) {
			snake[0].top = snake[0].top - direc.ver*5;
			snake[0].left = snake[0].left - direc.hor*5;
			wall(snake[0].top,snake[0].left,snake);
			snakebody[0].style.top = snake[0].top + 'px';
			snakebody[0].style.left = snake[0].left + 'px';
		}
		function snakemove(snake) {
			setInterval(function(){
				for (let i=snake.length-1;i>0;i--) {
					snake[i].top = snake[i-1].top;
					snake[i].left = snake[i-1].left;
					wall(snake[i].top,snake[i].left,snake);
					snakebody[i].style.top = snake[i].top + 'px';
					snakebody[i].style.left = snake[i].left + 'px';
				}
				movehead(snake);
				checkcoin();
			},speed);		
		}

		function checkarea(top,left,size) {
			let newarray = {'top': top, 'bottom': top+size, 'left': left, 'right': left+size};
			return newarray;
		}
		function headcolour(colour) {
			head.style.backgroundColor = colour;
			setTimeout(function() {
				head.style.backgroundColor = 'black';
			}, 100);
		}
		function removecoin(index, pts) {
			pts.splice(index, 1);
			$(".coin" ).remove();
			for (let j in pts) {
				$('#bggame').append('<div class="coin" style="top: ' + pts[j].top + 'px; left: '+ pts[j].left +'px; background-color: ' + pts[j].type +';"></div>');
			}
			headcolour('lightgreen');
			addtail();
			addtail();
			points += 10;
			//snakemove(snake, size);
			if (points % 100 == 0) {
				speed += 20;
				snakemove(snake, size)
			};
			counter.innerHTML = 'Result: ' + points + ' | speed: ' + Math.floor(speed/20);
		}
		function checkcoin() {
			let tarray, temparray2;
			tarray = checkarea(snake[0].top, snake[0].left, 20);
			for (let i in pts) {
				temparray2 = checkarea(pts[i].top, pts[i].left, 15);
				if (((tarray.top <= temparray2.top && tarray.bottom >= temparray2.top) &&
						(tarray.left <= temparray2.left && tarray.right >= temparray2.left)) || 
					((tarray.top <= temparray2.bottom && tarray.bottom >= temparray2.bottom) &&
						(tarray.left <= temparray2.right && tarray.right >= temparray2.right)))
				{
					console.log('hit');
					if (pts[i].type == 'red') {
						points -= 5;
						counter.innerHTML = 'Result: ' + points + ' | speed: ' + Math.floor(speed/20);
						headcolour('orangered');
						break;
					} else {
						removecoin(i, pts);	
					}
				}
			}
		}
		function placecoin() {
			setInterval(function(){
				randomelement();
			},4000);
		}
		function randomInteger(min, max) { 
			return Math.floor(Math.random() * (max - min + 1)) + min; 
		}
		function randomelement() {			
			let top = randomInteger(curtop+10,curtop+390);
			let left = randomInteger(curleft+10,curleft+790);
			//75% - green coin; 25% - red coin
			if ((points!=0)&&((randomInteger(2,5)%5)==0)) {
				pts.push({'top': top, 'left': left, 'type': 'red'});
				$('#bggame').append('<div class="coin" style="top: ' + top + 'px; left: '+ left +'px; background-color: ' + pts[pts.length-1].type +';"></div>');
			} else {
				pts.push({'top': top, 'left': left, 'type': 'green'});
				$('#bggame').append('<div class="coin" style="top: ' + top + 'px; left: '+ left +'px; background-color: ' + pts[pts.length-1].type +';"></div>');
				}	
		}
		function addtail() {
			let atop = snake[snake.length-1].top + (direc.vertail);
			let aleft = snake[snake.length-1].left + (direc.hortail);
			snake.push({'top': atop, 'left': aleft});
			$('#bggame').append('<div class="start snakepart" style="top: ' + atop + 'px; left: '+ aleft +'px;"></div>');
			snakebody = document.querySelectorAll(".snakepart");
		}
		function keypress(ver, hor,	vertail, hortail) {
			direc.ver = ver; direc.hor = hor;
			direc.vertail = vertail; direc.hortail = hortail;
		}

		(function arrows() {
			body.addEventListener("keydown", function(e) {
				let smallertail = size/2;
				  switch(e.key) {
				  	case "ArrowUp":
				  		keypress(1,0,smallertail,0); break;
		    		case "ArrowDown":
		    			keypress(-1,0,-smallertail,0); break;
				    case "ArrowLeft":
				        keypress(0,1,0,smallertail); break;
				    case "ArrowRight":
				    	keypress(0,-1,0,-smallertail); break;
				    case "8":
				    	keypress(1,0,smallertail,0); break;
				    case "3":
				    	keypress(-1,-1,-smallertail,0); break;
				    case "7":
				    	keypress(1,1,smallertail,0); break;
				    case "9":
				    	keypress(1,-1,smallertail,0); break;
				    case "1":
				    	keypress(-1,1,-smallertail,0); break;
				    case "6":
				    	keypress(0,-1,0,-smallertail); break;
				    case "4":
				    	keypress(0,1,0,smallertail); break;
				    case "2":
				    	keypress(-1,0,-smallertail,0); break;
				    case "a":
				    	addtail();
				        break;
				}
			});
		})();
		//window.onload = arrows();
		snakemove(snake);
		randomelement();
		placecoin();
	})();