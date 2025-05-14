const SignUser = require('../users/signUser');
const transporter4 = require('../utils/emailConfigMX'); // Use transporter2 only
const myEmail = 'tbsolutions9@gmail.com';

const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';

const submitSign = async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            phone,
            sign,
            message
        } = req.body;
        
        const terms = req.body.terms === 'true' || req.body.terms === true ? true : false;
        const signs = JSON.parse(req.body.signs); // Parse the sign array from the request body

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
        const newUser = await SignUser.create({
            name,
            company,
            email,
            phone,
            sign,
            img: Img,
            terms,
            message
        });

        // Format the submitted signs for the email body
let signsHtml = '';
if (signs.length > 0) {
  signsHtml += `<ul style="padding-left: 0; list-style-type: none;">`;

  signs.forEach((sign, index) => {
    signsHtml += `
      <li style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
        <p><strong>Type:</strong> ${sign.signType}</p>
        <p><strong>Size:</strong> ${sign.signSize}</p>
        <p><strong>Sides:</strong> ${sign.signSides || 'Not specified'}</p>
        <p><strong>Finishing:</strong> ${sign.finishing}</p>
        ${sign.thickness ? `<p><strong>Thickness:</strong> ${sign.thickness}</p>` : ''}
        ${sign.acmColor ? `<p><strong>ACM Color:</strong> ${sign.acmColor}</p>` : ''}
        ${sign.acrylicColor ? `<p><strong>Acrylic Color:</strong> ${sign.acrylicColor}</p>` : ''}
        <p><strong>Quantity:</strong> ${sign.quantity}</p>
      </li>
    `;
  });

  signsHtml += `</ul>`;
} else {
  signsHtml = '<p>No signs submitted.</p>';
}


        // Compose email options with the sign included
        const mailOptions = {
            from: 'Material WorX <tbsolutions9@gmail.com>',
            to: email,
            bcc: [
                { name: 'Material WorX', address: myEmail },
                
                { name: 'Carson Speer', address: userEmail }, // Add the second Gmail address to BCC
                
                { name: 'Bryson Davis', address: mainEmail },
                { name: 'Jonkell Tolbert', address: foreemail }
                 
            ],
            subject: 'CUSTOMIZABLE SIGNAGE REQUEST',
            html: `
            <!DOCTYPE html>
            <html lang="en">
                    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e7e7e7;">
                <form style="background-color: #e7e7e7; flex-direction: column; align-items: center; justify-content: center;" action="#" method="post">
                    <header style="background-color: #1dd2ff">
                    <h2>Material WorX</h2>
                    </header>
                    <h2>CUSTOMIZABLE SIGNAGE REQUEST</h2>
                            <div style="margin-bottom: 15px;">
                        <p>Hi <strong>${name}</strong>,</p>
                        <p>Your Sign Submission has been received successfully! 
                            If you have any questions or concerns regarding your sign, please call (706) 263-0175.
                            </p>
                        <h3>Contact Info:</h3>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Company:</strong> ${company}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                        <h3>Sign Summary:</h3>
                        <p>${signsHtml}</p></p>
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
        transporter4.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email notification:', error);
            } else {
                console.log('Email notification sent:', info.response);
            }
        });

        const response = {
            message: 'Custom Sign submitted successfully',
            newUser: newUser // Include the newUser object in the response
        };

        res.status(201).json(response);

    } catch (error) {
        console.error('Error submitting Custom Sign:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    submitSign
};
