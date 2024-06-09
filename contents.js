
var but3 = 0;




document.addEventListener('click', function (event) {


  const highlightedText = event.target;
  // Check if the element has the class 'highlight'
  // Create an option button if it doesn't exist already
  const slides1 = document.getElementsByClassName('highlight');
  for (let i = 0; i < slides1.length; i++) {
    if(slides1[i].classList.contains('active')){
      slides1[i].classList.remove('active');
    }
  }
  var z=0;
  if (!document.querySelector('.hover-option-button') && highlightedText.classList.contains('highlight')) {
    for (z = 0; z < slides1.length; z++) {
      if(slides1[z].innerHTML==highlightedText.innerHTML){
        
        slides1[z].classList.add('active');
        break;
      }
    }
   
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.classList.add('main');
    let button1 = document.createElement('img');
    let button2 = document.createElement('img');
    let button3 = document.createElement('img');
    //adding buttons for the highlight,comment,note
    button1.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM2kZn9T0d-vKwz5jMkPx1ik23rLeMejLtHA&s';
    button2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wJxm0GPtZwgDyEjJ0lP2VlWQn3HbGCzrPA&s';
    button3.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NwmH4k2nx9NtfSVweYSAQ_10hw1GggdEwg&s';
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);
    button1.classList.add('hover-option-button-hover');
    button2.classList.add('hover-option-button-hover');
    button3.classList.add('hover-option-button-hover');


    // Get the bounding rectangle of the element
    var rect = slides1[z].getBoundingClientRect();

    // Calculate the pageX and pageY coordinates using scroll offsets
    var pageX = rect.left + (window.pageXOffset || document.documentElement.scrollLeft);
    var pageY = rect.top + (window.pageYOffset || document.documentElement.scrollTop);

    // Position the button near the highlighted text
    div.style.position = 'absolute';
    div.style.top = `${pageY + 25}px`; // Adjust position slightly below the cursor
    div.style.left = `${pageX + 25}px`; // Adjust position slightly to the right of the cursor

    // Remove the button when mouse leaves
    document.addEventListener('click', function () {
      // console.log("casdagsdagsdigas");
      if (div) {
        div.remove();
      }
    }, { once: true });

    if(but3){
      but3=0;
      document.getElementsByClassName('hover-option-button-hover')[2].click();
    }

    // HIGLIGHT BUTTON FOR GETTING THE COLOR OPTIONS

    button1.addEventListener('click', () => {
   
    
      // Create a container div for the color options
      let colorOptionsDiv = document.createElement('div');
      colorOptionsDiv.classList.add('main2');
      
      // Create div elements for color options
      let colorButton1 = createColorButton('#FFDC74');
      let colorButton2 = createColorButton('#FBAC87');
      let colorButton3 = createColorButton('#F3A6C8');
      let colorButton4 = createColorButton('#AEB5FF');
    
      // Append color buttons to the container div
      colorOptionsDiv.appendChild(colorButton1);
      colorOptionsDiv.appendChild(colorButton2);
      colorOptionsDiv.appendChild(colorButton3);
      colorOptionsDiv.appendChild(colorButton4);
    
      // Set position for the container div
      colorOptionsDiv.style.position = 'absolute';
      colorOptionsDiv.style.top = `${pageY + 25}px`; // Adjust position slightly below the cursor
      colorOptionsDiv.style.left = `${pageX + 25}px`;
    
      // Append the container div to the document body
      document.body.appendChild(colorOptionsDiv);
    div.remove();
    
      // Event listener to remove the color options div when clicking outside
      document.addEventListener('click', function (e) {
        if (colorOptionsDiv && !div.contains(e.target) && e.target != slides1[z]) {
          slides1[z].classList.remove('active');
          colorOptionsDiv.remove();
        }
      });
    
      // Handle color selection for highlights
      handleColorSelection(colorOptionsDiv);
    });
    
    // Function to create a color button with specified color
    function createColorButton(color) {
      let colorButton = document.createElement('div');
      colorButton.style.backgroundColor = color;
      colorButton.classList.add('hover-option-button');
      return colorButton;
    }
    
    // Function to handle color selection for highlights
    function handleColorSelection(colorOptionsDiv) {
      var highlights = JSON.parse(localStorage.getItem('highlights')) || [];
      // Iterate through existing highlights to match the current one
      highlights.forEach((highlight, index) => {
        if (highlight.url == window.location.href && highlight.text == highlightedText.innerHTML) {
          const slides = document.getElementsByClassName('highlight');
          let targetSlide;
          for (let i = 0; i < slides.length; i++) {
            if (slides[i].innerHTML == highlight.text) {
              targetSlide = slides[i];
              break;
            }
          }
          if (!targetSlide) return;
    
          const colorButtons = colorOptionsDiv.querySelectorAll('.hover-option-button');
          colorButtons.forEach((button, buttonIndex) => {
            button.addEventListener('click', () => {
              targetSlide.style.backgroundColor = button.style.backgroundColor;
              highlights[index].colour = button.style.backgroundColor;
              localStorage.setItem('highlights', JSON.stringify(highlights));
            });
          });
            // Exit the loop once a match is found
          return;
        }
      });
    }
    


  //  EVENT LISTENER FOR NOTE ADD BUTTON


   // Event listener for the second button click event
button2.addEventListener('click', function () {
  
 

  
  
  div.remove();
    // Retrieve highlights from localStorage or initialize an empty array
  const highlights2 = JSON.parse(localStorage.getItem('highlights')) || [];
  
  // Iterate through highlights
  highlights2.forEach((h,i) => {
    
    // Check if the current highlight matches the URL and text, and if textarea is not already open
    if(h.url==window.location.href && h.text==highlightedText.innerHTML && h.textarea==0){
      
      // Update the highlight's textarea state to indicate it's open
      highlights2[i].textarea=1;
      
      // Update highlights data in localStorage
      localStorage.setItem('highlights', JSON.stringify(highlights2));
      
      // Create a textarea element
      let textarea = document.createElement('textarea');
      textarea.classList.add('hover-textarea') ;
      
      // Position the textarea near the highlighted text
      textarea.style.position = 'absolute';
      textarea.style.top = `${pageY+25}px`;
      textarea.style.left = `${pageX+25}px`;
     
      textarea.value = highlights2[i].textareaText; // Set the initial value to existing comment
      
      
      document.body.appendChild(textarea);
      
      textarea.focus();
      
      
      textarea.addEventListener('blur', function () {
        
        // updating the color
        
        
        highlights2[i].textareaText=textarea.value;
        
        // Remove the textarea from the DOM
        textarea.remove();
        

        highlights2[i].textarea=0;
        
 
        localStorage.setItem('highlights', JSON.stringify(highlights2));
      });
    };
  });
  return;
});


    // Button to delete highlight
    button3.addEventListener('click', () => {
      // Remove the div
      div.remove();
      console.log("Delete function");
  
      // Create a confirmation dialog
      const confirmationDialog = document.createElement('div');
      confirmationDialog.classList.add('confirmation-dialog');
      confirmationDialog.innerHTML = `
          <div class="confirmation-message">Are you sure want to delete the highlighted text?</div>
          <div class="confirmation-buttons">
              <button class="confirm-button">Confirm</button>
              <button class="cancel-button">Cancel</button>
          </div>
      `;
  
      // Append the confirmation dialog to the body
      document.body.appendChild(confirmationDialog);
  
      // Function to handle confirm action
      const handleConfirm = () => {
          // Retrieve highlights from local storage
          const highlights2 = JSON.parse(localStorage.getItem('highlights')) || [];
  
          // Iterate through highlights
          highlights2.forEach((h, i) => {
              // Check if the highlight matches the current page and highlighted text
              if (h.url == window.location.href && h.text == highlightedText.innerHTML) {
                  // Get all highlighted elements
                  const slides = document.getElementsByClassName('highlight');
                  for (let i = 0; i < slides.length; i++) {
                      var d = slides.item(i);
                     
                      // If the highlighted text matches, remove its background color
                      if (d.innerHTML == h.text) d.style.backgroundColor = 'transparent';
                  }
                  
  
                  // Remove the highlight from the array
                  highlights2.splice(i, 1);
                  // Update localStorage with the modified highlights
                  localStorage.setItem('highlights', JSON.stringify(highlights2));
  
                  // Remove the active class from the current slide
                  slides1[z].classList.remove('active');
              
              }
          });
  
          // Remove the confirmation dialog
          confirmationDialog.remove();
      };
  
      // Add event listener for confirm button
      confirmationDialog.querySelector('.confirm-button').addEventListener('click', handleConfirm);
  
      // Add event listener for cancel button
      confirmationDialog.querySelector('.cancel-button').addEventListener('click', () => {
          // Remove the confirmation dialog
          confirmationDialog.remove();
      });
  });
  
////////////////////
  }
});


