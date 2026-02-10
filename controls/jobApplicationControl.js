const JobApplication = require('../users/jobApplicationUser');
const transporter = require('../utils/emailConfigMX');
const myEmail = 'tbsolutions9@gmail.com';

const submitJobApplication = async (req, res) => {
    try {
        const { first, last, email, phone, position, experience, message } = req.body;

        console.log(req.body);

        if (!first || !last || !email || !phone || !position || !experience) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        const newApplication = await JobApplication.create({
            first,
            last,
            email,
            phone,
            position,
            experience,
            message
        });

        const mailOptions = {
            from: 'Material WorX <tbsolutions9@gmail.com>',
            to: email,
            bcc: [
                { name: 'Material WorX', address: myEmail },
                { name: 'Carson Speer', address: userEmail }, // Add the second Gmail address to BCC
                { name: 'Bryson Davis', address: mainEmail },
            ],
            subject: `MX JOB APPLICATION FROM ${first} ${last} - ${position}`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e7e7e7;">
                    <form style="background-color: #e7e7e7; flex-direction: column; align-items: center; justify-content: center;" action="#" method="post">
                        <header style="background-color: #1dd2ff">
                            <h2 style="margin-top: 20px; font-size: 50px; text-align: center; font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; color:#000000;">Material WorX</h2>
                        </header>
                        <h2 style="margin-top: 20px; font-size: 47px; text-align: center; font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; color:#000000;">JOB APPLICATION RECEIVED</h2>
                        <div style="margin-bottom: 15px;">
                            <h1 style="margin-top: 10px; font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Dear ${first},</h1>
                            <h1 style="margin-top: 5px; font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Thank you for applying to Material WorX! Your application has been received successfully. We will review your application and contact you soon.</h1>
                            <h1 style="color:#000000; font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 40px; font-size: 60px;">Application Details:</h1>
                            <p style="font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 20px; font-size: 40px;">First Name: <p style="margin-top: 10px; font-size: 30px; font-family: Arial, Helvetica, sans-serif;">${first}</p></p>
                            <p style="font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 20px; font-size: 40px;">Last Name: <p style="margin-top: 10px; font-size: 30px; font-family: Arial, Helvetica, sans-serif;">${last}</p></p>
                            <p style="font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 20px; font-size: 40px;">Email: <p style="margin-top: 10px; font-size: 30px; font-family: Arial, Helvetica, sans-serif;">${email}</p></p>
                            <p style="font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 20px; font-size: 40px;">Phone: <p style="margin-top: 10px; font-size: 30px; font-family: Arial, Helvetica, sans-serif;">${phone}</p></p>
                            <p style="font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 20px; font-size: 40px;">Position: <p style="margin-top: 10px; font-size: 30px; font-family: Arial, Helvetica, sans-serif;">${position}</p></p>
                            <p style="font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 20px; font-size: 40px;">Years of Experience: <p style="margin-top: 10px; font-size: 30px; font-family: Arial, Helvetica, sans-serif;">${experience}</p></p>
                            ${message ? `<p style="color:#000000; font-family: 'Kairos W04 Extended Bold'; font-style: normal; margin-top: 40px; font-size: 60px;">Additional Information:</p>
                            <p style="margin-top: 10px; font-size: 30px; font-family: Arial, Helvetica, sans-serif;">${message}</p>` : ''}
                            <h1 style="margin-top: 80px; font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; line-height: 26px;">We appreciate your interest in joining the Material WorX team. We will carefully review your application and reach out to qualified candidates.</h1>
                            <h1 style="margin-top: 20px; font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; line-height: 26px;">Best Regards,</h1>
                            <h1 style="font-size: 30px; margin-top: 20px; font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; line-height: 30px;">Bryson Davis: 706-263-0175</h1>
                            <div style="padding-top: 10px;">
                                <h3 style="font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif; font-style: normal; margin-top: 20px; font-size: 40px; color:#000000;">Contact Information:</h3>
                                <h1 style="font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Bryson C Davis</h1>
                                <h1 style="font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Traffic and Barrier Solutions, LLC/Material WorX</h1>
                                <h1 style="font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">723 N Wall Street</h1>
                                <h1 style="font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Calhoun, GA 30701</h1>
                                <h1 style="font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Cell: 706-263-0175</h1>
                                <h1 style="font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Website: <a href="http://www.trafficbarriersolutions.com">www.trafficbarriersolutions.com</a></h1>
                            </div>
                        </div>
                    </form>
                </body>
            </html>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email notification:', error);
            } else {
                console.log('Email notification sent:', info.response);
            }
        });

        const response = {
            message: 'Application submitted successfully',
            newApplication: newApplication
        };

        res.status(201).json(response);

    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    submitJobApplication
};
