const FleetUser = require('../users/fleetUser');
const transporter6 = require('../utils/emailConfig'); // Use transporter2 only
const myEmail = 'tbsolutions9@gmail.com';

const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';
const damien = 'tbsolutions14@gmail.com';
const andrew = 'materialworx2@gmail.com';
const submitFleet = async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            phone,
            vehicle,
            finishing,
            message,
            terms,
        } = req.body;

       

        // Ensure that file upload exists
        if (!req.files || !req.files['img'] || !req.files['img'][0]) {
            return res.status(400).json({
                error: "Fleet image is missing"
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
        const newUser = await FleetUser.create({
            name,
            company,
            email,
            phone,
            vehicle,
            finishing,
            img: Img,
            message,
            terms,
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
            subject: 'FLEET/DECAL VEHICLE GRAPHIC REQUEST',
            html: `
            <!DOCTYPE html>
            <html lang="en">
              <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; color: #000;">
                <div style="max-width: 700px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">
                  <h2 style="color: #1dd2ff; text-align: center;">Material WorX - Fleet/Decal Graphics Request</h2>
                  <p>Hi ${name},</p>
                  <p>Thank you for submitting your fleet/decal graphics request.</p>
            
                  <h3 style="margin-top: 30px;">Contact Info</h3>
                  <ul>
                    <li><strong>Name:</strong> ${name} </li>
                    <li><strong>Company:</strong> ${company}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                  </ul>
            
                  <h3 style="margin-top: 20px;">Fleet Details</h3>
                  <ul>
                  <li><strong>Terms & Condition:</strong> ${terms ? 'Agreed' : 'Agreed'}</li>
                    <li><strong>Vehicles:</strong> ${vehicle}</li>
                    <li><strong>Finishing:</strong> ${finishing}</li>
                    <li><strong>Message:</strong> ${message}</li>
                  </ul>
            
                  <p style="margin-top: 30px;">We appreciate your business and look forward to working with you.</p>
                  <p><strong>— Material WorX Team</strong><br/>Bryson Davis – 706-263-0175</p>
            
                  <hr style="margin-top: 40px;"/>
                  <p style="font-size: 12px; text-align: center;">
                    Material WorX · 723 N Wall St · Calhoun, GA 30701 ·
                    <a href="http://www.trafficbarriersolutions.com">www.trafficbarriersolutions.com</a>
                  </p>
                </div>
              </body>
            </html>
            `,            
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
            message: 'Fleet/Decal Vehicle Graphics submitted successfully',
            newUser: newUser // Include the newUser object in the response
        };

        res.status(201).json(response);

    } catch (error) {
        console.error('Error submitting Fleet/Decal Vehicle Graphics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    submitFleet
};