function highlightText(colour) {
  const url = window.location.href;
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  var len = selection.toString().length;
  const range = selection.getRangeAt(0);
  var parentElement = range.commonAncestorContainer;
  if (parentElement.nodeType === Node.TEXT_NODE) {
    parentElement = parentElement.parentNode;
  }
  function calculateOffsets(range, parentElement) { 
    var htmlContent = parentElement.innerHTML.toString();
    var startContainerHTML = '';
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      startContainerHTML = range.startContainer.nodeValue;
    } else {
      startContainerHTML = range.startContainer.outerHTML || range.startContainer.innerHTML;
    }
    startContainerHTML = startContainerHTML.toString();
    while(startContainerHTML[startContainerHTML.length-1]==" " || startContainerHTML[startContainerHTML.length-1]==String.fromCharCode(160)){
      startContainerHTML = startContainerHTML.substring(0,startContainerHTML.length-1);
    }
    while(startContainerHTML[0]==" " || startContainerHTML[0]==String.fromCharCode(160)){
      startContainerHTML = startContainerHTML.substring(1,startContainerHTML.length-1);
    }


    // Serialize the content of the range end container
    var endContainerHTML = '';
    if (range.endContainer.nodeType === Node.TEXT_NODE) {
      endContainerHTML = range.endContainer.nodeValue;
    } else {
      endContainerHTML = range.endContainer.outerHTML || range.endContainer.innerHTML;
    }
    endContainerHTML = endContainerHTML.toString();
    while(endContainerHTML[endContainerHTML.length-1]==" " || endContainerHTML[endContainerHTML.length-1]==String.fromCharCode(160)){
      endContainerHTML = endContainerHTML.substring(0,endContainerHTML.length-1);
    }
    while(endContainerHTML[0]==" " || endContainerHTML[0]==String.fromCharCode(160)){
      endContainerHTML = endContainerHTML.substring(1,endContainerHTML.length-1);
    }
    
    // Calculate the start offset
    var startOffset = range.startOffset;
    var temp = htmlContent;
    var check=0;
 
    for(let i=0;i<htmlContent.length;i++){
      if(htmlContent[i]=='<') check=1;
      else if(htmlContent[i]=='>') check=0;
      if(i==htmlContent.indexOf(startContainerHTML) && check==1){
        startOffset+=htmlContent.indexOf(startContainerHTML)+startContainerHTML.length;
        htmlContent=htmlContent.substring(htmlContent.indexOf(startContainerHTML)+startContainerHTML.length,htmlContent.length);
        i=0;
      }
      else if(i==htmlContent.indexOf(startContainerHTML) && check==0){
        startOffset+=i;
        break;
      }
    }

    htmlContent=temp;
    // for(let i=0;i<startOffset;i++){
    var array = [...htmlContent.matchAll('<span class="highlight"[^>]+>')];
  
    for(let j=0;j<array.length;j++){
    
      startOffset-=array[j].toString().length;
      startOffset-=7;
    }
    // }
    var endOffset = startOffset+len;



 

    // Return the end offset
    return {
        startOffset: startOffset,
        endOffset: endOffset
    };
 }

  // Calculate the start offset relative to the parent element
  var offsets = calculateOffsets(range, parentElement);

  // Log the start and end offsets
  // console.log("Start Offset: " + offsets.startOffset);
  // console.log("End Offset: " + offsets.endOffset);

  const startContainerXPath = getXPath(range.startContainer);
  const endContainerXPath = getXPath(range.endContainer);
  const highlight = {
    startContainerXPath: startContainerXPath,
    startOffset: offsets.startOffset,
    endContainerXPath: endContainerXPath,
    endOffset: offsets.endOffset
  };
  console.log("Range is "+ range);
  const span = document.createElement('span');
  span.style.backgroundColor = colour;
  span.className = 'highlight';
  const fragment = range.cloneContents();
  span.appendChild(fragment);
  range.deleteContents();
  range.insertNode(span);
  var text = span.innerHTML;
  saveHighlight(colour,url,text,range,highlight);
}



    ///////////////////////////////////////
    ////////////////////////////////////
    /////////////////////////
