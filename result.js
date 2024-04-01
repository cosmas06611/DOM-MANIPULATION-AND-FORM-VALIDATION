const paragraph = document.querySelector("#paragraph");

// to get the query strings in our link we use below code
const params = new URLSearchParams(window.location.search);

params.forEach((value, key)=>{
    paragraph.append(`${key} = ${value}`)
    paragraph.append(document.createElement('br'));

})