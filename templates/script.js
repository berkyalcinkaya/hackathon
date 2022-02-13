/*
TODO
Major recommendation button
 - Rate each course on how much you liked it
*/
let years = {
    freshman: {
        div: null,
        courses: [],
    },
    sophomore: {
        div: null,
        courses: [],
    },
    junior: {
        div: null,
        courses: [],
    },
    senior: {
        div: null,
        courses: [],
    },
};

let globalCourseId = 0;

//How many extra points are given. So a 4.5 course with a B would give 3.5 gpa
const gpaNums = {
    'A+': 4.3 - 4.0,
    'A' : 4.0 - 4.0,
    'A-': 3.7 - 4.0,
    'B+': 3.3 - 4.0,
    'B' : 3.0 - 4.0,
    'B-': 2.7 - 4.0,
    'C+': 2.3 - 4.0,
    'C' : 2.0 - 4.0,
    'C-': 1.7 - 4.0,
    'D+': 1.3 - 4.0,
    'D' : 1.0 - 4.0,
    'D-': 0.7 - 4.0,
    'F' : 0.0 - 4.0,
};

const yearsContainer = document.getElementById('yearsContainer');

function createYearDiv(name) {
    const yearDiv = document.createElement('div');
    yearDiv.classList.add('year');

    const title = document.createElement('h2');
    const titleText = document.createTextNode(name + ' Year');
    title.appendChild(titleText);

    const courseList = document.createElement('div');
    courseList.classList.add('courseList');

    yearDiv.appendChild(title);
    yearDiv.appendChild(courseList);

    return yearDiv;
}

function createCourseDiv(courseObj) {
    courseObj.id = globalCourseId++;
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course');
    courseDiv.classList.add('card');
    courseDiv.classList.add('flex-row-reverse');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    //Remove button
    const removeButton = document.createElement('span');
    removeButton.innerHTML = '&times;';
    removeButton.classList.add('closeButton');
    removeButton.onclick = () => removeCourse(courseObj.id);
    courseDiv.appendChild(removeButton);

    //Course title
    const title = document.createElement('h2');
    title.appendChild(document.createTextNode(courseObj.title));
    cardBody.appendChild(title);

    //Subject
    const subject = document.createElement('p');
    subject.appendChild(document.createTextNode('Subject: ' + courseObj.subject));
    cardBody.appendChild(subject);

    //Your grade input
    const gradeLabel = document.createElement('label');
    gradeLabel.appendChild(document.createTextNode('Grade: '));
    const grade = document.createElement('select');
    for (const letter in gpaNums) {
        const opt = document.createElement('option');
        opt.value = letter;
        opt.text = letter;
        if (opt.text == 'A') opt.selected = true;
        grade.appendChild(opt);
    }
    grade.onchange = evnt => {
        setGrade(courseObj.id, evnt.target.value);
    }
    courseObj.grade = 'A';

    //GPA
    const gpa = document.createElement('p');
    gpa.classList.add('gpaDisplay');
    gpa.appendChild(document.createTextNode('Quality Points: ' + (courseObj.gpa + gpaNums[courseObj.grade]) + '/' + courseObj.gpa));
    cardBody.appendChild(gpa);

    cardBody.appendChild(gradeLabel);
    cardBody.appendChild(grade);

    courseDiv.appendChild(cardBody);

    return courseDiv;
}

function addCourse(year, courseObj) {
    const courseDiv = createCourseDiv(courseObj);
    years[year].div.getElementsByClassName('courseList')[0].appendChild(courseDiv);
    years[year].courses.push({
        ...courseObj,
        div: courseDiv,
    });
    updateGPACalc();
    updateGradReq();
    updatePrereqs();
}

function setGrade(id, grade) {
    for (const yearName in years) {
        const year = years[yearName];
        for (let i = 0; i < year.courses.length; i++) {
            if (year.courses[i].id == id) {
                year.courses[i].grade = grade;
                const gpaText = 'Quality Points: ' + (year.courses[i].gpa + gpaNums[year.courses[i].grade]) + '/' + year.courses[i].gpa
                year.courses[i].div.getElementsByClassName('gpaDisplay')[0].innerText = gpaText;
                break;
            }
        }
    }

    updateGPACalc();
}

function removeCourse(id) {
    for (const yearName in years) {
        const year = years[yearName];
        for (let i = 0; i < year.courses.length; i++) {
            if (year.courses[i].id == id) {
                year.courses[i].div.remove(); //Remove from DOM
                year.courses.splice(i, 1); //Remove it from the array
                break;
            }
        }
    }
    updateGPACalc();
    updateGradReq();
    updatePrereqs();
}

