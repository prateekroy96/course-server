const router = require('express').Router()
const db = require('./db')

// GET REQUESTS
router.get('/user', (req, res) => {
    //console.log('router get user')

    db.Users.findAll({
        include: [{
            model: db.Courses,
            as: 'courses',
            required: false,
            attributes: ['id', 'name_of_course'],
            through: {
                model: db.Allotment,
                as: 'allotment',
                attributes: [],
            }
        }]
    }).then((users) => {
        //console.log(users)
        res.send(users)
    })
        .catch(err => {
            res.send({ success: false, msg: err })
        })
})

router.get('/course', (req, res) => {
    //console.log('router get course')

    db.Courses.findAll({
        include: [{
            model: db.Users,
            as: 'users',
            required: false,
            attributes: ['id', 'name_of_person'],
            through: {
                model: db.Allotment,
                as: 'allotment',
                attributes: [],
            }
        }]
    }).then((courses) => res.send(courses))
        .catch(err => {
            res.send({ success: false, msg: err })
        })
})


// ADD REQUESTS
router.post('/user', (req, res) => {
    //console.log('router post user', req.body)
    db.addUser(req.body)
        .then(user => {
            console.log("Success! Auto-generated ID:", user.id);
            res.send({ success: true, msg: "User successfully registered" })
        })
        .catch(err => {
            res.send({ success: false, msg: err })
        })
})

router.post('/course', (req, res) => {
    //console.log('router post course')
    db.addCourse(req.body)
        .then(course => {
            console.log("Success! Auto-generated ID:", course.id);
            res.send({ success: true, msg: "Course successfully registered" })
        })
        .catch(err => {
            res.send({ success: false, msg: err })
        })
})

router.post('/allot', (req, res) => {
    //console.log('router post allot', req.body)
    for (let data of req.body) {
        db.allot(data)
            .then(allot => {
                console.log("Success! Auto-generated ID:", allot.id);
                res.send({ success: true, msg: "Course successfully alloted" })
            })
            .catch(err => {
                res.send({ success: false, msg: err })
            })
    }


})

// DELETE REQUESTS

router.post('/d/user', (req, res) => {
    //console.log('delete user')

    db.Allotment.destroy({
        where: { userId: req.body.id }
    })
        .then((data) => {
            db.Users.destroy({
                where: { id: req.body.id }
            })
        })
        .then((name) => {
            res.send({ success: true, msg: "User succesfully deleted" })
        })
        .catch(err => {
            res.send({ success: false, msg: err })
        })
})

router.post('/d/course', (req, res) => {
    //console.log('delete course')

    db.Allotment.destroy({
        where: { courseId: req.body.id }
    })
        .then((data) => {
            db.Courses.destroy({
                where: { id: req.body.id }
            })
        })
        .then((name) => {
            res.send({ success: true, msg: "User succesfully deleted" })
        })
        .catch(err => {
            res.send({ success: false, msg: err })
        })

})

router.post('/d/allot', (req, res) => {
    //console.log('delete association')

    db.Allotment.destroy({
        where: { userId: req.body.userId, courseId: req.body.courseId }
    })
        .then((name) => {
            if (name) {
                res.send({ success: true, msg: "Association succesfully deleted" })
            }
            else {
                res.send({ success: false, msg: "Association does not exist" })
            }

        })
        .catch(err => {
            res.send({ success: false, msg: err })
        })

})

// DEFAULT
router.use('/', (req, res) => {
    res.sendStatus(200)
})

exports = module.exports = router