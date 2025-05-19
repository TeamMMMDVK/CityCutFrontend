console.log("Her er vi i cookiePolicy")

export default () => `
<div id="policy">
    <h1>Cookie-politik</h1>
<p>En cookie er en lille datafil, som gemmes på din computer for at kunne genkende computeren ved senere besøg. En cookie er en passiv fil, som ikke kan indsamle oplysninger på din computer, sprede computervirus eller andre skadelige programmer.</p>
<p>Vi anvender ikke cookies, men derimod lokale opbevaringsteknologier som f.eks. browserens localStorage til at gemme midlertidige data i forbindelse med bookingprocessen, såsom valgt behandling, frisør og tidspunkt. Disse oplysninger gemmes kun midlertidigt i din browser og anvendes ikke til tracking eller markedsføring.</p>
<p>Ved login anvender vi en sikker adgangstoken (JWT) som gemmes i browseren for at sikre adgang til din brugerkonto. Denne token er nødvendig for, at systemet fungerer korrekt, og udløber automatisk eller efter endt session.</p>
</div>
`;