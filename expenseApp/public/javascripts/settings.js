const impFile = document.getElementById("impFile");
const btnUpload = document.getElementById("btnUpload");

btnUpload.addEventListener("click", function () {
  const formData = new FormData(); //js object that holds form data for later submission to server
  //console.log(impFile.files); //files property is an array that contains all files selected by user
  for (const file of impFile.files) {
    formData.append("myFiles", file); //sends key and value pair to server, i.e. it's the same as adding the name attrib to a form, can choose labels freely
  }
  for (const [key, value] of formData) {
    console.log("Key:", key);
    console.log("Value:", value);
  }

  fetch("http://localhost:3000/settings", {
    method: "post",
    body: formData,
  }).catch((err) => {
    console.log(err);
  });
});
