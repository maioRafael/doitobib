
const api_url = "http://api.crossref.org/works/DOI-HERE/transform/application/x-bibtex";
var file = [];
var doi_list = ['10.1016/j.compag.2019.104932'];
var checkbox = document.querySelector("#checkbox"),
    fileElement = document.querySelector("#file"),
    textElement = document.querySelector("#text"),
    fileWrapper = document.querySelector("#file-wrapper"),
    textWrapper = document.querySelector("#text-wrapper"),
    form = document.querySelector("#form");

const onFileChange = function(event){
    file = event.target.files[0];
}
const onFormSubmit = async function(event){
    event.preventDefault();
    if(checkbox.checked ){
        if(file)
            readFile();
        else
            alert("select a file");
    } else {
        readText();
    }
    }
const readFile = function(){
    var reader = new FileReader();
    reader.onload = function(){
        doi_list = reader.result.split("\n");
        doiToBib();
    };
    reader.readAsText(file);
    
}
const doiToBib = async function(){
    var bib_list = "";
    for(let i of doi_list){
        let api_endpoint = api_url.replace("DOI-HERE",i.replace("https://doi.org/",""))
        var res = await axios.get(api_endpoint);
        bib_list += res.data + "\n"
    }
    var bib_text_area = document.querySelector("#bib");
    bib_text_area.value = bib_list;
}
const readText = function(){
    doi_list = [textElement.value];
    doiToBib();
}
const onCheckboxChange = function(event){
    if(event.target.checked){
        textWrapper.classList.add("hidden");
        fileWrapper.classList.remove("hidden");
    } else {
        textWrapper.classList.remove("hidden");
        fileWrapper.classList.add("hidden");
    }
}

form.addEventListener("submit", onFormSubmit);
fileElement.addEventListener("change", onFileChange);
checkbox.addEventListener("change", onCheckboxChange)

