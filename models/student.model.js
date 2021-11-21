import connection from './db.js'

let createStudent = `create table if not exists student(
    id int primary key auto_increment,
    name varchar(255),
    email varchar(255) not null,
    status varchar(255) not null default "approved"
)`;

connection.query(createStudent).then(result => console.log(result))

const Student = function(student){
    this.name = student.name,
    this.email = student.email,
    this.status = student.status
}

Student.createIfNotExists = async (email) => {
    let search_sql = `SELECT * FROM student WHERE email = "${email}"`
    let insert_sql = `INSERT INTO student (email) VALUES("${email}")`
    let res = await connection.query(search_sql)
    if(res && res.length !== 0){
        return res[0].id
    }else{
        res = await connection.query(insert_sql)
        return res.insertId
    }
}

Student.updateStatus = async(email) => {
    let sql = `UPDATE student SET status = ? WHERE email = "${email}"`
    let res = await connection.query(sql, ["suspended"])
    return res
}

Student.checkStatus = async(email) => {
    let sql = `SELECT status from student WHERE email = "${email}"`
    let res = await connection.query(sql)
    return res
}

export default Student