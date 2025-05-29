const DecalUser = require('../users/decalUser');
const transporter5 = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'tbsolutions9@gmail.com';

const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';
const damien = 'tbsolutions14@gmail.com';
const submitDecal = async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            phone,
            decal,
            message
        } = req.body;
const terms = req.body.terms === 'true' || req.body.terms === true ? true : false;
        const decals = JSON.parse(req.body.decals); // Parse the decals array from the request body

        // Ensure that file upload exists
        if (!req.files || !req.files['img'] || !req.files['img'][0]) {
            return res.status(400).json({
                error: "Logo is missing"
            });
        }
        // Ensure that file upload exists
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
        const newUser = await DecalUser.create({
            name,
            company,
            email,
            phone,
            decal,
            img: Img,
            message,
            terms
        });

        // Format the submitted signs for the email body
        let decalsHtml = '';
        if (decals.length > 0) {
            decals.forEach((decal, index) => {
                decalsHtml += `
                    <li style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
                        <p><strong>Decal & Sticker Type:</strong> ${decal.type}</p>
                        <p><strong>Decal & Sticker Size:</strong> ${decal.size}</p>
                        <p><strong>Decal & Sticker Cut Type:</strong> ${decal.cut}</p>
                        <p><strong>Decal & Sticker Quantity:</strong> ${decal.quantity}</p>
                    </li>
                `;
            });
            decalsHtml += `</ul>`;
        } else {
            decalsHtml = '<p>No decals submitted.</p>';
        }

        // Compose email options with the decals included
        const mailOptions = {
            from: 'Material WorX <tbsolutions9@gmail.com>',
            to: email,
            bcc: [
                { name: 'Material WorX', address: myEmail },
                
                { name: 'Carson Speer', address: userEmail }, // Add the second Gmail address to BCC
                
                { name: 'Bryson Davis', address: mainEmail },
                { name: 'Jonkell Tolbert', address: foreemail },
                { name: 'Damien Diskey', address: damien}
                 
            ],
            subject: 'DECAL(S) & STICKER(S) REQUEST',
            html: `
           <!DOCTYPE html>
            <html lang="en">
                    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e7e7e7;">
                <form style="background-color: #e7e7e7; flex-direction: column; align-items: center; justify-content: center;" action="#" method="post">
                    <header style="background-color: #1dd2ff">
                    <h2>Material WorX</h2>
                    </header>
                    <h2>DECAL(S) & STICKER(S) REQUEST</h2>
                            <div style="margin-bottom: 15px;">
                        <p>Hi <strong>${name}</strong>,</p>
                        <p>Your Decal and Sticker Submission has been received successfully! 
                            If you have any questions or concerns, please call (706) 263-0175.
                            </p>
                        <h3>Contact Info:</h3>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Company:</strong> ${company}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                       <h3>Decal Summary:</h3>
                        <p>${decalsHtml}</p></p>
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
        transporter5.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email notification:', error);
            } else {
                console.log('Email notification sent:', info.response);
            }
        });

        const response = {
            message: 'Decals & Stickers submitted successfully',
            newUser: newUser // Include the newUser object in the response
        };

        res.status(201).json(response);

    } catch (error) {
        console.error('Error submitting Decals & Stickers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    submitDecal
};
