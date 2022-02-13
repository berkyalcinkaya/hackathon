const presetCourses = [
    {
        title: 'NC Math I',
        subject: 'Mathematics',
        prereqs: []
    },
    {
        title: 'NC Math II',
        subject: 'Mathematics',
        prereqs: ['NC Math I']
    },
    {
        title: 'Honors English I',
        subject: 'English',
        prereqs: []
    }
]

//Create preset courses dropdown
const presetCoursesSelect = document.getElementById('presetCoursesSelect');
for (const course of presetCourses) {
    const opt = document.createElement('option');
    opt.value = course.title;
    opt.text = course.title;
    presetCoursesSelect.appendChild(opt);
}
