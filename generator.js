var kod = [];
var znaki = ["r","c","t","tU","tP","tA","+","-","^","*"];
var gen = document.getElementById('generator');
var pytanie = 0;
var oppopodp = document.getElementById("oppopodp");
var opblodp = document.getElementById("opblodp");
var tytuledytor = document.getElementById("tytuledytor");

oppopodp.setAttribute("disabled","disabled");
opblodp.setAttribute("disabled","disabled");

function dodajelement(){
	var znak = document.getElementById('elc').value;
	var zawartosc = document.getElementById('el').value;
	document.getElementById('el').value = "";
	if (
		znak=="r"
		||znak=="c"
		||znak=="t"
		||znak=="tU"
		||znak=="tP"
		||znak=="tA"
	) { // pytanie
		oppopodp.removeAttribute("disabled","disabled");
		pytanie++;
		kod[kod.length]=znak+" "+zawartosc;
		var mmmn = document.createElement("legend");
		mmmn.innerHTML="Pytanie kat. "+znak+": <span class='pytanietytul'>"+zawartosc+"</span>";

		var but = document.createElement("button");
		but.setAttribute("onclick","usunelement(this)");
		but.innerHTML="Usuń";
		var upbut = document.createElement("button");
		upbut.setAttribute("onclick","dogory(this.parentNode.parentNode)");
		upbut.innerHTML="^";
		var downbut = document.createElement("button");
		downbut.setAttribute("onclick","dodolu(this.parentNode.parentNode)");
		downbut.innerHTML="v";

		mmmn.appendChild(but);
		mmmn.appendChild(upbut);
		mmmn.appendChild(downbut);
		var fs = document.createElement("fieldset");
		fs.appendChild(mmmn);
		fs.setAttribute("class",znak+" pytanie em");
		for (var i = 0; i < document.getElementsByClassName('oppytanie').length; i++) {
			document.getElementsByClassName('oppytanie')[i].setAttribute("disabled","disabled");
		}
		gen.appendChild(fs);
		oppopodp.setAttribute("selected","selected");
		if(opblodp.disabled=="disabled") opblodp.removeAttribute("disabled","disabled");
		if(
			znak=="t"
			||znak=="tU"
			||znak=="tP"
			||znak=="tA"
		){
			opblodp.setAttribute("disabled","disabled");
		}
	} else if(
		znak=="+"
	){
		kod[kod.length]=znak+" "+zawartosc;
		var mmmn = document.createElement("div");
		mmmn.innerHTML="odp + "+zawartosc;
		mmmn.setAttribute("class","plus odpowiedz em");

		var but = document.createElement("button");
		but.setAttribute("onclick","usunelement(this)");
		but.innerHTML="Usuń";
		var dbut = document.createElement("div");
		dbut.appendChild(but);
		var upbut = document.createElement("button");
		upbut.setAttribute("onclick","dogory(this.parentNode.parentNode)");
		upbut.innerHTML="^";
		var downbut = document.createElement("button");
		downbut.setAttribute("onclick","dodolu(this.parentNode.parentNode)");
		downbut.innerHTML="v";

		dbut.appendChild(upbut);
		dbut.appendChild(downbut);
		mmmn.appendChild(dbut);
		document.getElementsByClassName("pytanie")[pytanie-1].appendChild(mmmn);
		for (var i = 0; i < document.getElementsByClassName('oppytanie').length; i++) {
			document.getElementsByClassName('oppytanie')[i].removeAttribute("disabled","disabled");
		}
		var znakpytania = document.getElementsByClassName("pytanie")[pytanie-1].classList[0];
		oppopodp.setAttribute("disabled","disabled");
		if(
			znakpytania=="t"
			||znakpytania=="tU"
			||znakpytania=="tP"
			||znakpytania=="tA"
		){
			oppopodp.setAttribute("disabled","disabled");
		}
		if(
			znakpytania=="c"
		){
			oppopodp.removeAttribute("disabled","disabled");
		}
		oppopodp.removeAttribute("selected","selected");
	} else if(
		znak=="-"
	){
		kod[kod.length]=znak+" "+zawartosc;
		var mmmn = document.createElement("div");
		mmmn.innerHTML="odp - "+zawartosc;
		mmmn.setAttribute("class","minus odpowiedz em");

		var but = document.createElement("button");
		but.setAttribute("onclick","usunelement(this)");
		but.innerHTML="Usuń";
		var dbut = document.createElement("div");
		dbut.appendChild(but);
		var upbut = document.createElement("button");
		upbut.setAttribute("onclick","dogory(this.parentNode.parentNode)");
		upbut.innerHTML="^";
		var downbut = document.createElement("button");
		downbut.setAttribute("onclick","dodolu(this.parentNode.parentNode)");
		downbut.innerHTML="v";

		dbut.appendChild(upbut);
		dbut.appendChild(downbut);
		mmmn.appendChild(dbut);
		document.getElementsByClassName("pytanie")[pytanie-1].appendChild(mmmn);
	} else {
		kod[kod.length]=znak+" "+zawartosc;
		var mmmn = document.createElement("div");
		mmmn.innerHTML=znak+" "+zawartosc;
		mmmn.setAttribute("class","em");

		var but = document.createElement("button");
		but.setAttribute("onclick","usunelement(this)");
		but.innerHTML="Usuń";
		var dbut = document.createElement("div");
		dbut.appendChild(but);
		var upbut = document.createElement("button");
		upbut.setAttribute("onclick","dogory(this.parentNode.parentNode)");
		upbut.innerHTML="^";
		var downbut = document.createElement("button");
		downbut.setAttribute("onclick","dodolu(this.parentNode.parentNode)");
		downbut.innerHTML="v";

		dbut.appendChild(upbut);
		dbut.appendChild(downbut);
		mmmn.appendChild(dbut);
		document.getElementsByTagName("fieldset")[document.getElementsByTagName("fieldset").length-1].appendChild(mmmn);
	}
}

function usunelement(element){
	if(element.parentNode.parentNode.classList[1]=="pytanie"){
		element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
		for (var i = 0; i < document.getElementsByClassName('oppytanie').length; i++) {
			document.getElementsByClassName('oppytanie')[i].setAttribute("disabled","disabled");
		}
		opblodp.setAttribute("selected","selected");
		opblodp.removeAttribute("disabled","disabled");
		oppopodp.setAttribute("disabled","disabled");
		pytanie--;
		if(pytanie==0){
			oppopodp.setAttribute("disabled","disabled");
			opblodp.setAttribute("disabled","disabled");
		}
	} else if(element.parentNode.parentNode.classList[0]=="plus"){
		element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
		for (var i = 0; i < document.getElementsByClassName('oppytanie').length; i++) {
			document.getElementsByClassName('oppytanie')[i].setAttribute("disabled","disabled");
		}
		oppopodp.setAttribute("selected","selected");
	} else {
		element.parentNode.parentNode.removeChild(element.parentNode);
	}
}

function zmientytul(){
	var v = tytuledytor.value;
	document.getElementsByClassName("pytanietytul")[document.getElementsByClassName("pytanietytul").length-1].innerHTML = v;
}

function usunodp(){
	document.getElementsByClassName("pytanie")[document.getElementsByClassName("pytanie").length-1]
}

function dogory(element){
	element.parentNode.insertBefore(element.previousSibling, element);
}

function dodolu(element){
	element.parentNode.insertBefore(element.nextSibling, element);
}


