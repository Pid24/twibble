class User {
  constructor() {
    this._users = null;
  }

  getUsers() {
    if (this._users === null) {
      try {
        const storedUsers = localStorage.getItem("users");
        this._users = storedUsers ? JSON.parse(storedUsers) : [];
      } catch (error) {
        return (this._users = []);
      }
    }
    return this._users;
  }

  saveUser(userData) {
    const { name, username, avatar, password } = userData;

    if (typeof name !== "string" || name.trim() === "") {
      return {
        success: false,
        error: "name is missing",
      };
    }

    if (typeof username !== "string" || username.trim() === "") {
      return {
        success: false,
        error: "username is missing",
      };
    }

    if (typeof avatar !== "string" || avatar.trim() === "") {
      return {
        success: false,
        error: "avatar is missing",
      };
    }

    if (typeof password !== "string" || password.trim() === "") {
      return {
        success: false,
        error: "password is missing",
      };
    }

    const newUser = {
      id: Date.now(),
      isActive: true,
      ...userData,
    };

    const users = this.getUsers();
    users.push(newUser);
  }

  userSignIn() {}
}
