
const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'Jonas Schmedtmann <' + process.env.EMAIL_FROM + '>';
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(subject, message) {
    // 1) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: message
    };

    // 2) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const message = '<p>Welcome to the Natours Family, ' + this.firstName + '!</p>';
    await this.send('Welcome to the Natours Family!', message);
  }

  async sendPasswordReset() {
    const message = '<p>Hi ' + this.firstName + ',</p>' +
      '<p>You have requested a password reset. Please use the following link to reset your password:</p>' +
      '<a href="' + this.url + '">' + this.url + '</a>' +
      '<p>This link is valid for 10 minutes only.</p>';
    await this.send('Your password reset token (valid for only 10 minutes)', message);
  }
};
