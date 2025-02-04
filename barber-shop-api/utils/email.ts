import dotenv from 'dotenv';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

import CustomError from './custom-error';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const USER_EMAIL = process.env.USER_EMAIL;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const accessToken = await oauth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            /*             host: 'smtp.gmail.com',
                        port: 587,
                        secure: false, */
            auth: {
                type: 'OAuth2',
                user: USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token as string
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: USER_EMAIL,
            to: to,
            subject: subject,
            text: 'Thank you for visiting Barber Shop!',
            html: html
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}.`);
    } catch (error: any) {
        throw new CustomError(error.message || 'Email sending failed', 500);
    }
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
    try {
        const resetLink = `http://localhost:3000/reset/${token}`;
        const emailContent = `
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetLink}">link</a> to set a new password.</p>
    `;
        await sendEmail(email, 'Barber Shop Password Reset', emailContent);
    } catch (error: any) {
        throw new CustomError(error.message || 'Internal server error. Could not send reset password email.', error.status || 500, error.data)
    }
}