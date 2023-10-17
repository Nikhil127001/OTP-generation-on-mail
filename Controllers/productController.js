
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
const otpGenerator = require('otp-generator')

const sendOtptoMail = async (req, res, next) => {

    try {

        const accesstoken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'kumarnikhil2111@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accesstoken
            },
        });

        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        const info = await transporter.sendMail({
            from: '"Nikhil Kumar" <kumarnikhil2111@gmail.com>', // sender address
            to: "prajapatinikhil1661@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<html>
            <head>
              <style>
                /* Add your CSS styles here */
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                  font-size: 24px;
                }
                p {
                  color: #666;
                  font-size: 16px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Hello ✔</h1>
                <p>
                  Dear recipient,
                </p>
                <h4>Your login OTP is  ${OTP}<h4>
                <p>
                  This is a professionally styled HTML email. You can customize the content and styling as needed.
                </p>
                <p>
                  Regards,
                  <br>
                  Nikhil Kumar
                </p>
              </div>
            </body>
            </html>`
        });


        res.json({
            message: 'mail sent successfully',
            information : info
        })

    } catch (err) {
        next(err);
    }

}

module.exports = {sendOtptoMail }