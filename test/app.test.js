const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

chai.use(chaiHttp);

describe("API TESTING :", () => {
    it("CREATE USER: ", done => {
        chai
            .request(app)
            .post("/api/createUser")
            .send({ last_name: "Name", first_name: "FN", email: "test@gmail.com", password: "azer" })
            .end((err, res) => {
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("User added");
                done();
            });
    });
    it("IS AUTH (missing parameters): ", done => {
        chai
            .request(app)
            .get("/api/isAuth")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals(false);
                done();
            });
    });
    it("IS AUTH (non auth user): ", done => {
        chai
            .request(app)
            .get("/api/isAuth?email=test@gmail.com")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals(false);
                done();
            });
    });
    it("IS AUTH (non existing user): ", done => {
        chai
            .request(app)
            .get("/api/isAuth?email=test654@gmail.com")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals(false);
                done();
            });
    });
    it("SIGN IN : ", done => {
        chai
            .request(app)
            .get("/api/SignIn?email=test@gmail.com&password=azer")
            .end((err, res) => {
                expect(res.body.status).to.equals("success");
                expect(res.body.message.email).to.equals("test@gmail.com");
                expect(res.body.message.firstName).to.equals("FN");
                expect(res.body.message.name).to.equals("Name");
                expect(res.body.message.password).to.equals("azer");
                done();
            });
      });
    it("SIGN IN (wrong email): ", done => {
        chai
            .request(app)
            .get("/api/SignIn?email=test2@gmail.com&password=azer")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals("error");
                done();
            });
    });
    it("SIGN IN (wrong password): ", done => {
        chai
            .request(app)
            .get("/api/SignIn?email=test@gmail.com&password=azertinopb")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals("error");
                done();
            });
    });
    it("SIGN IN (wrong email & password): ", done => {
        chai
            .request(app)
            .get("/api/SignIn?email=test2@gmail.com&password=azertinopb")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals("error");
                done();
            });
    });
    it("SIGN IN (missing paramaters): ", done => {
        chai
            .request(app)
            .get("/api/SignIn")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals("error");
                done();
            });
    });
    it("SIGN IN (already signed in): ", done => {
        chai
            .request(app)
            .get("/api/SignIn?email=test@gmail.com&password=azer")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals("Already signed in");
                done();
            });
    });
    it("IS AUTH: ", done => {
        chai
            .request(app)
            .get("/api/isAuth?email=test@gmail.com")
            .end((err, res) => {
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals(true);
                done();
            });
    });
    it("CREATE USER (missing params): ", done => {
        chai
            .request(app)
            .post("/api/createUser")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals("Missing parameters");
                done();
            });
    });
    it("CREATE USER (email already used): ", done => {
        chai
            .request(app)
            .post("/api/createUser")
            .send({ last_name: "Name", first_name: "FN", email: "test@gmail.com", password: "azer" })
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals("Email already exists");
                done();
            });
    });
    it("DISCONNECT (missing parameters): ", done => {
        chai
            .request(app)
            .get("/api/disconnect")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals(false);
                done();
            });
    });
    it("DISCONNECT: ", done => {
        chai
            .request(app)
            .get("/api/disconnect?email=test@gmail.com")
            .end((err, res) => {
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals(true);
                done();
            });
    });
    it("IS TRULY DISCONNECTED ?: ", done => {
        chai
            .request(app)
            .get("/api/isAuth?email=test@gmail.com")
            .end((err, res) => {
                expect(res.body.status).to.equals("failed");
                expect(res.body.message).to.equals(false);
                done();
            });
    });
});


