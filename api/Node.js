import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Gasthaus Alt Grieth <info@altgrieth.de>',
  to: data.email,
  subject: 'Bestätigung Ihrer Reservierung',
  html: `...zelfde HTML als hierboven...`
});
