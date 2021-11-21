import connection from './db.js'

let createRegistration = `create table if not exists registration(
    teacher_id int not null,
    student_id int not null,
    primary key(teacher_id, student_id)
)`;

connection.query(createRegistration).then((result) => console.log(result))

const Registration = function(registration) {
    this.teacher_id = registration.teacher_id;
    this.student_id = registration.student_id;
};

Registration.create = async (student_id, teacher_id) => {
    const sql = `INSERT IGNORE INTO registration (student_id, teacher_id) VALUES (${student_id}, ${teacher_id})`
    let res = await connection.query(sql)
    return res
}

Registration.getStudentsByTeachers = async (teachers) => {
    // let emails = ...emails
    const sql = `SELECT s.email as s_email, t.email as t_email from registration r
    JOIN student s
    ON s.id = r.student_id
    JOIN teacher t
    ON t.id = r.teacher_id
    WHERE t.email IN (${teachers})
    order by s.email;`
    // console.log(sql)
    let res = await connection.query(sql)
    // console.log(res)
    return res
}

Registration.getActiveStudentsByTeacher = async (teacher) => {
    const sql = `SELECT s.email as s_email, t.email as t_email from registration r
    JOIN student s
    ON s.id = r.student_id
    JOIN teacher t
    ON t.id = r.teacher_id
    WHERE t.email = "${teacher}"
    AND s.status != "suspended"
    order by s.email`
    let res = await connection.query(sql)
    return res
}

export default Registration