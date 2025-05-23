const DryUser = require('../users/dryUser');
const transporter4 = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'tbsolutions9@gmail.com';

const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';

const submitDry = async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            phone,
            vinylSize,
            placement,
            message
        } = req.body;
        // Ensure that file upload exists
        if (!req.files || !req.files['img'] || !req.files['img'][0]) {
            return res.status(400).json({
                error: "Logo is missing"
            });
        }
        let { finishing } = req.body;
finishing = typeof finishing === 'string' ? finishing.trim() : '';

if (!finishing || finishing.trim() === '') {
  return res.status(400).json({ error: 'Please select a finishing option' });
}
        const terms = req.body.terms === 'true' || req.body.terms === true ? true : false;
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
        const newUser = await DryUser.create({
            name,
            company,
            email,
            phone,
            vinylSize,
            placement,
            finishing,
            img: Img,
            terms,
            message
        });
        // Compose email options
        const mailOptions = {
            from: 'Material WorX <tbsolutions9@gmail.com>',
            to: email,
            bcc: [
                { name: 'Material WorX', address: myEmail },
                
                { name: 'Carson Speer', address: userEmail }, // Add the second Gmail address to BCC
                
                { name: 'Bryson Davis', address: mainEmail },
                { name: 'Jonkell Tolbert', address: foreemail }
                 
            ],
            subject: 'DRYWALL/CONCRETE/FLOOR GRAPHIC REQUEST',
            html: `
<!DOCTYPE html>
            <html lang="en">
                    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e7e7e7;">
                <form style="background-color: #e7e7e7; flex-direction: column; align-items: center; justify-content: center;" action="#" method="post">
                    <header style="background-color: #1dd2ff">
                    <h2>Material WorX</h2>
                    </header>
                    <h2>DRYWALL/CONCRETE/FLOOR GRAPHIC REQUEST</h2>
                            <div style="margin-bottom: 15px;">
                        <p>Hi <strong>${name}</strong>,</p>
                        <p>Your Apparel Submission has been received successfully! 
                            If you have any questions or concerns, please call (706) 263-0175.
                            </p>
                <h3>Contact Info:</h3> 
      <li><p><strong>Name:</strong> ${name}</p></li>
      <li><p><strong>Company:</strong> ${company}</p></li>
      <li><p><strong>Email:</strong> ${email}</p></li>
      <li><p><strong>Phone:</strong> ${phone}</p></li>
                        <h3>Fleet/Decal Specifications:</h3>
                        <p><strong>Vinyl Size:</strong>${vinylSize}</p>
                        <p><strong>Placement:</strong>${placement}</p>
                        <p><strong>Finishing:</strong>${finishing}</p>
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
            message: 'Drywall/Concrete/Floor Graphics submitted successfully',
            newUser: newUser // Include the newUser object in the response
        };

        res.status(201).json(response);

    } catch (error) {
        console.error('Error submitting Drywall/Concrete/Floor Graphics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    submitDry
};
