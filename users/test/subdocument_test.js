const assert = require("assert")
const User = require("../src/user")

describe("Subdocuments", () => {

  it("can create a subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle"}]
    })

    joe.save()
      .then(() => User.findOne({ name: "Joe"}))
      .then((user) => {
        assert(user.posts[0].title === "PostTitle")
        done()
      })
  })

  it("can add subdocuments to an existing record", (done) => {
    const joe = new User({
      name: "Joe",
      posts: []
    })
    joe.save() //save joe
      .then(() => User.findOne({ name: "Joe"})) //fetch jose
      .then((user) => {
        user.posts.push({ title: "New Post"}) //common js operation
        return user.save() //persist to database. must return to make promise because => {}
      })
      .then(() => User.findOne({ name: "Joe"})) //fetch joe again
      .then((user) => {
        assert(user.posts[0].title === "New Post")
        done()
      })
  })

})
