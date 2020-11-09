const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//mongoose 메소드
//저장 전 비밀번호 암호화
userSchema.pre("save", function (next) {
  const user = this;
  // 비밀번호 암호화
  //salt생성
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      //생성된 salt로 hash생성
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plain password를 암호화하여
  //저장된 비밀번호와 같은지 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.genToken = function (cb) {
  const user = this;
  //jsonwebtoken 이용해서 토큰생성
  //jwt.sign(payload(사용자데이터), verify signature(위조방지문자))
  const token = jwt.sign(user._id.toHexString(), "secret");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

//method -> 인스턴스를 생성해야 쓸 수 있음
//statics -> 인스턴스 생성없이 씀
userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  //token decode
  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
