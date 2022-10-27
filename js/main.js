const coursesDiv=document.getElementById("coursesDiv");      //contenitore dei corsi
const btnNew=document.getElementById("btnNewCourse");
const txtCourseName=document.getElementById("txtCourseName");
const divErr=document.getElementById("divErr");

btnNew.addEventListener("click",addCourse);

const coursesUrl="http://localhost:8080/api/courses";

getAllCourses();        //invoco la chiamata alla funzione al caricamento della pagina

//GET
function getAllCourses() {
    axios.get(coursesUrl)
        .then((response) => {
            // codice da eseguire quando la richiesta è andata a buon fine
            // response conterrà i dettagli della risposta
            coursesDiv.innerHTML="";        //svuoto il div di destinazione
            const elencoCorsi=response.data;        //è un vettore di JSON
            for (let i=0;i<elencoCorsi.length;i++) {
                const cDiv=document.createElement("div");
                cDiv.innerHTML=elencoCorsi[i].name;     // un div per ogni corso
                const img=document.createElement("img");    //aggiungo al cDiv un'immagine
                img.src="img/trash.png";
                img.title="Elimina corso";
                img.width=20;
                img.alt="Elimina corso";
                img.setAttribute("courseId",elencoCorsi[i].id);         //memorizzo l'id del corso in un attributo "courseId" dell'immagine
                img.addEventListener("click",deleteCourse);
                cDiv.appendChild(img);
                coursesDiv.appendChild(cDiv);   // aggiungo il div del corso
                
                
            }      
        })
        .catch((error) => {
            // codice da eseguire quando la richiesta non va a buon fine
            // error conterrà i dettagli della risposta 
            console.log(error);
        });
}

//POST
function addCourse() {
    if(txtCourseName.value!="") {
        //inserisco il corso
        const newCourse= {
            name: txtCourseName.value           
        }

        //chiamo l'API passando il JSON
        axios.post(coursesUrl,newCourse)
            .then((response) => {
                getAllCourses();        //ricarico la lista dei corsi
                txtCourseName.value="";
            })
            .catch((error) => {
                // codice da eseguire quando la richiesta non va a buon fine
                // error conterrà i dettagli della risposta 
                console.log(error);
                divErr.innerHTML="Impossibile inserire il corso: "+error.message;
            });
    } else
        alert("Il nome del corso è obbligatorio!");
}

function deleteCourse(event) {
    //event contiene info sull'evento
    //event.target è l'oggetto che ha scatenato l'evento (nel nostro caso l'img)
    let courseId=event.target.getAttribute("courseId");

    axios.delete(coursesUrl+"/"+courseId)
    .then((response) => {        
        getAllCourses();        //ricarico la lista dei corsi               
        })
    .catch((error) => {
        // codice da eseguire quando la richiesta non va a buon fine
        // error conterrà i dettagli della risposta 
        console.log(error);
        divErr.innerHTML="Impossibile inserire il corso: "+error.message;
    });

}