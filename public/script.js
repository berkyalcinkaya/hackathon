let years = {
    freshman: {
        div: null,
        courses: [],
        /*courses: [
            {
                name: 'NC Math I',
                GPA: 4
            }
        ]*/
    },
};

let globalCourseId = 0;

const yearsContainer = document.getElementById('yearsContainer');

function createYearDiv(name) {
    const yearDiv = document.createElement('div');
    yearDiv.classList.add('year');

    const title = document.createElement('h2');
    const titleText = document.createTextNode(name + ' Year');
    title.appendChild(titleText);

    yearDiv.appendChild(title);

    return yearDiv;
}

function createCourseDiv(courseObj) {
    courseObj.id = globalCourseId++;
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course');

    //Course title
    const title = document.createElement('h2');
    title.appendChild(document.createTextNode(courseObj.title));
    courseDiv.appendChild(title);

    //Remove button
    const removeButton = document.createElement('button');
    removeButton.appendChild(document.createTextNode('Remove'));
    removeButton.onclick = () => removeCourse(courseObj.id);
    courseDiv.appendChild(removeButton);

    return courseDiv;
}

function addCourse(year, courseObj) {
    const courseDiv = createCourseDiv(courseObj);
    years[year].div.appendChild(courseDiv);
    years[year].courses.push({
        ...courseObj,
        div: courseDiv,
    });
}

function removeCourse(id) {
    for (const yearName in years) {
        const year = years[yearName];
        for (let i = 0; i < year.courses.length; i++) {
            if (year.courses[i].id == id) {
                year.courses[i].div.remove(); //Remove from DOM
                year.courses.splice(i, 1); //Remove it from the array
            }
        }
    }
}

function openCustomCourseDialog() {
    document.getElementById('customCourseDialog').style.display = 'block';
}
function closeCustomCourseDialog() {
    document.getElementById('customCourseDialog').style.display = 'none';
}

// If the user clicks off the modal
window.onclick = event => {
    if (event.target == document.getElementById('customCourseDialog')) {
        document.getElementById('customCourseDialog').style.display = 'none';
    }
};

function addNewCustomCourse() {}

years.freshman.div = createYearDiv('Freshman');
//years.freshman.div.appendChild(createCourseDiv('asdf'));

yearsContainer.appendChild(years.freshman.div);

addCourse('freshman', { title: 'NC Math I' });