function saveHighlight(colour,url,text,range,highlight) {
  const currentDate = new Date(); // Get the current date and time
  const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = currentDate.toLocaleString('en-US', options); // Format the date string
  
  // console.log(formattedDate)
const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
highlights.push({
    colour : colour,
    url: url,
    text: text,
    startOffset: highlight.startOffset,
    endOffset: highlight.endOffset,
    parentXPath: getXPath(range.commonAncestorContainer),
    textarea : 0,
    textareaText : "",
    innerText : range.toString(),
    id: new Date().toString(),
    Date: formattedDate
});
localStorage.setItem('highlights', JSON.stringify(highlights));
}


function getXPath(element) {
const paths = [];
for (; element && element.nodeType == 1; element = element.parentNode) {
    let index = 0;
    for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
    if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE) continue;
    if (sibling.nodeName == element.nodeName) ++index;
    }
    const tagName = element.nodeName.toLowerCase();
    const pathIndex = (index ? `[${index + 1}]` : '');
    paths.splice(0, 0, tagName + pathIndex);
}
return paths.length ? '/' + paths.join('/') : null;
}


  const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
  highlights.forEach(h => {
    if(h.url==window.location.href) restoreHighlight(h);   //calling restore highlight function restore
  });


// Function to restore highlights
function restoreHighlight({colour, url, text, startOffset, endOffset, parentXPath,textarea,textareaText,innerText,id,Date}) {
  const parent = document.evaluate(parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!parent) return;
  if(startOffset<0) startOffset=0;
    var inner = parent.innerHTML;
    var array1 = [...inner.matchAll('<span class="highlight"[^>]+>')];
    for(let j=0;j<array1.length;j++){
     
      startOffset+=array1[j].toString().length+7;
    }
    

    console.log("highlight color restore");

    console.log(inner);
    console.log(text[0]+text[1]);
    var temp = startOffset;
    if(text[0]=='<' || text[1]=='<'){
      console.log("entered");
      while((inner[startOffset]!='<' && inner[startOffset]!='>') && startOffset>0){
    
        startOffset--;
      }
    }
   
    var x = temp-startOffset;
    if(inner[startOffset]=='>' && (text[0]=='<' || text[1]=='<') && temp>startOffset){
      while(inner[startOffset]!='<' && startOffset>0){
        startOffset--;
      }
      x=temp-startOffset-x;
  
      startOffset = temp;
      let tag2 = text.match("<[a-zA-Z]");
      
      let tag = tag2.toString();
      tag= tag.substring(1,tag.length);
      inner = inner.substring(0, startOffset) +"</"+tag+">"+"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span> "+inner.substring(text.length+startOffset-x-1,inner.length);
    }
    else{
      if(inner[startOffset-1]==text[0]) startOffset--;
      issue=0;
      for(let i=text.length+startOffset;i<inner.length-1;i++){
        if(inner[i]=='<' && inner[i+1]!='/') break;
        else if(inner[i]=='<' && inner[i+1]=='/'){
          issue=1;
          var tag2 = inner.substring(i,i+10).match("<[^<]+>").toString();
          console.log(tag2);
          var array = [...text.matchAll('<'+tag2.substring(2,tag2.length-1)+'[^>]+>')];
          console.log(array[array.length-1]);
        }
      }
      console.log(startOffset);
      console.log(inner.substring(0, startOffset));
      console.log(text);
      console.log(inner.substring(text.length+startOffset,inner.length));
      if(issue) inner = inner.substring(0, startOffset) +"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span>"+array[array.length-1]+inner.substring(text.length+startOffset-tag2.length,inner.length);
      else inner = inner.substring(0, startOffset) +"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span>"+inner.substring(text.length+startOffset,inner.length);
    }
    parent.innerHTML = inner;


}

    



    



chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});


chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

    var domInfo = [];
    const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
    highlights.forEach(h => {
      if(h.url==window.location.href) domInfo.push(h);
    });

   
   
    response(domInfo);
  }
});


// Implementing Keyborad Shortcuts by listening messsage from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggle_highlight") {
    highlightText("#FFDC74");
  } else if (request.action === "next_highlight") {
    goToNextHighlight();
  } else if (request.action === "previous_highlight") {
    goToPreviousHighlight();
  } else if (request.action === "clear_highlights") {
    deleteHighlight();
  }
});

function goToNextHighlight() {
  // Implement the logic to navigate to the next highlight
  let slides1 = Array.from(document.getElementsByClassName('highlight'));
  const slides2 = slides1.filter(d => d.style.backgroundColor!='transparent');
  for (let i = 0; i < slides2.length-1; i++) {
    if(slides2[i].classList.contains('active')){
      slides2[i+1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      slides2[i+1].click();
      break;
    }
    if(i==slides2.length-2){
      slides2[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      slides2[0].click();
    }
  }
}

function goToPreviousHighlight() {
  // Implement the logic to navigate to the previous highlight
  let slides1 = Array.from(document.getElementsByClassName('highlight'));
  const slides2 = slides1.filter(d => d.style.backgroundColor!='transparent');
  console.log("pehelel jo tha");
  let done = 0;
  for (let i = 1; i < slides2.length; i++) {
    if(slides2[i].classList.contains('active')){
      slides2[i-1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      slides2[i-1].click();
      done = 1;
      break;
    }
  }
  if(!done){

    slides2[slides2.length-1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    slides2[slides2.length-1].click();
  }
}

async function deleteHighlight() {
  // Implement the logic to clear all highlights
  const slides2 = document.getElementsByClassName('highlight');
  for (let i = 0; i < slides2.length; i++) {
    if(slides2[i].classList.contains('active')){
      but3=3;
      await slides2[i].click();
      break;
    }
  }
  
}
