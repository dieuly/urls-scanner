import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const str = "This is a Heroku app";
    res.send(str);
});

app.post('/', (req, res) => {
    const cvWrapper = req.body;
    if (JSON.stringify(cvWrapper) != '{}') {
        const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        const urlsList = cvWrapper.contentVersionData.match(urlRegex);
        const result = {
            'contentVersionId': cvWrapper.contentVersionId,
            'urlsList' : urlsList
        };
        res.send(result);
    }
    else {
        res.send('No data Received');
    }
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});