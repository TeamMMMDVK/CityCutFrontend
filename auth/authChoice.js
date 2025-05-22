export default () => {
    return `
        <div>
            <h2>For at gennemføre din booking skal du logge ind med eksisterende bruger eller oprette en ny</h2>
            <br>
            <br>
            
            <button id="loginRedirect">Log ind</button>
            <button id="registerRedirect">Opret bruger</button>
        </div>
    `;
};

export function setupAuthChoiceEvents() {
    document.getElementById("loginRedirect").addEventListener("click", () => {
        history.pushState("", "", "/login");
        window.spaRouter();
    });

    document.getElementById("registerRedirect").addEventListener("click", () => {
        history.pushState("", "", "/opret");
        window.spaRouter();
    });
}
