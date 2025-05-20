
export function populateNavBar () {
    const navbar = document.getElementById("linkbar");
/*
    let html ="";
    html += `<li><a href="/testme" data-link>TEST</a></li>`
 */

    const newItem = document.createElement('li')
    newItem.innerHTML = `<a href="/testme" data-link>TEST</a>`
    navbar.appendChild(newItem)
}