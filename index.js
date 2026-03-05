import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


const defaultTitle = "Cosmos";
const defaultPost = "Of brilliant syntheses corpus callosum Euclid star stuff harvesting star light with pretty stories for which there's little good evidence the sky calls to us. Inconspicuous motes of rock and gas network of wormholes circumnavigated invent the universe from which we spring vastness is bearable only through love. Network of wormholes extraordinary claims require extraordinary evidence invent the universe dream of the mind's eye descended from astronomers two ghostly white figures in coveralls and helmets are softly dancing. Jean-François Champollion light years something incredible is waiting to be known two ghostly white figures in coveralls and helmets are softly dancing Sea of Tranquility descended from astronomers. Hearts of the stars courage of our questions from which we spring star stuff harvesting star light vastness is bearable only through love made in the interiors of collapsing stars? The only home we've ever known the ash of stellar alchemy are creatures of the cosmos vastness is bearable only through love made in the interiors of collapsing stars invent the universe and billions upon billions upon billions upon billions upon billions upon billions upon billions.";
let allPosts = [{title: defaultTitle, post: defaultPost}];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("login.ejs", {
        links: false,
    });
});

app.get("/home", (req, res) => {
    res.render("index.ejs", {
        links: true,
        posts: allPosts,
    });
});

app.get("/newpost", (req, res) => {
    res.render("newPost.ejs", {
        links: true,
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs", {
        links: true,
    });
})


app.post("/check", (req, res) => {
    const userName = ["guest", "Tabitha"];
    const password = ["knockKnock", "Who'sThere?"]
    const body = req.body;
    const inputUserName = body.userName;
    const inputPassword = body.password;
    
    if(inputUserName === userName[0] && inputPassword === password[0] ||
        inputUserName === userName[1] && inputPassword === password[1]) {
            res.render("welcome.ejs", {
                yourUserName: inputUserName,
            links: true,
        });
    } else {
        const loginError = "Sorry, wrong username or password!";
        res.render("login.ejs", {
            message: loginError,
        })
    }
});

app.post("/submit", (req, res) => {
    const body = req.body;
    const inputTitle = body.title;
    const inputPost = body.blog;
    const post = {title: inputTitle, post: inputPost}
    
    const submitMsg = "Your post has been succesfully submitted!";
    const errorMsg = "Title already exists";
    
    if (!allPosts.some(title => title.title === inputTitle)) {
        allPosts.push(post);
        
        res.render("newPost.ejs", {
            links: true,
            posts: allPosts,
            message: submitMsg,
        });

    } else {
        res.render("newPost.ejs", {
            links: true,
            posts: allPosts,
            errMessage: errorMsg,
            post: inputPost
        });
    }

});

app.post("/delete", (req, res) => {
    allPosts = [];
    
    res.render("index.ejs", {
        links: true,
        posts: allPosts,
    })
})

app.post("/delete-one", (req, res) => {
    const body = req.body;
    const deletePostTitle = body.title

    
    allPosts = allPosts.filter(post => post.title !== deletePostTitle);

    res.render("index.ejs", {
        links: true,
        posts: allPosts,
    })
})

app.post("/edit", (req, res) => {
    const body = req.body;
    const editPostTitle = body.title;
    const editPost = body.post;

    // delete the old post
    const deletePostTitle = body.title
    allPosts = allPosts.filter(post => post.title !== deletePostTitle);

    res.render("edit.ejs", {
        links: false,
        title: editPostTitle,
        post: editPost
    })
})

app.post("/editpost", (req, res) => {
    const body = req.body;
    const inputTitle = body.title;
    const inputPost = body.blog;
    const post = {title: inputTitle, post: inputPost}

    // add the new version of the post
    allPosts.push(post);

    res.render("index.ejs", {
        links: true,
        posts: allPosts,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
