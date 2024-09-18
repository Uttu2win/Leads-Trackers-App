import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";


const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-f7402-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database,"leads")
''
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl= document.getElementById("ul-el")
const deleteBtn =document.getElementById("delete-btn");

deleteBtn.addEventListener("dblclick", ()=>{
    remove(referenceInDB);
    ulEl.innerHTML= ""

    
})
inputBtn.addEventListener("click", ()=>{
    push(referenceInDB, inputEl.value);
    inputEl.value="";

})

function render(leads){
    let listItems=""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                     ${leads[i]}
                </a>
            </li>`
        // const li =document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    
    ulEl.innerHTML= listItems
}

onValue(referenceInDB, function (snapshot){
    if(snapshot.exists()){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
    
})