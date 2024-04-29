

const newTicket= document.getElementById('lbl-new-ticket')
const submitTicket= document.querySelector('button')






async function numberTicket() {
  const reponse=await fetch('/api/ticket/last');
  const numberTicket= await reponse.json();
  newTicket.innerText=numberTicket
  console.log(numberTicket);
}

submitTicket.addEventListener("click",async function(){
    const reponse=await fetch('/api/ticket',{
        method: "POST"
    });
    const numberTicket= await reponse.json();
    newTicket.innerText=numberTicket.number;

})



numberTicket();