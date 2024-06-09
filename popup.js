var Dates = [];
const setDOMInfo = (info) => {
  Dates = [];
  console.log("INFO passing in setDomInfo",info);
  for(let i=0;i<info.length;i++){
    Dates.push(info[i].Date);
    let div1 = document.createElement('div');
    let span = document.createElement('span');
    // span.classList.add("samay ")
    let p = document.createElement('p');
    p.classList.add("para")
    div1.classList.add('HighlightedText');
    div1.setAttribute("id",info[i].id.toString()+"*");
    
    span.innerText = info[i].Date;
    p.innerText = info[i].innerText+'\n\nNOTE-> '+info[i].textareaText;
   
  
    div1.appendChild(p);
    div1.appendChild(span);
    document.body.appendChild(div1);
  };
  attachEventListeners();
};


const attachEventListeners = () => {
  const bts = document.getElementsByClassName('bt');
  for (let i = 0; i < bts.length; i++) {
    bts[i].addEventListener("click", () => {
      console.log(bts[i]);
      let doc = document.getElementById(bts[i].getAttribute('id').toString() + "*");
      let value = doc.querySelector('p').innerText;
      console.log(doc);
      navigator.clipboard.writeText(value);
    });
  }

  const keywordInput = document.getElementById('keyword');
  if (keywordInput) {
    keywordInput.addEventListener('input', searchDivs);
  }

  const dateSelect = document.getElementById('dateSelect');
  if (dateSelect) {
    dateSelect.addEventListener('change', organizeElements);
  }

  const download = document.getElementById('download');
  if (download) {
    download.addEventListener('click', popup);
  }
};



window.addEventListener('DOMContentLoaded', () => {

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
 
        setDOMInfo);
  });
});



//for download
async function popup() {
  // Create a modal dialog div
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
      <div class="modal-content">
          <p>Click OK to export to PDF</p>
          <button id="okBtn">OK</button>
      </div>
  `;
  document.body.appendChild(modal);

  // Add event listener to the OK button
  const okBtn = document.getElementById('okBtn');
  okBtn.addEventListener('click', async () => {
      // Remove the modal dialog
      modal.remove();

      // Proceed with PDF export
      document.body.style.fontSize = '20px';
      document.getElementsByClassName('navbar')[0].style.display = 'none';
      let d = document.getElementsByClassName('bt');
      for (let i = 0; i < d.length; i++) d[i].style.visibility = "hidden";
      await html2pdf().from(document.body).save('output.pdf');
      for (let i = 0; i < d.length; i++) d[i].style.visibility = "visible";
      document.getElementsByClassName('navbar')[0].style.display = 'flex';
      document.body.style.fontSize = '';
  });
}




document.getElementById('keyword').addEventListener('input', searchDivs);
function searchDivs() {
  console.log("searching ");

  const keyword = document.getElementById('keyword').value.toLowerCase();
  
  const divs = document.getElementsByClassName('HighlightedText');

  
  for (let i = 0; i < divs.length; i++) {
      const div = divs[i].querySelector('p');
      console.log(div);
    
      if (div.innerText.toLowerCase().includes(keyword)) {
        console.log("IF");
          
          divs[i].classList.remove('hide');
      } else if(keyword !="") {
        console.log("ELSE");
         
          divs[i].classList.add('hide');
      }
  }
}

