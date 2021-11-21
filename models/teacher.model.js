import connection from './db.js'

let createTeacher = `create table if not exists teacher(
    id int primary key auto_increment,
    name varchar(255),
    email varchar(255) not null
)`;

connection.query(createTeacher).then(result => console.log(result))

const Teacher = function(teacher){
    this.name = teacher.name,
    this.email = teacher.email
}

Teacher.createIfNotExists = async (email) => {
    let search_sql = `SELECT * FROM teacher WHERE email = "${email}"`
    let insert_sql = `INSERT INTO teacher (email) VALUES("${email}")`
    let res = await connection.query(search_sql)
    if(res && res.length !== 0){
        return res[0].id
    }else{
        res = await connection.query(insert_sql)
        return res.insertId
    }
}

export default Teacher
