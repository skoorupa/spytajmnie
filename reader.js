var plik = document.getElementById("plik");
var form = document.getElementById("form");
var results = document.getElementById("results");
var plikweb = document.getElementById("plikweb");
// DKM <3 KK
var kod;
var pytanietemp;

function openFile(){
  var reader = new FileReader();
  reader.onload = function(){
    kod = reader.result;
    readCode();
  };
  reader.onerror = function(){
    form.innerHTML = "<h2>Nie udało się wczytać pliku!</h2>";
  };
  reader.readAsText(plik.files[0]);
}

function openFileInternet(ur){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      kod = xhr.responseText;
    } else if(xhr.readyState==4&&xhr.status!=200){
      form.innerHTML = "<h2>Nie udało się wczytać pliku!</h2>";
    }
  };
  if(ur){
    xhr.open("GET", ur, true);
  } else xhr.open("GET", plikweb.value, true);
  xhr.send();
}

function readCode(){
  form.innerHTML="";
  results.innerHTML="";
  pytania=0;
  code = kod.split("\n");
  cl = code.length;
  textodpowiedzi = [];
  pytanietemp = "";

  for (var i=0;i<cl;i++){
    switch(code[i][0]){
      case "*":
        console.log("komentarz "+i);
      break;
      case "^":
        var plaintext = document.createElement("div");
        plaintext.style.fontStyle="italic";

        if(plaintext.textContent==="") plaintext.textContent=code[i].substring(1,code[i].length);
        else plaintext.innerText=code[i].substring(1,code[i].length);

        if(pytanietemp) pytanietemp.appendChild(plaintext);
        else form.appendChild(plaintext);
      break;
      case "r":
        if(pytania>0) form.appendChild(pytanietemp);
        pytania++;
        pytanietemp = document.createElement("form");
        pytanietemp.setAttribute("class","questionradio question");
        var tytul = document.createElement("h2");
        tytul.setAttribute("class","tytulpytania");
        tytul.innerHTML = code[i].substring(2,code[i].length);
        pytanietemp.appendChild(tytul);
      break;
      case "t":
        if(pytania>0) form.appendChild(pytanietemp);
        pytania++;
        pytanietemp = document.createElement("form");
        switch(code[i][1]){
          case "U":
            pytanietemp.setAttribute("class","questiontext question iuppercase");
          break;
          case "P":
            pytanietemp.setAttribute("class","questiontext question irPL");
          break;
          case "A":
            pytanietemp.setAttribute("class","questiontext question iall");
          break;
          case " ":
            pytanietemp.setAttribute("class","questiontext question inothing");
          break;
        }
        var tytul = document.createElement("h2");
        tytul.setAttribute("class","tytulpytania");
        tytul.innerHTML = code[i].substring(2,code[i].length);
        pytanietemp.appendChild(tytul);
      break;
      case "c":
        if(pytania>0) form.appendChild(pytanietemp);
        pytania++;
        pytanietemp = document.createElement("form");
        pytanietemp.setAttribute("class","questioncheck question");
        var tytul = document.createElement("h2");
        tytul.setAttribute("class","tytulpytania");
        tytul.innerHTML = code[i].substring(2,code[i].length);
        pytanietemp.appendChild(tytul);
      break;
      case "-":
        var odpowiedz = document.createElement("input");
        odpowiedz.setAttribute("name",pytania);

        switch(pytanietemp.classList[0]){
          case "questionradio":
            odpowiedz.setAttribute("type","radio");
            odpowiedz.setAttribute("value","bad");
            pytanietemp.appendChild(odpowiedz);
    
            var txt = document.createElement("span");
            txt.innerHTML = code[i].substring(1,code[i].length);
            pytanietemp.appendChild(txt);
          break;
          case "questioncheck":
            odpowiedz.setAttribute("type","checkbox");
            odpowiedz.setAttribute("value","bad");
            pytanietemp.appendChild(odpowiedz);
    
            var txt = document.createElement("span");
            txt.innerHTML = code[i].substring(1,code[i].length);
            pytanietemp.appendChild(txt);
          break;
        }
        
        pytanietemp.appendChild(document.createElement("br"));
      break;
      case "+":
        var odpowiedz = document.createElement("input");
        odpowiedz.setAttribute("name",pytania);

        switch(pytanietemp.classList[0]){
          case "questionradio":
            odpowiedz.setAttribute("type","radio");
            odpowiedz.setAttribute("value","good");
            pytanietemp.appendChild(odpowiedz);
    
            var txt = document.createElement("span");
            txt.innerHTML = code[i].substring(1,code[i].length);
            pytanietemp.appendChild(txt);
          break;
          case "questiontext":

            odpowiedz.setAttribute("type","text");
            pytanietemp.appendChild(odpowiedz);
            var y = code[i].substring(1,code[i].length);

            if(escape(y).substring(y.length-3,y.length)==="%0D") y=escape(y).substring(0,y.length-3);

            textodpowiedzi[pytania] = y; 
          break;
          case "questioncheck":
            odpowiedz.setAttribute("type","checkbox");
            odpowiedz.setAttribute("value","good");
            pytanietemp.appendChild(odpowiedz);
    
            var txt = document.createElement("span");
            txt.innerHTML = code[i].substring(1,code[i].length);
            pytanietemp.appendChild(txt);
          break;
        }
        pytanietemp.appendChild(document.createElement("br"));
      break;
    }
  }
  form.appendChild(pytanietemp);

  var sprawdzbutton = document.createElement("button");
  sprawdzbutton.innerHTML="Sprawdź";
  sprawdzbutton.setAttribute("onclick","sprawdz()");
  form.appendChild(document.createElement("hr"));
  form.appendChild(document.createElement("br"));
  form.appendChild(sprawdzbutton);
}

