const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});


function pause() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve,2000);
    })
}

exports.handler = async (event, context) => {
    await pause();
    const body = JSON.parse(event.body);
    //console.log('body >', body);

    // перевірка смітевого поля
    if (body.garbage) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'Давай, до побачення !'}),
        };
    }

    const fieldsRequiresd = ['email'];
    // Email - обов'язкове поле
    for ( const field of fieldsRequiresd ) {
        if (!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Введіть ${field}`
                })
            }
        }
    }

    await transporter.sendMail({
        from: 'Fresh Blog <signup@freshblog.ua>',
        to: `<${body.email}>, info@myemail.com`,
        subject: 'Розсилка листів',
        html: `<div><p>дякую , що є з нами</p></div>`,
    });


    return {
        statusCode: 200,
        body: JSON.stringify({
            massage: 'Transaction complate !',
        })
    }

};
