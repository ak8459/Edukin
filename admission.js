

let form = document.querySelector("form")

let formBtn =  document.getElementById("nextBtn")


formBtn.addEventListener("click" , function(e){
    e.preventDefault()
    let formData = JSON.parse(localStorage.getItem("form-data")) || [];
    
    let obj = {
        Name : form.name.value,
        email : form.email.value,
        DOB : form.Date.value,
        course : form.course.value
    }
  
    formData.push(obj)
    localStorage.setItem("form-data",JSON.stringify(formData))

    form.reset()

})