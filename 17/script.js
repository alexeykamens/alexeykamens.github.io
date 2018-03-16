
var image=['images/pearl.gif', 'images/shark.gif', 'images/octopus.gif', 'images/fish.gif', 'images/shell.gif', 'images/star-magenta.gif', 'images/star-magenta.gif']
var priz
// var resultcomb=document.querySelectorAll('.comb img')
var resultcomb=document.querySelectorAll('.comb img:last-child')
var imgline=document.querySelectorAll('.wrapper div')
function rand(min, max) {
	return Math.round(Math.random()*(max-min)+min);
}
//-------------------------------------------------------------
function el (elem) {
	return document.querySelector(elem)
}
//-------------------------------------------------------------

//-------------------------------------------------------------
function roll0() {
	for (var i = 0; i < imgline.length; i++) {
		for (var j = 0; j < (10-1); j++) {
			var img=imgline[i].children
			console.log(j)
			console.log(img)
			img[j].setAttribute('src', image[rand(0,6)])
		}
	}

	var inter=null,inter1=null, inter2=null;
	var pos=0, pos1=0, pos2=0
	clearInterval(inter);
	inter=setInterval(function(){
		pos++;
		imgline[0].style.bottom=pos+'px';
		if (pos%((54+4)*10)==0) {
			clearInterval(inter);
		}
	}, 0.5);

	setTimeout(function(){
		clearInterval(inter1);
		inter1=setInterval(function(){
			pos1++;
			imgline[1].style.bottom=pos1+'px';
			if (pos1%((54+4)*10)==0) {
				clearInterval(inter1);
			}
		}, 0.5);
	},540)

	setTimeout(function(){
		clearInterval(inter2);
		inter2=setInterval(function(){
			pos2++;
			imgline[2].style.bottom=pos2+'px';
			if (pos2%((54+4)*10)==0) {
				clearInterval(inter2);
			}
		}, 0.5);
	}, 1080)
	roll()
}
//-------------------------------------------------------------

function roll() {
	var prevNum=null, sameNum=0, num, starNum=0, k=0
	for (var i = 0; i < resultcomb.length; i++) {
		if (parseInt(el('#stavka').value)<0) {
		alert('так нельзя:)')
		return
		}
		if (parseInt(el('#stavka').value)>money) {
		alert('недостаточно денег')
		return
		}
		num=rand(0,6)
		if (prevNum==num) {
			sameNum++
		}
		prevNum=num
		if ((num==5)||(num==6)) {starNum++}
		resultcomb[i].setAttribute('src', image[num])
	}
	if ((sameNum==3)&&(prevNum==0)) {k=800}
	else if ((sameNum==2)&&(prevNum==1)) {k=200}
	else if ((sameNum==2)&&(prevNum==2)) {k=80}
	else if ((sameNum==2)&&(prevNum==3)) {k=40}
	else if ((sameNum==2)&&(prevNum==4)) {k=20}
	else if (starNum==3){k=10}
	else if (starNum==2){k=5}
	else if (starNum==1){k=2}
	if (k==0) {
		money-=parseInt(el('#stavka').value)
		priz="Ничего"
	}
	else {
		priz=parseInt(el('#stavka').value)*k
		money=money+priz
	}
	setTimeout(function(){
		el('#priz').innerHTML=priz
		el('#money').innerHTML=money
	}, 4000) 
}
//-------------------------------------------------------------
function addMoney() {
	if (parseInt(el('#extraMoney').value)<0) {
		alert('так нельзя:)')
		return
	}
	money+=parseInt(el('#extraMoney').value)
	el('#money').innerHTML=money
	el('#extraMoney').value='0'
}
//-------------------------------------------------------------


var money=parseInt(el('#money').innerHTML)
roll()
el('#priz').innerHTML='Внесите деньги и сделайте Вашу ставку'
el('#tobet').addEventListener('click', roll0)
el('#addMoney').addEventListener('click', addMoney)
for (var i = 0; i < resultcomb.length; i++) {
		for (var j = 0; j < 10; j++) {
			var img=document.createElement('img')
			img.setAttribute('src', image[rand(0,6)])
			resultcomb[i].parentElement.insertBefore(img, resultcomb[i])
		}
	}