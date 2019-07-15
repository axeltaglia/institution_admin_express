#Tutorial

####Crear carpeta del proyecto

```$xslt
mkdir institution_admin_express
cd institution_admin_express
```

#### Nmp Init
```$xslt
npm init
```
Archivo principal -> `server.js`

#### Git Init
```$xslt
$ echo "# Hello, portapi!" >> README.md
$ git init
$ git add README.md
$ git commit -m "first commit"
$ git remote add origin https://github.com/<YOUR_GITHUB_NAME>/portapi.git
$ git push -u origin master
```

#### Dependencias

```$xslt
npm install chai --save-dev
npm install chai-http --save-dev
npm install mocha --save-dev
npm install -g nodemon
npm install express
npm install body-parser
npm install mongoose
npm install jsonwebtoken
npm install bcrypt
npm install dotenv
```