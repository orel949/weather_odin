import "./styles.css";

async function getWeather(nom) {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${nom}?key=R38ZC3XSH3WMAYF9GHZML8VZG`);
    let data = await response.json();
    console.log(data);
    return data;
}

let ville = document.querySelector('#barreRecherche');
let bouton = document.querySelector('#search');
let data = await getWeather("Paris");

const conteneur = document.querySelector("#conteneurPrincipal");

const haut = document.createElement("div");
haut.classList.add("haut");

const ville1 = document.createElement("div");
ville1.classList.add("ville");

const strong = document.createElement("strong");
strong.textContent="Paris";
ville1.appendChild(strong);


let now = new Date(data.days[0].datetime);
let heure = new Date().toLocaleTimeString("fr-FR", {
  timeZone: data.timezone,
  hour: "2-digit",
  minute: "2-digit"
});
let formatted = now.toLocaleString('fr-FR', {
  weekday: "long",
  day: "numeric", 
  month: "long",
  year: "numeric"
});
const date = document.createElement("div");
date.classList.add("date");
date.textContent = formatted + " à " +heure;

haut.append(ville1, date);

const milieu = document.createElement("div");
milieu.classList.add("milieu");

const temps = document.createElement("div");
temps.classList.add("temps");

let icon = data.currentConditions.icon;
let module = await import(`@meteocons/svg/fill/${icon}.svg`);
const img = document.createElement("img");
img.src = module.default;

const rightTemps = document.createElement("div");
rightTemps.classList.add("right");

const resume = document.createElement("div");
resume.classList.add("resume");
resume.textContent = data.currentConditions.conditions;

const temp = document.createElement("div");
temp.classList.add("temp");
temp.textContent = ((data.currentConditions.temp-32)*5/9).toFixed(1)+"°C";

const ressenti = document.createElement("div");
ressenti.classList.add("ressenti");
ressenti.textContent = "Feels like "+ ((data.currentConditions.feelslike-32)*5/9).toFixed(1)+"°C";

rightTemps.append(resume, temp, ressenti);
temps.append(img, rightTemps);

const barreMilieu = document.createElement("div");
barreMilieu.classList.add("barre");

const description = document.createElement("div");
description.classList.add("description");
description.textContent = data.description;

milieu.append(temps, barreMilieu, description);

const bas = document.createElement("div");
bas.classList.add("bas");

const left = document.createElement("div");
left.classList.add("left");

const humidity = document.createElement("div");
humidity.classList.add("humidity");

const nomHumidity = document.createElement("div");
nomHumidity.classList.add("nom");
nomHumidity.textContent = "Humidité";

const barreHumidity = document.createElement("div");
barreHumidity.classList.add("barre");

const nombreHumidity = document.createElement("div");
nombreHumidity.classList.add("nombre");
nombreHumidity.textContent = data.currentConditions.humidity+"%";

humidity.append(nomHumidity, barreHumidity, nombreHumidity);

const uv = document.createElement("div");
uv.classList.add("uv");

const nomUv = document.createElement("div");
nomUv.classList.add("nom");
nomUv.textContent = "Indice UV";

const barreUv = document.createElement("div");
barreUv.classList.add("barre");

const nombreUv = document.createElement("div");
nombreUv.classList.add("nombre");
nombreUv.textContent = data.currentConditions.uvindex;

uv.append(nomUv, barreUv, nombreUv);

left.append(humidity, uv);

const right = document.createElement("div");
right.classList.add("right");

const temperature = document.createElement("div");
temperature.classList.add("temperature");

const nomTemp = document.createElement("div");
nomTemp.classList.add("nom");
nomTemp.textContent = "Température";

const barreTemp = document.createElement("div");
barreTemp.classList.add("barre");

const nombreTemp = document.createElement("div");
nombreTemp.classList.add("nombre");
nombreTemp.textContent = ((data.currentConditions.temp-32)*5/9).toFixed(1)+"°C";

temperature.append(nomTemp, barreTemp, nombreTemp);

const vent = document.createElement("div");
vent.classList.add("vent");

const nomVent = document.createElement("div");
nomVent.classList.add("nom");
nomVent.textContent = "Vitesse du vent";

const barreVent = document.createElement("div");
barreVent.classList.add("barre");

const nombreVent = document.createElement("div");
nombreVent.classList.add("nombre");
nombreVent.textContent = (data.currentConditions.windspeed*1.609).toFixed(1)+"km/h";

vent.append(nomVent, barreVent, nombreVent);

right.append(temperature, vent);

bas.append(left, right);

conteneur.append(haut, milieu, bas);

bouton.addEventListener("click",async ()=>{
    if (ville.value!=""){
        data = await getWeather(ville.value);
        now = new Date(data.days[0].datetime);
        heure = new Date().toLocaleTimeString("fr-FR", {
            timeZone: data.timezone,
            hour: "2-digit",
            minute: "2-digit"
        });
        formatted = now.toLocaleString('fr-FR', {
            weekday: "long",
            day: "numeric", 
            month: "long",
            year: "numeric"
        });
        strong.textContent=ville.value;
        date.textContent = formatted + " à " +heure;
        resume.textContent = data.currentConditions.conditions;
        temp.textContent = ((data.currentConditions.temp-32)*5/9).toFixed(1)+"°C";
        ressenti.textContent = "Feels like "+ ((data.currentConditions.feelslike-32)*5/9).toFixed(1)+"°C";
        description.textContent = data.description;
        nombreHumidity.textContent = data.currentConditions.humidity+"%";
        nombreUv.textContent = data.currentConditions.uvindex;
        nombreTemp.textContent = ((data.currentConditions.temp-32)*5/9).toFixed(1)+"°C";
        nombreVent.textContent = (data.currentConditions.windspeed*1.609).toFixed(1)+"km/h";
        icon = data.currentConditions.icon;
        module = await import(`@meteocons/svg/fill/${icon}.svg`);
        img.src = module.default;
    }
})

const btnUnite = document.querySelector("#unite");
btnUnite.addEventListener("click",()=>{
    if (btnUnite.textContent=="US"){
        btnUnite.textContent="FR";
        temp.textContent = ((data.currentConditions.temp-32)*5/9).toFixed(1)+"°C";
        ressenti.textContent = "Feels like "+ ((data.currentConditions.feelslike-32)*5/9).toFixed(1)+"°C";
        nombreTemp.textContent = ((data.currentConditions.temp-32)*5/9).toFixed(1)+"°C";
        nombreVent.textContent = (data.currentConditions.windspeed*1.609).toFixed(1)+"km/h";
    }
    else{
        btnUnite.textContent="US";
        temp.textContent = data.currentConditions.temp.toFixed(1)+"°F";
        ressenti.textContent = "Feels like "+ data.currentConditions.feelslike.toFixed(1)+"°F";
        nombreTemp.textContent = data.currentConditions.temp.toFixed(1)+"°F";
        nombreVent.textContent = data.currentConditions.windspeed.toFixed(1)+"mph";
    }
})

