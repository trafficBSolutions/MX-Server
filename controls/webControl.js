const  WebUser = require('../users/webUser');
const transporter4 = require('../utils/emailConfig');
const myEmail = 'tbsolutions9@gmail.com';
const userEmail = 'tbsolutions4@gmail.com';
const mainEmail = 'tbsolutions3@gmail.com';
const foreemail = 'tbsolutions55@gmail.com';
const submitWeb = async (req, res) => {
    try {
        const {
            first,
            last,
            company,
            email,
            phone,
            address,
            city,
            state,
            zip,
            domain,
            message
        } = req.body;


        const newUser = await WebUser.create({
            first,
            last,
            company,
            email,
            phone,
            address,
            city,
            state,
            zip,
            domain,
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
                    subject: 'WEBSITE DESIGN REQUEST',
                    html: `
                    <!DOCTYPE html>
                    <html lang="en">
                            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e7e7e7;">
                        <form style="background-color: #e7e7e7; flex-direction: column; align-items: center; justify-content: center;" action="#" method="post">
                            <header style="background-color: #1dd2ff">
                            <h2 style="margin-top: 20px;
                            font-size: 50px;
                            text-align: center;
                            font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                            color:#000000;"
                            >Material WorX</h2>
                            </header>
                           
                            <h2 style="margin-top: 20px;
                            font-size: 47px;
                            text-align: center;
                            font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                            color:#000000;"
                            >WEBSITE DESIGN REQUEST</h2>
                                    <div style="margin-bottom: 15px;">
                                <h1 style="margin-top: 10px;
                                            font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;"
                                    >Dear ${first},</h1>
                                <h1 style="margin-top: 5px;
                                    font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;"
                                    >Your Website Design submission has been received successfully! We will be with you within 48 hours!</h1>
                                
                                <h1 style="
                                color:#000000;
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 40px;
                                font-size: 60px;
                                ">Contact Info:</h1>
                
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">First Name: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${first}</p></p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">Last Name: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${last}</p></p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">Company: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${company}</p></p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">Email: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${email}</p></p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">Phone: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${phone}</p></p>
                
                                <h1 style="
                                color:#000000;
                                font-family: 'Kairos W04 Extended Bold';
                                font-style: normal;
                                margin-top: 40px;
                                font-size: 60px;
                                ">Company Address:</h1>
                
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">Address: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${address}</p></p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">City: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${city}</p></p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">State: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${state}</p></p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                ">Zip: <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${zip}</p></p>

                                <p style="
                                color:#000000;
                                font-family: 'Kairos W04 Extended Bold';
                                font-style: normal;
                                margin-top: 40px;
                                font-size: 60px;
                                ">Domain Name:</p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                "> <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${domain}</p></p>

                                <p style="
                                color:#000000;
                                font-family: 'Kairos W04 Extended Bold';
                                font-style: normal;
                                margin-top: 40px;
                                font-size: 60px;
                                ">Message:</p>
                                <p style="
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                margin-top: 20px;
                                font-size: 40px;
                                "> <p style="
                                margin-top: 10px;
                                font-size: 30px;
                                font-family: Arial, Helvetica, sans-serif;
                                ">${message}</p></p>
                                <h1 style="
                                margin-top: 80px;
                                font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                line-height: 26px;
                                ">At MX, we greatly value your business. We wanted to inform you that your WEBSITE DESIGN request has been successfully submitted. Thank you for taking proactive steps to ensure your website is
                                up-to-date and aligned with your brand's identity.
                                Our team will now review your request thoroughly to ensure how you job needs to be address. If any further information or revisions are needed, 
                                we will promptly reach out to you.
                                We appreciate your cooperation in this matter and look forward to working together to maintain your needs.
                                If you have any questions or require additional information, please don't hesitate to reach out to us.
                                </h1>
                                <h1 style="margin-top: 20px;
                                        font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                        line-height: 26px;">
                                            Best Regards,</h1>
                                <h1 style="
                                font-size: 30px;
                                margin-top: 20px;
                                font-family: 'Kairos W04 Extended Bold, Arial, Helvetica, sans-serif;
                                line-height: 30px;
                                ">Bryson Davis: 706-263-0175</h1>
                                <div style="padding-top: 10px;">
                                    <h3 style="
                                    font-family: 'Kairos W04 Extended Bold', Arial, Helvetica, sans-serif;
                                    font-style: normal;
                                    margin-top: 20px;
                                    font-size: 40px;
                                    color:#000000;
                                    ">Contact Information:</h3>
                                    <h1 style= "font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;"
                                    >Bryson C Davis</h1>
                                    <h1 style= "font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;"
                                    >Traffic and Barrier Solutions, LLC</h1>
                                    <h1 style= "font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;"
                                    >723 N Wall Street</h1>
                                    <h1 style= "font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;"
                                    >Calhoun, GA 30701</h1>
                                    <h1 style= "font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;"
                                    >Cell: 706-263-0175</h1>
                                    <h1 style= "font-family: 'Moveo Sans w00 Regular', Arial, Helvetica, sans-serif;">Website: <a href="http://www.trafficbarriersolutions.com">www.trafficbarriersolutions.com</a></h1>
                                </div>
                                </div>
                                </form>
                                </body>
                    </html>`,
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
                    message: 'Website Request submitted successfully',
                    newUser: newUser // Include the newUser object in the response
                };
        
                res.status(201).json(response);
        
            } catch (error) {
                console.error('Error submitting Website Request:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        
        module.exports = {
            submitWeb
        };
