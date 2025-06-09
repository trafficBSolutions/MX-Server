const BannerUser = require('../users/bannerUser');
const transporter6 = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'tbsolutions9@gmail.com';

const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';
const damien = 'tbsolutions14@gmail.com';
const andrew = 'materialworx2@gmail.com';
const submitBanner = async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            phone,
            bannerSize,
            hang,
            finishing,
            message
        } = req.body;
const terms = req.body.terms === 'true' || req.body.terms === true ? true : false;
        // Ensure that file upload exists
        if (!req.files || !req.files['img'] || !req.files['img'][0]) {
            return res.status(400).json({
                error: "Logo is missing"
            });
        }
        const uploadedImages = req.files['img'].map(file => ({
            filename: file.originalname,
            path: `./files/${file.filename}`
          }));          
        const Img = req.files['img'][0].filename;

        // Validate email address
        const isValidEmail = /\S+@\S+\.\S+/.test(email);
        if (!isValidEmail) {
            return res.status(400).json({
                error: "Invalid email address"
            });
        }

        // Create user record
        const newUser = await BannerUser.create({
            name,
            company,
            email,
            phone,
            bannerSize,
            hang,
            finishing,
            img: Img,
            message,
            terms
        });

        // Compose email options
        const mailOptions = {
            from: 'Material WorX <tbsolutions9@gmail.com>',
            to: email,
            bcc: [
                { name: 'Material WorX', address: myEmail },
                
                { name: 'Carson Speer', address: userEmail }, // Add the second Gmail address to BCC
                { name: 'Andrew Clements', address: andrew },
                { name: 'Bryson Davis', address: mainEmail },
                { name: 'Jonkell Tolbert', address: foreemail },
                { name: 'Damien Diskey', address: damien}
                 
            ],
            subject: 'BANNER REQUEST',
            html: `
          <!DOCTYPE html>
            <html lang="en">
                    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e7e7e7;">
                <form style="background-color: #e7e7e7; flex-direction: column; align-items: center; justify-content: center;" action="#" method="post">
                    <header style="background-color: #1dd2ff">
                    <h2>Material WorX</h2>
                    </header>
                    <h2>BANNER REQUEST</h2>
                            <div style="margin-bottom: 15px;">
                        <p>Hi <strong>${name}</strong>,</p>
                        <p>Your banner Submission has been received successfully! 
                            If you have any questions or concerns, please call (706) 263-0175.
                            </p>
                        <h3>Contact Info:</h3>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Company:</strong> ${company}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>

                        <h3">Banner Summary:</h3>
                        
                        <li><strong>Banner Size(s):</strong> ${bannerSize}</li>
                        <li><strong>Banner Placement(s):</strong> ${hang}</li>
    <li><strong>Banner Finishing:</strong> ${finishing}</li>
                <h3>Additional Info:</h3>
                  <li><strong>Terms & Condition:</strong> ${terms ? 'Agreed' : 'Agreed'}</li>
                  <li><strong>${message}</strong></li>
                        <hr style="margin: 20px 0;">
                        <p style="font-size: 14px;">Material WorX<br>723 N Wall St, Calhoun, GA 30701<br>Phone: (706) 263-0175<br><a href="https://www.material-worx.com">www.material-worx.com</a></p>
                        </div>
                        </form>
                        </body>
            </html>`,
attachments: uploadedImages
        };

        // Send email
        transporter6.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email notification:', error);
            } else {
                console.log('Email notification sent:', info.response);
            }
        });

        const response = {
            message: 'Banner Request submitted successfully',
            newUser: newUser // Include the newUser object in the response
        };

        res.status(201).json(response);

    } catch (error) {
        console.error('Error submitting Banner Request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    submitBanner
};
