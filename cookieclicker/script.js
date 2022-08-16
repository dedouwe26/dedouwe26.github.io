let clickersGekocht = {
    0:0,
    1:0,
    2:0,
    3:0,
    4:0
}
const kosten = {
    0:5,
    1:10,
    2:20,
    3:50,
    4:100
}
const kostenPowerups = {
    0:10,
    1:20,
    2:50,
    3:100,
    4:500
}
const clickerOpbrengst = {
    0:[1,2],
    1:[5,10],
    2:[10,20],
    3:[25,50],
    4:[50,100]
}
let powerups=[false, false, false, false, false];

let money=0;
let geldPerSeconde=0;

let showPanel=false;

const geldDiv=document.getElementById('geld')
const geldPerSecondeDiv=document.getElementById('geldPerSeconde')

// Hover wordt hier ingesteld.
document.addEventListener('mousemove',(e)=>{
    if (showPanel) {
        e = e || window.event;
        document.getElementById('panel').style.left=e.clientX+'px';
        document.getElementById('panel').style.top=e.clientY+'px';
    }
    
});

Array.prototype.slice.call(document.getElementsByClassName('tier')).forEach(el => {
    el.onHover = () => {
        let panel = document.createElement('div');
        panel.id='panel';
        panel.innerHTML='<div id="name">test</div><div id="discription">hello</div>';
        panel.style.border='5px brown solid';
        panel.style.borderRadius='4px';
        panel.style.width='200px';
        panel.style.height='150px';
        panel.style.position='absolute';
        document.body.appendChild(panel);
    }
    el.addEventListener('mousemove',(e)=>{
        document.getElementById('panel').style.left=e.clientX+'px';
        document.getElementById('panel').style.top=e.clientY+'px';
    });
    el.addEventListener('mouseout',(e)=>{
        document.getElementById('panel').remove();
    });
});
/* Voeg een nieuw icoontje toe aan de lijst met Actieve Clickers van tier tier */
function voegClickerToe(tier) {
    let el = document.createElement('img');
    switch (tier) {
        case 0:
            el.src='https://pngimg.com/uploads/chef/chef_PNG54.png' 
            break;
        case 1:
            el.src="https://www.softbankrobotics.com/emea/themes/custom/softbank/images/full-nao.png"
            break;
        case 2:
            el.src="https://www.bakkermeen.nl/inhoud/uploads/foto.jpg"
            break;
        case 3:
            el.src="https://static.wikia.nocookie.net/muppet/images/0/08/CookieMonsterWaving.jpg/revision/latest?cb=20120128192952"
            break;
        case 4:
            el.src="https://ih1.redbubble.net/image.2495645611.4420/st,small,507x507-pad,600x600,f8f8f8.jpg"
            break;
    }
    el.width='50';
    el.height='50';
    document.getElementsByClassName(`tier${tier}`)[0].appendChild(el)
}

/* Verander het geld bedrag dat op de pagina word weergegeven naar hoeveelheid. */
function updateGeld(hoeveelheid) {
    geldDiv.textContent=`Geld: ${hoeveelheid}$`
}

/* Verander het geld per seconde bedrag dat op de pagina word weergegeven naar hoeveelheid. */
function updateGeldPerSeconde(hoeveelheid) {
    geldPerSecondeDiv.textContent=`Geld per seconde: ${hoeveelheid}$`
}

/* Voegt 1$ toe en update de pagina */
function onClickCookie() {
    money++;
    updateGeld(money)
}

/* Berekent het geld dat de Clickers genereren per seconde. */
function berekenGeldPerSeconde() {
    geldPerSeconde=0;
    Object.entries(clickerOpbrengst).forEach((values)=>{
        geldPerSeconde+=clickersGekocht[values[0]] * (powerups[values[0]] ? values[1][1] : values[1][0])
    });
    updateGeldPerSeconde(geldPerSeconde)
}

/* Koopt een Powerup, mits hier geld voor is en de powerup nog niet gekocht is. Update de pagina. */
function koopPowerup(tier) {
    if (money-kostenPowerups[tier]<0) {alert('Jij bent blut!');return;}
    money-=kostenPowerups[tier];
    powerups[tier]=true;
    document.getElementsByClassName(`tier${tier}`)[2].onclick='';
    document.getElementsByClassName(`tier${tier}`)[2].style.color='lime';
    berekenGeldPerSeconde()
}

/* Koopt een Clicker, mits hier geld voor is en er nog ruimte is. Update de pagina. */
function koopClicker(tier) {
    if (money-kosten[tier]<0) {alert('Jij bent blut!');return;}
    money-=kosten[tier];
    clickersGekocht[tier]++;
    voegClickerToe(tier)
    updateGeld(money);
    berekenGeldPerSeconde();

}

/* Voegt het geld van de Clickers toe aan het geld. Update de pagina. */
function updateClickerGeld() {
    money+=geldPerSeconde;
    updateGeld(money);
}

/* Zorgt dat updateClickerGeld elke seconde activeert. */
setInterval(updateClickerGeld, 1000)

/* Created by Dedouwe */