const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const config = require("./config/dev");

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const { Favorite } = require("./models/Favorite");
const { Comment } = require("./models/Comment");

//application/x-www-forn-urlencoded 형식을 분석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 형식을 분석
app.use(bodyParser.json());

app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  //회원가입할 때 필요한 정보를 client에서 가져옴
  //데이터베이스에 저장
  const user = new User(req.body);
  //save -> mongoDB 메소드
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  //데이터베이스에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "일치하는 회원이 없습니다.",
      });
    }
    //입력한 비밀번호와 같은지 비교
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      //토큰생성
      user.genToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 저장 -> cookie, web storage
        //web storage -> Local Storage/ Session Storage
        //session은 브라우저가 꺼지면 데이터가 삭제 된다는 차이점
        //민감한 정보는 저장하지 않는 것을 권장

        //cookie에 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth /*미들웨어*/, (req, res) => {
  //미들웨어를 거쳐 온 정보로
  //인증을 통과했음을 뜻함
  res.status(200).json({
    _id: req.user._id,
    //0: 일반유저, 1: 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/favorite/favoriteNumber", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: favorite.length });
  });
});

app.post("/api/favorite/favorited", (req, res) => {
  Favorite.findOne({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, favorite) => {
    if (err) {
      return res.status(400).send(err);
    }
    let result = false;
    if (favorite !== null && favorite.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, isFavorite: result });
  });
});

app.post("/api/favorite/addFavorite", (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/favorite/removeFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

app.post("/api/favorite/favoriteList", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, movies) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, movies });
  });
});

app.post("/api/comment/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    Comment.find({ _id: comment._id })
      .populate("writer") //populate -> objectId를  object로치환
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

app.post("/api/comment/getComments", (req, res) => {
  Comment.find({ postId: req.body.movieId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
