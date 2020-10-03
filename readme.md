![REST API Setup Nodejs MongoDB](https://dev-to-uploads.s3.amazonaws.com/i/zxvx4pk4tdlqyk1x2a4c.png)

[![Maintainability](https://api.codeclimate.com/v1/badges/25d8ccce7230ad5eb5c3/maintainability)](https://codeclimate.com/github/sunilksamanta/node-mongoose-setup/maintainability)

## Installation

Setup is super easy. Clone the repository - 

```shell script
git clone https://github.com/sunilksamanta/node-mongoose-setup
cd node-mongoose-setup
npm install
```

Create an ``.env`` file at the root of your project with the following

```dotenv
MONGO_URL=YOUR_MONGO_URL
DB_NAME=YOUR_DATABASE_NAME
PORT=5000[YOUR_DESIRED_PORT]
NODE_ENV=YOUR_APP_ENVIRONMENT[production/development]
```

Your project is ready. Now start the project.

```shell script
npm start
```

Go to ``http://localhost:5000``. You should see a default welcome page.

Your API base path is ``http://localhost:5000/api``.

First create some accounts to get started with the authentication.

## Authentication

JWT authentication is added in this project. User model is defined in models/User.js. 
For Register, Login, Logout use these urls —
```
    [POST] api/auth/register
    [POST] api/auth/login
    [GET] api/auth/logout
```

## Features

1. **Controller, Model & Service oriented architecture**

1. **Auth with JWT & Db Store**

1. **User Module**

1. **Post Module** (Sample CRUD)

1. **Media Upload**

1. **Centralized Http Response**

1. **Error Handler**

1. **.env support**

1. **Multi Environment config setup**

1. **Autobind Methods**

## Directory Structure of the Project
```
├─ .env
├─ .gitignore
├─ config
│  ├─ config.js
│  ├─ database.js
│  ├─ routes.js
│  └─ server.js
├─ index.js
├─ package.json
└─ src
  ├─ controllers
  │  ├─ AuthController.js
  │  ├─ Controller.js
  │  ├─ MediaController.js
  │  └─ PostController.js
  ├─ helpers
  │  ├─ HttpError.js
  │  ├─ HttpResponse.js
  │  └─ Utility.js
  ├─ models
  │  ├─ Auth.js
  │  ├─ Media.js
  │  ├─ Post.js
  │  └─ User.js
  ├─ routes
  │  ├─ auth.js
  │  ├─ index.js
  │  ├─ media.js
  │  └─ post.js
  └─ services
     ├─ AuthService.js
     ├─ MediaService.js
     ├─ PostService.js
     ├─ Service.js
     └─ UserService.js
```
## Lets talk about the structure

We have 2 base classes — One for Controller and another for Service.

1. **[Controller.js](src/controllers/Controller.js)** 

This base controller have the basic CRUD operations. To create a new controller just extend this base Controller class.

2. **[Service.js](src/services/Service.js)**
 
This is the base Service class which includes the database operations. If you want to change the default behaviour of the services you can update this file.


## How to Create new CRUD Module?

If you want to create a new Module say Post. Then you’ll have to create 4 basic files. One Controller, one Service, one Model and one route file. And add the new route in routes/index.js with desired url.
There is a “Post” CRUD module included in this project for example.
```   
    controllers/PostController.js
    models/Post.js
    services/PostService.js
    routes/post.js
```
## Overriding Base class method

As an example if you see in the media Controller — the default delete method is overriden by its own class method as we have to delete the file from the file system also. So the overriden method is like bellow —
```js
async delete(req, res, next) {
  const { id } = req.params;
  try {
      const response = await this.service.delete(id);
      // File Unlinking..
      if (response.data.path) {
          console.log("unlink item", response.data.path);
          fs.unlink(response.data.path, function (err) {
              if (err) {
                  console.log("error deleting file");
                  throw err;
              }
              console.log("File deleted!");
          });
      }
      return res.status(response.statusCode).json(response);
  }
  catch (e) {
      next(e);
  }
}
```

## Have questions or suggestions?
You can reply to this article [REST API Structure using NodeJS MongoDB (Mongoose)](https://medium.com/@sunilksamanta/rest-api-architecture-using-nodejs-mongodb-mongoose-64f9021c906f)

## Want to contribute?

If you have any suggestion, feedback or you want to make this project more powerful — feel free to report issues or request a feature or suggest some changes.

Read the [Contributing guideline](contributing.md).

## License

This project is licensed under the terms of the [MIT](https://choosealicense.com/licenses/mit/) license.


## Credit

Special thanks to [@thisk8brd](https://github.com/thisk8brd/node-starter) for the concept of this API Structure.
