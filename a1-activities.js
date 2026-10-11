
/* A1 activity engine: distinct experiences for reading, vocabulary and skills. */
const A1_VOCAB={
"Greetings":[["Hello","Hola","👋"],["Good morning","Buenos días","🌅"],["Good afternoon","Buenas tardes","☀️"],["Good evening","Buenas noches (saludo)","🌆"],["Good night","Buenas noches (despedida)","🌙"],["Goodbye","Adiós","👋"],["See you later","Hasta luego","✨"],["How are you?","¿Cómo estás?","💬"],["I'm fine, thanks","Estoy bien, gracias","💜"]],
"Introductions":[["My name is...","Me llamo...","🙋"],["Nice to meet you","Mucho gusto","🤝"],["I'm from Bolivia","Soy de Bolivia","🌎"],["What's your name?","¿Cómo te llamas?","💬"],["Where are you from?","¿De dónde eres?","🗺️"]],
"Countries and Nationalities":[["Bolivia","Bolivia","🇧🇴"],["Bolivian","Boliviano/a","🇧🇴"],["United States","Estados Unidos","🇺🇸"],["American","Estadounidense","🇺🇸"],["England","Inglaterra","🇬🇧"],["English","Inglés/a","🇬🇧"]],
"Family":[["Mother","Madre","👩"],["Father","Padre","👨"],["Sister","Hermana","👧"],["Brother","Hermano","👦"],["Grandmother","Abuela","👵"],["Grandfather","Abuelo","👴"],["Parents","Padres","👨‍👩‍👧"]],
"Colors":[["Red","Rojo","🔴"],["Blue","Azul","🔵"],["Yellow","Amarillo","🟡"],["Green","Verde","🟢"],["Purple","Morado","🟣"],["Orange","Naranja","🟠"],["Black","Negro","⚫"],["White","Blanco","⚪"]],
"Numbers 1–20":[["One","Uno","1"],["Two","Dos","2"],["Three","Tres","3"],["Four","Cuatro","4"],["Five","Cinco","5"],["Ten","Diez","10"],["Fifteen","Quince","15"],["Twenty","Veinte","20"]],
"Days of the Week":[["Monday","Lunes","📅"],["Tuesday","Martes","📅"],["Wednesday","Miércoles","📅"],["Thursday","Jueves","📅"],["Friday","Viernes","📅"],["Saturday","Sábado","📅"],["Sunday","Domingo","📅"]],
"Food":[["Bread","Pan","🍞"],["Rice","Arroz","🍚"],["Chicken","Pollo","🍗"],["Egg","Huevo","🥚"],["Cheese","Queso","🧀"],["Soup","Sopa","🍲"],["Fish","Pescado","🐟"]],
"Drinks":[["Water","Agua","💧"],["Coffee","Café","☕"],["Tea","Té","🍵"],["Milk","Leche","🥛"],["Juice","Jugo","🧃"]],
"Weather":[["Sunny","Soleado","☀️"],["Rainy","Lluvioso","🌧️"],["Cloudy","Nublado","☁️"],["Windy","Ventoso","💨"],["Cold","Frío","❄️"],["Hot","Caluroso","🌡️"]],
"Clothes":[["Shirt","Camisa","👕"],["Trousers","Pantalones","👖"],["Dress","Vestido","👗"],["Shoes","Zapatos","👟"],["Jacket","Chaqueta","🧥"],["Hat","Sombrero","🧢"]],
"Animals":[["Cat","Gato","🐱"],["Dog","Perro","🐶"],["Bird","Pájaro","🐦"],["Fish","Pez","🐟"],["Horse","Caballo","🐴"],["Rabbit","Conejo","🐰"]],
"Transport":[["Car","Auto","🚗"],["Bus","Autobús","🚌"],["Train","Tren","🚆"],["Airplane","Avión","✈️"],["Bicycle","Bicicleta","🚲"],["Taxi","Taxi","🚕"]],
"Places in Town":[["Hospital","Hospital","🏥"],["School","Escuela","🏫"],["Bank","Banco","🏦"],["Park","Parque","🌳"],["Airport","Aeropuerto","✈️"],["Supermarket","Supermercado","🛒"]],
"Body Parts":[["Head","Cabeza","🙂"],["Hand","Mano","✋"],["Arm","Brazo","💪"],["Leg","Pierna","🦵"],["Eye","Ojo","👁️"],["Ear","Oreja","👂"]],
"House and Rooms":[["Kitchen","Cocina","🍳"],["Bedroom","Dormitorio","🛏️"],["Bathroom","Baño","🛁"],["Living room","Sala","🛋️"],["Garden","Jardín","🌿"]]
};
const A1_SIGNS=[
["EXIT","Salida","exit"],["ENTRANCE","Entrada","entrance"],["NO SMOKING","Prohibido fumar","no-smoking"],["GATE 4","Puerta 4","gate"],["STOP","Alto / Pare","stop"],["NO ENTRY","Prohibido entrar","no-entry"],["INFORMATION","Información","info"],["RESTROOMS","Baños","restroom"]
];
const A1_READING_LABELS={
Signs:"Señales y letreros",Notices:"Avisos",Posters:"Carteles",Menus:"Menús",Timetables:"Horarios",Forms:"Formularios",Ads:"Anuncios", "Text Messages":"Mensajes de texto","Short Emails":"Correos breves","Personal Profiles":"Perfiles personales","Simple Descriptions":"Descripciones sencillas","Short Stories":"Historias cortas","Basic Instructions":"Instrucciones básicas","Simple Travel Information":"Información de viajes","A1 Reading Review":"Repaso de lectura"
};
function a1Audio(text){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.86;speechSynthesis.speak(u)}
function a1Activity(title,crumb){
const category=crumb.label;
const isReading=category==="Reading";
const words=A1_VOCAB[title];
if(!isReading&&!words)return false;
const escapeText=esc;
const source=isReading?READING_LESSONS[title]:null;
const progressKey="englishapp:a1-activity:"+category+":"+title;
const prev=localStorage.getItem(progressKey)==="yes";
const returnHref=crumb.href;
let visual="";
if(isReading){
 if(title==="Signs")visual='<div class="a1-sign-grid">'+A1_SIGNS.map(([en,es,kind],i)=>'<button class="a1-sign a1-sign-'+kind+'" data-meaning="'+i+'"><span class="a1-sign-face">'+(kind==="no-smoking"?"⊘ ":kind==="exit"?"➜ ":kind==="entrance"?"↳ ":kind==="info"?"ⓘ ":kind==="restroom"?"◉ ":"")+escapeText(en)+'</span><small class="a1-sign-translation" hidden>'+escapeText(es)+'</small></button>').join("")+'</div><p class="a1-hint">Toca cada señal para descubrir qué significa.</p>';
 else if(title==="Menus")visual='<div class="a1-menu-art"><h3>☕ LITTLE CAFÉ</h3><div><span>TEA</span><b>$2</b></div><div><span>COFFEE</span><b>$3</b></div><div><span>SANDWICH</span><b>$5</b></div><div><span>ORANGE JUICE</span><b>$4</b></div></div>';
 else if(title==="Timetables")visual='<div class="a1-schedule-art"><h3>🚌 BUS DEPARTURES</h3><div><b>8:00</b><span>City Center</span></div><div><b>8:30</b><span>Airport</span></div><div><b>9:00</b><span>Museum</span></div></div>';
 else if(title==="Forms")visual='<div class="a1-form-art"><h3>✎ REGISTRATION FORM</h3><label>FIRST NAME <span>Emma</span></label><label>LAST NAME <span>Brown</span></label><label>COUNTRY <span>Bolivia</span></label></div>';
 else visual='<div class="a1-reading-document"><span class="a1-doc-stamp">'+escapeText(title.toUpperCase())+'</span><p>'+escapeText(source?.en||"Read carefully and find the key information.")+'</p></div>';
 visual+='<div class="a1-reading-help"><h3>📖 Read & understand / Lee y comprende</h3><p>'+escapeText(source?.en||"Practice finding the important information in this text.")+'</p><button type="button" class="a1-outline" id="a1Translation">Ver traducción al español</button><p id="a1Spanish" hidden>'+escapeText(source?.es||"Repasa el contenido de esta lectura.")+'</p><button type="button" class="a1-outline" id="a1Listen">🔊 Escuchar en inglés</button></div>';
}else{
 visual='<div class="a1-vocab-grid">'+words.map(([en,es,art],i)=>'<button class="a1-vocab-card" data-vocab="'+i+'"><span class="a1-vocab-art">'+escapeText(art)+'</span><b>'+escapeText(en)+'</b><span>'+escapeText(es)+'</span><small>🔊 Escuchar</small></button>').join("")+'</div>';
}
const question=isReading?(source?{prompt:source.q,choices:source.choices,answer:source.answer}:null):{prompt:'How do you say "'+words[0][1]+'" in English?',choices:[words[0][0],words[Math.min(2,words.length-1)][0],words[Math.min(1,words.length-1)][0]],answer:0};
app.innerHTML=back(returnHref,crumb.label)+'<div class="a1-activity"><div class="a1-activity-head"><span class="po-kicker">A1 · '+escapeText(category.toUpperCase())+'</span><h1>'+escapeText(title)+'</h1><p>'+(isReading?escapeText(A1_READING_LABELS[title]||title)+' · Lee y comprende textos reales.':'Aprende palabras útiles con imágenes, traducción y pronunciación.')+'</p></div><div class="a1-activity-main">'+visual+'</div><section class="a1-check"><span class="po-kicker">CHECK YOUR UNDERSTANDING</span><h2>✏️ Comprueba lo aprendido</h2>'+(question?'<p>'+escapeText(question.prompt)+'</p><div class="a1-choices">'+question.choices.map((choice,i)=>'<button data-answer="'+i+'">'+escapeText(choice)+'</button>').join("")+'</div><p id="a1Feedback" role="status" aria-live="polite"></p>':'<p>Relee el texto e identifica la información más importante.</p>')+'<button id="a1Complete" class="a1-finish">'+(prev?'✓ Completado':'✓ Terminar actividad')+'</button></section></div>';
document.querySelectorAll("[data-vocab]").forEach(el=>el.onclick=()=>a1Audio(words[Number(el.dataset.vocab)][0]));
document.querySelectorAll("[data-meaning]").forEach(el=>el.onclick=()=>{const x=el.querySelector("small");x.hidden=!x.hidden});
const translate=document.querySelector("#a1Translation");if(translate)translate.onclick=()=>{const p=document.querySelector("#a1Spanish");p.hidden=!p.hidden};
const listen=document.querySelector("#a1Listen");if(listen)listen.onclick=()=>a1Audio(source?.en||title);
document.querySelectorAll("[data-answer]").forEach(el=>el.onclick=()=>{const correct=Number(el.dataset.answer)===question.answer;const out=document.querySelector("#a1Feedback");out.textContent=correct?"✓ Correct! ¡Muy bien!":"Inténtalo otra vez. / Try again.";out.className=correct?"correct":"incorrect";document.querySelectorAll("[data-answer]").forEach(b=>b.classList.toggle("a1-correct",Number(b.dataset.answer)===question.answer&&correct))});
document.querySelector("#a1Complete").onclick=()=>{if(localStorage.getItem(progressKey)!=="yes"){localStorage.setItem(progressKey,"yes");poAward(progressKey)}document.querySelector("#a1Complete").textContent="✓ Completado · +50 🪙";};
return true;
}
