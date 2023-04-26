const db = require('./db.js')


// userdetails = {
//   "karishmap29@gmail.com": { email: "karishmap29@gmail.com", name: "Karishma", password: "abc123", task: [{ title: "Things to buy", content: ["sugar", "lemon", "honey"] }, { title: "To study", content: ["Angular", "ReactJS"] }, { title: "my fav", content: ["task"] }] },
//   "abc@gmail.com": { email: "abc@gmail.com", name: "abc", password: "abc123", task: [] }
// }



signup = (mail, psw, nam) => {
  // if (mail in userdetails) {
  return db.User.findOne({ email: mail }).then(user => {
    if (user) {
      return {
        status: false,
        message: 'user already present',
        statusCode: 401
      }
    }
    else {
      const newuser = new db.User({
        email: mail,
        name: nam,
        password: psw,
        task: []

      })

      newuser.save()

      return {
        status: true,
        message: 'Register success',
        statusCode: 200
      }
    }

  })


}



login = (email, psw) => {

  // if (email in userdetails) {
  return db.User.findOne({ email, password: psw }).then(user => {
    if (user) {
      currentUsername = user.name
      currentemail = email
      return {
        status: true,
        message: 'Login success',
        statusCode: 200,
        currentUsername,
        currentemail
      }
    }
    else {
      return {
        status: false,
        message: 'Incorrect password or email ID!',
        statusCode: 401
      }
    }
  })


}




addtask = (currentemail, task) => {
  return db.User.findOne({ email: currentemail }).then(user => {
    if (user) {
      newtitle = task["title"]
      newcontent = task["content"]
      user.task.push({ title: newtitle, content: newcontent })
      user.save()
      return {
        status: true,
        message: 'task added successfully!',
        statusCode: 200,
        user

      }
    }
  })
}

taskdata = (email) => {
  return db.User.findOne({ email }).then(user => {
    if (user) {
      tasks = user.task
      return {
        status: true,
        message: "task data is successfully retrieved",
        statusCode: 200,
        tasks
      }
    }
  })

}

edittask = (email, id, task) => {
  return db.User.findOne({ email }).then(user => {
    if (user) {
      user.task[id] = task
      user.save()
      return {
        status: true,
        message: 'task Updated',
        statusCode: 200,
        user
      }
    }
  })

}

deletetask = (email, id) => {
  return db.User.findOne({ email }).then(user => {
    if (user) {
      tasks = user.task
      tasks.splice(id, 1)
      db.User.updateOne({ email }, { "$set": { "task": tasks } })
      user.save()
      return {
        status: true,
        message: 'task deleted',
        statusCode: 200,
        tasks
      }
    } else {
      return {
        status: false,
        message: 'not found!',
        statusCode: 401
      }
    }

  })
}



module.exports = {
  signup,
  login,
  addtask,
  taskdata,
  edittask,
  deletetask
}
