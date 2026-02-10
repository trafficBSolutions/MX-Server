const JobApplication = require('../users/jobApplicationUser');
const transporter = require('../utils/emailConfigMX');
const myEmail = 'tbsolutions9@gmail.com';
/*
const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';
*/
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
                { name: 'Material WorX', address: myEmail }
                /*
                { name: 'Carson Speer', address: userEmail },
                { name: 'Bryson Davis', address: mainEmail },
                { name: 'Jonkell Tolbert', address: foreemail }
                */
            ],
            subject: `JOB APPLICATION - ${position}`,
            html: `
          <!DOCTYPE html>
            <html lang="en">
                    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e7e7e7;">
                <form style="background-color: #e7e7e7; flex-direction: column; align-items: center; justify-content: center;" action="#" method="post">
                    <header style="background-color: #1dd2ff">
                    <h2>Material WorX</h2>
                    </header>
                    <h2>JOB APPLICATION RECEIVED</h2>
                            <div style="margin-bottom: 15px;">
                        <p>Hi <strong>${first} ${last}</strong>,</p>
                        <p>Your job application has been received successfully! 
                            If you have any questions or concerns, please call (706) 263-0175.
                            </p>
                        <h3>Contact Info:</h3>
                        <li><strong>Name:</strong> ${first} ${last}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>

                        <h3>Application Summary:</h3>
                        <li><strong>Position:</strong> ${position}</li>
                        <li><strong>Years of Experience:</strong> ${experience}</li>
                        ${message ? `<h3>Additional Info:</h3>
                        <li><strong>${message}</strong></li>` : ''}
                        <hr style="margin: 20px 0;">
                        <p style="font-size: 14px;">Material WorX<br>723 N Wall St, Calhoun, GA 30701<br>Phone: (706) 263-0175<br><a href="https://www.material-worx.com">www.material-worx.com</a></p>
                        </div>
                        </form>
                        </body>
            </html>`
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
