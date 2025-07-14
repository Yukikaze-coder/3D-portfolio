# EmailJS Setup Instructions

To enable your contact form to send emails to `morandinilouis@gmail.com`, follow these steps:

## 1. Create an EmailJS Account
- Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account.
- Verify your email address.

## 2. Add an Email Service
- In the EmailJS dashboard, go to **Email Services**.
- Click **Add New Service** and select your email provider (e.g., Gmail).
- Follow the instructions to connect your email account.
- Note your **Service ID** (e.g., `service_xxxxxxx`).

## 3. Create an Email Template
- Go to **Email Templates** in the dashboard.
- Click **Create New Template**.
- Add variables for `from_name`, `from_email`, and `message`.
- Example template:

```
Subject: Portfolio Contact Message

Name: {{from_name}}
Email: {{from_email}}
Message:
{{message}}
```
- Save and note your **Template ID** (e.g., `template_xxxxxxx`).

## 4. Get Your Public Key
- Go to **Account** > **API Keys** in EmailJS.
- Copy your **Public Key** (e.g., `xxxxxxxxxxxxxxxxx`).

## 5. Update Your Code
- In your contact form code, replace the placeholders with your actual values:

```js
import emailjs from '@emailjs/browser';

emailjs.send(
  process.env.VITE_EMAILJS_SERVICE_ID,
  'your_template_id',
  {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  },
  process.env.VITE_EMAILJS_PUBLIC_KEY
);
```

## 6. Test the Form
- Start your development server (`npm run dev`).
- Open the contact form, fill it out, and submit.
- Check your email inbox for the message.

## 7. Security & Best Practices
- Do **not** commit your EmailJS credentials to public repositories.
- The free plan has monthly limits (200 emails/month).
- For production, consider using environment variables for credentials.
- Never commit your `.env` file to public repositories.
- Your private key should **never** be used in frontend code or committed anywhere.
- Only use the public key in your frontend code.

## 8. Update `.gitignore`
Add this line if not present:
```
.env
```

## 9. Next steps
- Create your template in EmailJS and copy its ID.
- Test your contact form.
- All messages will be sent securely using your EmailJS service.

---

If you need more help, visit the [EmailJS Docs](https://www.emailjs.com/docs/).