const nodemailer = require('nodemailer');

module.exports = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: "sampleshop2019@yandex.by",
                pass: "sampleshop"
            }
        });
    }

    /* 
        mail = {
            from: 'from@...',
            to: 'to@...',
            subject: 'sample',
            text: 'sample',
            html: '<p>sample</p>'
        };
    */
    async send(mail) {
        return await this.transporter.sendMail(mail);
    }
}