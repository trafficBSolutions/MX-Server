const WindowUser = require('../users/windowUser');
const transporter4 = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'tbsolutions9@gmail.com';

const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';
const damien = 'tbsolutions14@gmail.com';
const submitWindow = async (req, res) => {
    try {
        const { 
            name, 
            company, 
            email, 
            phone, 
            windowSize,
            tint,
            message
         } = req.body;

        // Log request body to debug missing fields
        console.log(req.body);
 const terms = req.body.terms === 'true' || req.body.terms === true ? true : false;
        // Check for required fields
        if (!name || !company || !email || !phone || !windowSize || !tint || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create user record
        const newUser = await WindowUser.create({
            name,
            company,
            email,
            phone,
            windowSize,
            tint,
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
                
                { name: 'Bryson Davis', address: mainEmail },
                { name: 'Jonkell Tolbert', address: foreemail },
                 { name: 'Damien Diskey', address: damien}
            ],
            subject: `WINDOW FROST/TINT REQUEST`,
            html: `
<!DOCTYPE html>
<html lang="en">
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;">
    <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border: 1px solid #ddd;">
      <h2 style="text-align: center; background-color: #1dd2ff; padding: 10px 0; color: #000;">Material WorX</h2>
      <h3 style="text-align: center;">WINDOW FROST/TINT REQUEST</h3>
      
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Window Size(s):</strong> ${windowSize}</p>
      <p><strong>Frost/Tint:</strong> ${tint}</p>
      <li><strong>Terms & Condition:</strong> ${terms ? 'Agreed' : 'Agreed'}</li>
      <p><strong>Message:</strong> ${message}</p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 14px;">This request was submitted via the Material WorX website.</p>
      <p style="font-size: 14px;">Need help? Call us at <a href="tel:+17062630175">706-263-0175</a> or visit <a href="https://www.trafficbarriersolutions.com">www.trafficbarriersolutions.com</a>.</p>
    </div>
  </body>
</html>
`
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
            message: 'Window Frost/Tint submitted successfully',
            newUser: newUser // Include the newUser object in the response
        };

        res.status(201).json(response);

    } catch (error) {
        console.error('Error submitting Message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    submitWindow
};