function sprawdz(){
  wyniki = [];
  results.innerHTML='';
  //var f = document.forms["1"].getElementsByTagName("input");
  for (var i = 0; i < document.forms.length; i++) {
    wyniki[i]=false;
    var f = document.forms[i].getElementsByTagName("input");
    checkstatus = true;
    for (var j = 0; j < f.length; j++) {
      switch(document.forms[i].classList[0]){
        case "questionradio":
          if(f[j].checked&&f[j].value=="good") wyniki[i]=true;
        break;
        case "questiontext":
          switch(document.forms[i].classList[2]){
            case "iuppercase":
              if(f[j].value.toUpperCase()==textodpowiedzi[i+1].replace(/[\r]+/g, '').toUpperCase()) wyniki[i]=true;
            break;
            case "inothing":
              if(f[j].value==textodpowiedzi[i+1].replace(/[\r]+/g, '')) wyniki[i]=true;
            break;
            case "irPL":
              if(f[j].value.replacePolishLetters()==textodpowiedzi[i+1].replace(/[\r]+/g, '').replacePolishLetters()) wyniki[i]=true;
            break;
            case "iall":
              if(f[j].value.toUpperCase().replacePolishLetters()==textodpowiedzi[i+1].replace(/[\r]+/g, '').toUpperCase().replacePolishLetters()) wyniki[i]=true;
            break;
          }
        break;
        case "questioncheck":
          if(checkstatus){
            if(
              (f[j].checked&&f[j].value=="bad")||
              (!f[j].checked&&f[j].value=="good")
            ) checkstatus=false;
          }
        break;
      }
    }
    if(document.forms[i].classList[0]=="questioncheck") wyniki[i]=checkstatus;
  }
  for (var i = 0; i < document.forms.length; i++) {
    results.innerHTML+="Pytanie "+(i+1)+": ";
    if(wyniki[i]){
      results.innerHTML+="<b class='true'>Dobrze</b><br>";
      document.getElementsByClassName("tytulpytania")[i].style.color = "green";
    }
    else {
      results.innerHTML+="<b class='false'>Źle</b><br>";
      document.getElementsByClassName("tytulpytania")[i].style.color = "red";
    }
  }
}
