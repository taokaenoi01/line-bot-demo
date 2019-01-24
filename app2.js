// Echo reply

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    let userid = req.body.events[0].source.userId
    reply(reply_token, msg, userid)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer k1+tnPGkJmLtwBucoSU+AQ/xKIaUFw+INxkscT9ZAZDtv8YueNd8IyXaraZG0zyxDlEno8pGOaZ1bti9wlcLrIWsYwh5P0m9ClZ9wv1ZUeffFIIYqlU6bMniKARmtHWlKPuBdA8LYe5stuktcQL8kwdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: userid
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
