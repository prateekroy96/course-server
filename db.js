const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Users = db.define('users', {
    name_of_person: {
        type: Sequelize.STRING,
        allowNull: false,
        //validate: { isAlpha: true }
        unique: true
    },
    contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isNumeric: true }
    },
    name_of_college: {
        type: Sequelize.STRING,
        allowNull: false,
        //validate: { isAlpha: true }
    },
    graduation_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { min: 1950, max: 2020 }
    }
})

const Courses = db.define('courses', {
    name_of_course: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    course_duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { min: 0, max: 24 }
    },
    course_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { min: 0, max: 50000 }
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})

const Allotment = db.define('allotment', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id'
        }
    }
});


Users.belongsToMany(Courses, {
    through: 'allotment',
    as: 'courses',
    foreignKey: 'userId',
    otherKey: 'courseId'
});

Courses.belongsToMany(Users, {
    through: 'allotment',
    as: 'users',
    foreignKey: 'courseId',
    otherKey: 'userId'
});


let addUser = function (data) {
    return Users.create({
        name_of_person: data.name_of_person,
        contact_number: data.contact_number,
        name_of_college: data.name_of_college,
        graduation_year: data.graduation_year
    })
}

let addCourse = function (data) {
    return Courses.create({
        name_of_course: data.name_of_course,
        course_duration: data.course_duration,
        course_fee: data.course_fee,
        start_date: data.start_date
    })
}

let allot = function (data) {
    return Allotment.create({
        userId: data.userId,
        courseId: data.courseId
    })
}

db.sync().then(() => console.log("Database is ready")).catch((err) => console.log("Can't connect to database",err))

exports = module.exports = {
    db,
    Users,
    Courses,
    Allotment,
    addUser,
    addCourse,
    allot
}