function openCustomCourseDialog() {
    document.getElementById('customCourseDialog').style.display = 'block';
}
function closeCustomCourseDialog() {
    document.getElementById('customCourseDialog').style.display = 'none';
}
function openPresetCourseDialog() {
    document.getElementById('presetCourseDialog').style.display = 'block';
}
function closePresetCourseDialog() {
    document.getElementById('presetCourseDialog').style.display = 'none';
}

// If the user clicks off the modal
window.onclick = event => {
    if (event.target == document.getElementById('customCourseDialog')) {
        document.getElementById('customCourseDialog').style.display = 'none';
    }
    if (event.target == document.getElementById('presetCourseDialog')) {
        document.getElementById('presetCourseDialog').style.display = 'none';
    }
};

function addNewCustomCourse() {
    const year = document.getElementById('customCourseYear').value;
    const title = document.getElementById('customCourseTitle').value;
    const gpa = parseFloat(document.getElementById('customCourseGPA').value);
    const subject = document.getElementById('customCourseSubject').value

    if (year == '' || title == '' || gpa == '' || subject == '') {
        alert('Please select all options');
        return;
    }

    addCourse(year, {
        title,
        gpa,
        subject
    });
    document.getElementById('customCourseYear').value = '';
    document.getElementById('customCourseTitle').value = '';
    document.getElementById('customCourseGPA').value = '';
    document.getElementById('customCourseSubject').value = '';
    closeCustomCourseDialog();
}

function addNewPresetCourse() {
    const title = document.getElementById('presetCoursesSelect').value;
    const year = document.getElementById('presetCourseYear').value;
    const gpa = parseFloat(document.getElementById('presetCourseGPA').value);
    let courseObj = presetCourses.filter(c => c.title == title);
    if (courseObj.length == 0 || year == '' || gpa == '') {
        alert('Please select all options');
        return;
    }

    addCourse(year, {
        ...courseObj[0],
        gpa
    });
    document.getElementById('presetCourseYear').value = '';
    document.getElementById('presetCoursesSelect').value = '';
    document.getElementById('presetCourseGPA').value = '';
    closePresetCourseDialog();
}

function updateGPACalc() {
    let sum = 0;
    let amount = 0;
    for (const yearName in years) {
        for (const course of years[yearName].courses) {
            sum += course.gpa + gpaNums[course.grade];
            amount++;
        }
    }
    const gpa = (Math.round(1e6*sum / amount) / 1e6).toFixed(2); //Make percent with 3 dec
    document.getElementById('gpa').innerText = 'GPA: ' + gpa;
}

function updateGradReq() {
    let reqs = {
        'Mathematics': 3,
        'English': 4,
        'Humanities': 2,
    }
    let totals = {};
    for (const yearName in years) {
        for (const course of years[yearName].courses) {
            if (totals.hasOwnProperty(course.subject))
                totals[course.subject]++;
            else
                totals[course.subject] = 1;
        }
    }

    const ul = document.getElementById('gradReq');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (const req in reqs) {
        const numMissing = Math.max(0, reqs[req] - (totals.hasOwnProperty(req) ? totals[req] : 0));
        const li = document.createElement('li');
        li.appendChild(document.createTextNode('Need ' + numMissing + ' more ' + req + ' classes'));
        ul.appendChild(li);
    }
}

function updatePrereqs() {
    const currentlyTaking = new Map();
    let yearNum = 0;
    for (const yearName in years) {
        for (const course of years[yearName].courses) {
            currentlyTaking.set(course.title, yearNum);
        }
        yearNum++;
    }

    yearNum = 0;
    for (const yearName in years) {
        for (const course of years[yearName].courses) {
            if (!course.hasOwnProperty('prereqs')) continue;

            let isGood = true;
            for (const prereq of course.prereqs) {
                if (!currentlyTaking.has(prereq) ||
                    currentlyTaking.get(prereq) > yearNum) {
                    isGood = false;
                }
            }

            if (isGood) {
                course.div.style = "";
            } else {
                //course.div.classList.add('missingPrereq');
                course.div.style = "border: 1px solid red";
            }
        }
        yearNum++;
    }
}

years.freshman.div = createYearDiv('Freshman');
years.sophomore.div = createYearDiv('Sophomore');
years.junior.div = createYearDiv('Junior');
years.senior.div = createYearDiv('Senior');

yearsContainer.appendChild(years.freshman.div);
yearsContainer.appendChild(years.sophomore.div);
yearsContainer.appendChild(years.junior.div);
yearsContainer.appendChild(years.senior.div);

updateGradReq();