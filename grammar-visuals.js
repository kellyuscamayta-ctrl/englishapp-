
/* Illustrated, tappable grammar examples. SVG characters are individual reusable assets, not screenshots. */
const GRAMMAR_VISUALS={
"Subject Pronouns":[
["I","Yo","I am happy.","Estoy feliz.","woman"],["You","Tú / Usted","You are my friend.","Tú eres mi amigo/a.","person"],["He","Él","He is a pilot.","Él es piloto.","pilot"],["She","Ella","She is a teacher.","Ella es profesora.","teacher"],["It","Eso / Ello","It is an airplane.","Es un avión.","plane"],["We","Nosotros/as","We are students.","Somos estudiantes.","group"],["They","Ellos/as","They are friends.","Ellos son amigos.","friends"]
],
"Verb to be: am / is / are":[
["I am","Yo soy / estoy","I am ready.","Estoy listo/a.","woman"],["You are","Tú eres / estás","You are kind.","Eres amable.","person"],["He is","Él es / está","He is a pilot.","Él es piloto.","pilot"],["She is","Ella es / está","She is happy.","Ella está feliz.","teacher"],["It is","Es / Está","It is a plane.","Es un avión.","plane"],["We are","Nosotros somos / estamos","We are friends.","Somos amigos.","group"],["They are","Ellos son / están","They are students.","Son estudiantes.","friends"]
]
};
function grammarVisualArt(kind){
const hair=kind==="pilot"?"#6b4b37":kind==="teacher"?"#af7459":"#77533f";
const person=(x,shirt,hairColor=hair)=>'<g transform="translate('+x+' 0)"><ellipse cx="56" cy="134" rx="43" ry="38" fill="'+shirt+'"/><rect x="47" y="91" width="18" height="21" rx="7" fill="#f0b995"/><ellipse cx="56" cy="63" rx="39" ry="44" fill="'+hairColor+'"/><ellipse cx="56" cy="76" rx="31" ry="35" fill="#f5c7a5"/><path d="M25 63 Q31 16 68 26 Q85 30 88 67 Q70 45 55 45 Q42 62 25 63Z" fill="'+hairColor+'"/><circle cx="45" cy="78" r="3.5" fill="#453443"/><circle cx="68" cy="78" r="3.5" fill="#453443"/><path d="M48 93 Q56 100 65 92" fill="none" stroke="#b86e77" stroke-width="2.8" stroke-linecap="round"/><ellipse cx="27" cy="80" rx="5" ry="8" fill="#f1b99a"/><ellipse cx="86" cy="80" rx="5" ry="8" fill="#f1b99a"/></g>';
let art="";
if(kind==="plane")art='<g transform="translate(9 38)"><path d="M8 63 L76 47 L115 4 Q125 -5 132 5 L112 52 L174 72 Q188 76 187 84 L105 80 L70 112 L54 108 L67 76 L8 75Z" fill="#f9fbff" stroke="#788cc4" stroke-width="4" stroke-linejoin="round"/><path d="M78 47 L112 52 L105 80 L67 76Z" fill="#a3b9e8"/><circle cx="137" cy="73" r="5" fill="#8c75c4"/><circle cx="155" cy="77" r="5" fill="#8c75c4"/></g>';
else if(kind==="group"||kind==="friends")art=person(15,"#b9a3e9","#684f42")+person(107,"#dba8bb","#976b4e");
else art=person(60,kind==="pilot"?"#7f9cc4":kind==="teacher"?"#c9a0db":"#cda7c7");
return '<svg viewBox="0 0 240 165" role="img" aria-label="Illustrated '+kind+'" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a1bg-'+kind+'" x2="1" y2="1"><stop stop-color="#fff5ec"/><stop offset="1" stop-color="#eadffc"/></linearGradient></defs><rect width="240" height="165" rx="20" fill="url(#a1bg-'+kind+')"/><circle cx="195" cy="35" r="25" fill="#ffffff" opacity=".45"/><path d="M0 137 Q100 113 240 141 L240 165 L0 165Z" fill="#e0d4ef"/>'+art+'</svg>';
}
function grammarVisualGallery(title){
const items=GRAMMAR_VISUALS[title];if(!items)return "";
return '<section class="grammar-visual-section"><div class="grammar-visual-title"><span>LOOK · TAP · LISTEN</span><h3>Learn with pictures / Aprende con imágenes</h3><p>Toca cada escena para escuchar una oración y descubrir su significado.</p></div><div class="grammar-visual-grid">'+items.map(([label,meaning,en,es,art],i)=>'<button class="grammar-picture-card" data-grammar-picture="'+i+'" type="button">'+grammarVisualArt(art)+'<strong>'+label+'</strong><span>'+meaning+'</span><small>🔊 Tap to explore</small></button>').join("")+'</div><div class="grammar-picture-feedback" id="grammarPictureFeedback" role="status"><b>Choose a picture / Elige una imagen</b><span>Listen to the English sentence.</span></div></section>';
}
function grammarVisualWire(title){
const items=GRAMMAR_VISUALS[title];if(!items)return;
document.querySelectorAll("[data-grammar-picture]").forEach(el=>el.onclick=()=>{
const [label,meaning,en,es]=items[Number(el.dataset.grammarPicture)];
document.querySelectorAll("[data-grammar-picture]").forEach(x=>x.classList.toggle("active",x===el));
const out=document.querySelector("#grammarPictureFeedback");out.innerHTML="<b>"+esc(en)+"</b><span>"+esc(es)+"</span>";
if(typeof a1Audio==="function")a1Audio(en);
});
}
