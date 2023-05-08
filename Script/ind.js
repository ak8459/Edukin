const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main');

const searchInput = document.querySelector('.search input');
const userImage = document.querySelector('.user img');

const cards = document.querySelectorAll('.card');
const viewAllButton = document.querySelector('.last-appointments .btn');

const rows = document.querySelectorAll('.last-appointments table tr');
searchInput.addEventListener('input', (event) => {
    console.log(event.target.value);
});

userImage.addEventListener('click', () => {
    console.log('User image clicked');
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        console.log(card.querySelector('.card-name').textContent);
    });
});

viewAllButton.addEventListener('click', () => {
    console.log('"View All" button clicked');
});

rows.forEach(row => {
    row.addEventListener('click', () => {
        console.log(row.querySelector('td:first-child').textContent);
    });
});

// --------------------------------

// -------------------Fatching and displaying

const tbody = document.querySelector('table.appointments tbody');
const pageSize = 5;
let currentPage = 1;

function displayCourse(data) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const appointmentsToDisplay = data.slice(startIndex, endIndex);

    tbody.innerHTML = '';
    appointmentsToDisplay.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.subHeading}</td>
      <td>${item.category}</td>
      <td>${item.price}</td>
      <td>${item.ageGroup}</td>
      <td><i class="fas fa-edit" data-id="${item.id}"></i></td>
      <td><i class="fas fa-trash" data-id="${item.id}"></i></td>
    `;
        tbody.appendChild(tr);

        // ------edit part

        const editIcon = tr.querySelector('.fa-edit');
        const itemId = item.id;

        editIcon.addEventListener('click', event => {
            event.preventDefault();

            const itemData = data.find(item => item.id == itemId);

            IDs.value = itemData.id;
            titleInput.value = itemData.title;
            subHeadingInput.value = itemData.subHeading;
            categoryInput.value = itemData.category;
            priceInput.value = itemData.price;
            ageGroupInput.value = itemData.ageGroup;
        });
    });

    // delete part---
    const deleteIcons = document.querySelectorAll('.fa-trash');
    deleteIcons.forEach(deleteIcon => {
        deleteIcon.addEventListener('click', event => {
            event.preventDefault();

            const itemId = event.target.getAttribute('data-id');
            fetch(`https://mockerapi.onrender.com/user/${itemId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to delete course`);
                    }
                    return response.json();
                })
                .then(() => {
                    const index = data.findIndex(item => item.id == itemId);
                    data.splice(index, 1);
                    displayCourse(data);
                    location.reload();
                })
                .catch(error => {
                    console.error(error);
                });
        });
    });
}

let allData = [];
const fetchData = async () => {
    try {
        const response = await fetch('https://mockerapi.onrender.com/user');
        const data = await response.json();
        allData = data;
        displayCourse(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();


fetch('https://mockerapi.onrender.com/user')
    .then(response => response.json())
    .then(data => {
        displayCourse(data);

        const pageCount = Math.ceil(data.length / pageSize);
        const pagination = document.querySelector('.pagination');

        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.innerText = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.addEventListener('click', event => {
                event.preventDefault();
                currentPage = i;
                displayCourse(data);

                const activeLink = pagination.querySelector('.active');
                activeLink.classList.remove('active');
                pageLink.classList.add('active');
            });

            pagination.appendChild(pageLink);
        }
    })
    .catch(error => {
        console.error(error);
    });


// ------------Adding total courses-------------

const numberDiv = document.querySelector('.number');

fetch('https://mockerapi.onrender.com/user')
    .then(response => response.json())
    .then(data => {
        const totalCourses = data.length;
        numberDiv.innerText = totalCourses;
    })
    .catch(error => {
        console.error(error);
    });


// -----------------search------------------------
const searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredData = allData.filter(item => {
        return item.title.toLowerCase().includes(searchTerm);
    });

    displayCourse(filteredData);
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredData = allData.filter(item => {
        return item.title.toLowerCase().includes(searchTerm);
    });

    displayCourse(filteredData);
});

//   ------------ Update field-------------
let data = [];

const IDs = document.querySelector("#ids")
const titleInput = document.querySelector("#title");
const subHeadingInput = document.querySelector("#subHeading");
const categoryInput = document.querySelector("#category");
const priceInput = document.querySelector("#price");
const ageGroupInput = document.querySelector("#age_group");

const updateBtn = document.querySelector(".Update-btn");
updateBtn.addEventListener("click", (event) => {

    document.querySelector("#update-course-form").style.display = "block";
    document.querySelector(".container").style.display = "none";

    const itemId = IDs.value;
    const updatedCourse = {
        id: itemId,
        title: titleInput.value,
        subHeading: subHeadingInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        ageGroup: ageGroupInput.value,
    };
    fetch(`https://mockerapi.onrender.com/user/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCourse),
        })
        .then((response) => {
            console.log(response)
            if (!response.ok) {
                throw new Error("Failed to update Course.");
            }
            return response.json();
        })
        .then((updatedData) => {
            console.log("Course updated:", updatedData);
            const index = data.findIndex(item => item.id == itemId);
            data[index] = updatedData;
            displayCourse(data);
            location.reload();

        })
        .catch((error) => {
            console.error(error);
        });
});

// -----------------Add New Course---------------------

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.btn');
    const container = document.querySelector('.container');

    addButton.addEventListener('click', () => {
        document.querySelector(".doctor-visiting").style.display = "none";
        document.querySelector(".container").style.display = "block";
        const formHTML = `
        <div class="doctor-visiting">
          <div class="heading">
            <h2>Add New Course</h2>            
            <button class="submit-btn">Update</button>
          </div>
          <form>
            <div class="visiting">
              <label for="title">Title:</label>
              <input type="text" id="title1" name="title"><br><br>
  
              <label for="subHeading">SubHeading:</label>
              <input type="text" id="subHeading1" name="subHeading"><br><br>
  
              <label for="category">Category:</label>
              <input type="text" id="category1" name="category"><br><br>
  
              <label for="price">Price:</label>
              <input type="text" id="price1" name="price"><br><br>

              <label for="img">Image</label>
              <input type="text" id="img" name="img"><br><br>
  
              <label for="age_group">Age group:</label>
              <input type="text" id="age_group1" name="age_group"><br><br>
            </div>
          </form>
        </div>
      `;

        container.innerHTML = formHTML;
        const submitButton = document.querySelector('.submit-btn');
        submitButton.textContent = 'Update';

        submitButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.querySelector('#title1').value;
            const subHeading = document.querySelector('#subHeading1').value;
            const category = document.querySelector('#category1').value;
            const price = document.querySelector('#price1').value;
            const ageGroup = document.querySelector('#age_group1').value;
            const image = document.querySelector('#img').value;

            // console.log(title, subHeading, category, price, ageGroup, img);
            // console.log(img);

            const requestBody = {
                title,
                subHeading,
                category,
                price,
                ageGroup,
                image
            };

            const response = await fetch('https://mockerapi.onrender.com/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Added new course:', data);

                allData.push(data);
                displayCourse(allData);
                location.reload();

                submitButton.textContent = 'Update Course';
            } else {
                console.error('Failed to add new course:', response.status);
            }
        });

    })
});


//   hide the field----------------
const addNewCourseBtn = document.querySelector("#add-new-course-btn");

addNewCourseBtn.addEventListener("click", () => {
    document.querySelector(".doctor-visiting").style.display = "none";
    document.querySelector(".container").style.display = "block";
    addNewCourseBtn.textContent = "Update the Course";
});