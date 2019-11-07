const db = require('./db')

let userObject = {
    name_of_person: "GHI",
    contact_number: "9876543210",
    name_of_college: "IIT Kanpur",
    graduation_year: 2018,
}

let courseObject = {
    name_of_course: "CHM101",
    course_duration: 4,
    course_fee: 5000,
    start_date: new Date("1 Jan 2020")
}

let allotObject = {
    userId: 3,
    courseId: 3
}

//db.addUser(userObject).then((data) => console.log("success, id:" + data.id))

//db.addCourse(courseObject).then((data) => console.log("success, id:" + data.id))

//db.allot(allotObject).then((data) => console.log("success, id:" + data.id))

/*
db.Users.findAll({
    // Make sure to include the products
    include: [{
      model: db.Courses,
      as: 'courses',
      required: false,
      // Pass in the Product attributes that you want to retrieve
      attributes: ['id', 'name_of_course'],
      through: {
        // This block of code allows you to retrieve the properties of the join table
        model: db.Allotment,
        as: 'allotment',
        attributes: [],
      }
    }]
  }).then(data=>console.log(data[0].courses[0].name_of_course))
*/