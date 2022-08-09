"use strict";

// ES6 class User
class User {
  constructor(
    firstName,
    lastName,
    userName,
    passWord,
    category = "sport",
    pageSize = 5
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;

    this.category = category;
    this.pageSize = pageSize;
  }
}

// Class todolist
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
