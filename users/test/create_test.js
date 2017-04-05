const assert = require("assert")
const User = require("../src/user")

describe("Creating records", () => {
  it("saves a user", (done) => {
    const joe = new User({ name: "Joe"})

    joe.save()
    .then(() => {
      //has this instance of User model been saved successfully?
      assert(!joe.isNew)
      done()
    })
  })
})
