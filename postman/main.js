//Utility function
function getElementFromString(string){
    const div = document.createElement('div');//<div></div>
    div.innerHTML= string;//<div>xyz</div>
    return div.firstElementChild
}


let addedParamCount=0;

// Hide the parameter box initally
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = "none"

// If the user clicks on params box, hide the json box
let paramRadio = document.getElementById('paramsradio');
paramRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parameterBox').style.display="block"
})

// If the user clicks on params box, hide the json box
let jsonRadio = document.getElementById('jsonradio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parameterBox').style.display="none"
    document.getElementById('params').style.display="none"
    document.getElementById('requestJsonBox').style.display = "block";
})

// if the user click on the add parameter button
let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params');
    let string = `
                        <div id="parameterBox">
                        <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterkey${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parametervalue${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} Value">
                        </div>
                        <button type="button" id="addParam" class="btn btn-primary deleteParam">-</button>
                        </div>
                    </div>`
  addedParamCount++;
//   console.log("before",string);
  let childElement = getElementFromString(string);
//   console.log('after', childElement)
  params.appendChild(childElement);

  let deleteParam = document.getElementsByClassName('deleteParam');
  
  for(item of deleteParam){
      item.addEventListener('click',(e)=>{
        // console.log(e.target)
        e.target.parentElement.remove()
      })
  }
})

//Submit Handler
document.getElementById("submit").addEventListener('click',()=>{
  const url = document.getElementById('urlField').value;
  const requestType = document.querySelector("input[name='requestType']:checked").value;
  const contentType = document.querySelector("input[name='contentType']:checked").value

  if(contentType == 'params'){
    data={}
// console.log('addedParam',addedParamCount)
    for(let i=1;i<=addedParamCount+1;i++){
      let key = document.getElementById(`parameterkey${i}`).value;
      let value = document.getElementById(`parametervalue${i}`).value;
      // console.log(key,value);
      data[key] = value
    }
    data = JSON.stringify(data)

  }else{
    data = document.getElementById("requestJsonText").value;
  }

  if(requestType === 'GET'){
  
    fetch(url,{
      method:"GET"
    })
      .then(res=> res.text())
      .then(data => {
        console.log(data)
        document.getElementById("responseJsonText").value=data
      })
  }
  if(requestType === 'POST'){
  
    fetch(url,{
      method:"POST",
      body:data,
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res=> res.text())
      .then(data => {
        console.log(data)
        document.getElementById("responseJsonText").value=data
      })
  }

  if(requestType === 'DELETE'){
  
    fetch(url,{
      method:"DELETE"
    })
      .then(res=> res.text())
      .then(data => {
        console.log(data)
        document.getElementById("responseJsonText").value=data
      })
  }

  if(requestType === 'PUT'){
  
    fetch(url,{
      method:"PUT",
      body:data,
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res=> res.text())
      .then(data => {
        console.log(data)
        document.getElementById("responseJsonText").value=data
      })
  }

})
