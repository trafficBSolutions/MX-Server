const axios = require('axios');

const verifyCaptcha = async (req, res, next) => {
  const token = req.body.captchaToken;
  if (!token) {
    return res.status(400).json({ error: 'reCAPTCHA token is missing.' });
  }
  try {
    const response = await axios.post('https://recaptchaenterprise.googleapis.com/v1/projects/tidy-simplicity-375615/assessments?key=RECAPTCHA_SECRET_KEY', null, {
      params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: token }
    });
    if (response.data.success) {
      return next();
    }
    return res.status(400).json({ error: 'reCAPTCHA verification failed.' });
  } catch (err) {
    console.error('reCAPTCHA verification error:', err);
    return res.status(500).json({ error: 'reCAPTCHA verification error.' });
  }
};

module.exports = verifyCaptcha;
