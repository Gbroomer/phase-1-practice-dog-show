document.addEventListener('DOMContentLoaded', () => {
    // Grab Elements from HTML for Submission
    const inputForm = document.getElementById("dog-form");
    const inputName = document.getElementsByTagName("input")[0];
    const inputBreed = document.getElementsByTagName("input")[1];
    const inputSex = document.getElementsByTagName("input")[2];
    const tBody = document.getElementById("table-body");
  
    const updateDog = (id, updatedDoggie) => {
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDoggie)
      })
        .then(res => res.json())
        .then(updatedDog => {
          tBody.innerHTML = "";
          populateDogs();
        });
    };
  
    const populateDogs = () => {
      fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(data => {
          data.forEach(dog => {
            // Create Rows and Columns for each Dog in the DB
            const trName = document.createElement("tr");
  
            const nameTd = document.createElement("td");
            nameTd.textContent = dog.name;
  
            const breedTd = document.createElement("td");
            breedTd.textContent = dog.breed;
  
            const sexTd = document.createElement("td");
            sexTd.textContent = dog.sex;
  
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit Dog";
            editBtn.addEventListener("click", () => {
              const dogId = dog.id;
              const dogHandler = (e) => {
                e.preventDefault();
                const dogRename = inputName.value;
                const dogRebreed = inputBreed.value;
                const dogResex = inputSex.value;
                const updatedDoggie = {
                name: dogRename,
                breed: dogRebreed,
                sex: dogResex
              };
              updateDog(dogId, updatedDoggie);

              //clear Event Listener after Submission
              inputForm.removeEventListener("submit", dogHandler)
              };
              
  
              inputForm.addEventListener("submit", dogHandler)
            });

  
            trName.append(nameTd, breedTd, sexTd, editBtn);
            tBody.appendChild(trName);
          });
        });
    };
  
    populateDogs();
  });
                        