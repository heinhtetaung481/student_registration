import Registration from '../models/registration.model.js'
import Student from '../models/student.model.js'
import Teacher from '../models/teacher.model.js'

const registerStudent = async (req, res) => {
    // check teacher
    // if doesn't exist create teacher
    // if exists get id
    // loop students array
    // if student doesn't eixst create student
    // if exists get student_id
    // create registration
    // end loop
    let students = req.body.students
    let teacher_id = await Teacher.createIfNotExists(req.body.teacher)
    await Promise.all(students.map(async (student) => {
        const student_id = await Student.createIfNotExists(student)
        const registration = await Registration.create(student_id, teacher_id)
        console.log(registration)
    }));
    res.status(204).send()
}

const getCommonStudents = async (req, res) => {
    let teachers = Array.isArray(req.query.teacher) ? [...req.query.teacher] : [req.query.teacher]
    // add double quotes to prepare for sql query
    let sql_param = teachers.map(teacher => '"'+ teacher +'"')
    let results = await Registration.getStudentsByTeachers(sql_param)
    let tempStudent = ""
    let teachersGrouping  = []
    results.forEach(item => {
        if(tempStudent == item.s_email){
            teachersGrouping[item.s_email].push(item.t_email)
        }else{
            teachersGrouping[item.s_email] = []
            teachersGrouping[item.s_email].push(item.t_email)
        }
        tempStudent = item.s_email
    })
    let common_students = []
    for(var key in teachersGrouping){
        if(JSON.stringify(teachersGrouping[key].sort()) == JSON.stringify(teachers.sort())) common_students.push(key)
    }
    if(common_students.length != 0){
        res.status(200).json({"students": common_students})
    }else{
        res.status(404).json({"message": "There is no common students for given parameters"})
    }
}

const suspendStudent = async(req, res) => {
    let student = req.body.student ? req.body.student : res.status(400).json({'message': 'required parameter "student" not found'})
    let result = await Student.updateStatus(student)
    if (result.affectedRows == 0){
        res.status(404).json({'message': 'Student not found'})
    }else{
        res.status(204).json()
    }
}

const getNotificationRecipients = async (req, res) => {
    let teacher = req.body.teacher ? req.body.teacher : res.status(400).json({'message': 'required parameter "teacher" is missing!'})
    let notification = req.body.notification ? req.body.notification : res.status(400).json({'message': 'required parameter "notification" is missing!'})
    let active_students = await Registration.getActiveStudentsByTeacher(teacher)
    let mentioned_students = extractEmails(notification)
    let recipients = []
    await Promise.all(mentioned_students.map(async (student) => {
        let response = await Student.checkStatus(student)
        if(response.length !== 0 && response[0].status !== "suspended"){
            recipients.indexOf(student) === -1 && recipients.push(student)
        }
    }));
    active_students.map(student => recipients.indexOf(student.s_email) && recipients.push(student.s_email))
    
    if(recipients.length != 0){
        res.status(200).json({"recipients": recipients})
    }else{
        res.status(404).json({"message": "There is no recipients for given parameters"})
    }
}

const extractEmails = text => text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)

export {
    registerStudent,
    getCommonStudents,
    suspendStudent,
    getNotificationRecipients
}