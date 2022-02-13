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
        title: 'NC Math III',
        subject: 'Mathematics',
        prereqs: ['NC Math II']
    },
    {
        title: 'Pre-Calculus',
        subject: 'Mathematics',
        prereqs: ['NC Math III']
    },
    {
        title: 'NC Math IV',
        subject: 'Mathematics',
        prereqs: ['NC Math III']
    },
    {
        title: 'AP Calculus AB',
        subject: 'Mathematics',
        prereqs: ['Pre-Calculus']
    },
    {
        title: 'Ap Calculus BC',
        subject: 'Mathematics',
        prereqs: ['Pre-Calculus']
    },
    {
        title: 'AP Statistics',
        subject: 'Mathematics',
        prereqs: ['NC Math III']
    },
    {
        title: 'English I',
        subject: 'English',
        prereqs: []
    },
    {
        title: 'English II',
        subject: 'English',
        prereqs: ['Honors English I', 'English I']
    },
    {
        title: 'English III',
        subject: 'English',
        prereqs: ['Honors English II', 'English II']
    },
    {
        title: 'AP Language and Composition',
        subject: 'English',
        prereqs: ['Honors English II']
    },
    {
        title: 'English IV',
        subject: 'English',
        prereqs: ['Honors English III', 'English III']
    },
    {
        title: 'AP Literature and COmposition',
        subject: 'English',
        prereqs: ['Honors English III']
    },
    {
        title: 'Biology',
        subject: 'Biology',
        prereqs: []
    },
    {
        title: 'Physics',
        subject: 'Physics',
        prereqs: []
    },
    {
        title: 'Environmental Science',
        subject: 'Environmental Science',
        prereqs: []
    },
    {
        title: 'Chemistry',
        subject: 'Chemistry',
        prereqs: ['Biology', 'NC Math II']
    },
    {
        title: 'Physics C: Electricity and Magnetism',
        subject: 'Physics',
        prereqs: []
    },
    {
        title: 'Physics 1: Algebra-Based',
        subject: 'Physics',
        prereqs: ['NC Math III']
    },
    {
        title: 'Physics C: Mechanics',
        subject: 'Physics',
        prereqs: []
    },
    {
        title: 'Psychology',
        subject: 'Social Science',
        prereqs: []
    },
    {
        title: 'American History',
        subject: 'Humanities',
        prereqs: []
    },
    {
        title: 'American History I',
        subject: 'Humanities',
        prereqs: []
    },
    {
        title: 'American History II',
        subject: 'Humanities',
        prereqs: ['American History I']
    },
    {
        title: 'American History: Founding Principles, Civics and Economics',
        subject: 'Humanities',
        prereqs: []
    },
    {
        title: 'AP Human Geography',
        subject: 'Humanities',
        prereqs: []
    },
    {
        title: 'AP United States Government and Politics',
        subject: 'Humanities',
        prereqs: []
    },
    {
        title: 'AP United States History',
        subject: 'Humanities',
        prereqs: []
    },
    {
        title: 'World History',
        subject: 'Humanities',
        prereqs: []
    },
    {
        title: 'Economics and Personal Finance',
        subject: 'Social Science',
        prereqs: []
    },
    {
        title: 'Founding Principles of the Unites States of America and North Carolina: Civic Literacy',
        subject: 'Humanities',
        prereqs: []
    },
]


//Create preset courses dropdown
const presetCoursesSelect = document.getElementById('presetCoursesSelect');
for (const course of presetCourses) {
    const opt = document.createElement('option');
    opt.value = course.title;
    opt.text = course.title;
    presetCoursesSelect.appendChild(opt);
}