const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articleSchema = {
    title: String,
    content: String
}
const Article = mongoose.model("Article", articleSchema);

//chained routing example 
app.route('/articles')
    .get(function (req, res) {
        Article.find({}, function (err, foundArticles) {
            if (!err)
                res.send(foundArticles);
            else
                res.send(err);
        });
    })

    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (err)
                res.send(err);
            else
                res.send("Post acknowledged");
        });
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err)
                res.send("Successfully deleted all articles.");
            else
                res.send(err);
        });
    });




app.route('/articles/:articleTitle')

    .get(function (req, res) {
        const articleTitle = req.body.articleTitle;
        Article.findOne({
            title: articleTitle
        }, function (err, foundArticle) {
            if (foundArticle)
                res.send(foundArticle);
            else
                res.send("Error 404");
        })
    })

    .put(function (req, res) {
        const articleTitle = req.params.articleTitle;
        Article.update({
                title: articleTitle
            }, {
                title: req.body.title,
                content: req.body.content
            }, {
                overwrite: true
            },
            function (err) {
                if (!err)
                    res.send("Succesfully Updated");
                else
                    res.send("Error 401");
            });
    })

    .patch(function (req, res) {
        Article.update({
                title: req.params.articleTitle
            }, {
                $set: req.body
            },
            function (err) {
                if (err)
                    res.send(err);
                else
                    res.send("Success");
            })
    })
    .delete(function (req, res) {
        Article.deleteOne({
            title: req.params.articleTitle
        }, function (err) {
            if (err)
                res.send("Not found such file");
            else
                res.send("Success");
        });
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});