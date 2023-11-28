import { generate } from 'otp-generator';
import { getEmailHTML, EmailSubjects, EmailTemplates } from './html-templates';
// import Mailgun from 'mailgun.js';
// import formData from 'form-data';
// import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { Resend } from 'resend';

// const MAILGUN_KEY = process.env.MAILGUN_KEY || 'anymailgunparameter';

const { RESEND_KEY } = process.env;
// const mailerSend = new MailerSend({
//   apiKey: process.env.MAILER_KEY!,
// });

// const mailgun = new Mailgun(formData);
// const DOMAIN = 'partiaf-api.xyz';
// const mg = mailgun.client({
//   username: 'PARTIAF',
//   key: MAILGUN_KEY,
// });
const resend = new Resend(RESEND_KEY!);


type EmailTemplateType = 'verification' | 'changePassword' | 'resetPassword' | 'created';

export const sendEmail = async (data: any, templateType: EmailTemplateType, generateCode: boolean) => {
  const htmlTemplate = EmailTemplates[templateType];

  const code = generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });

  console.log({code})

  const html = getEmailHTML(htmlTemplate, code);

  const messageData = {
    from: 'noreply@triquicoin.com',
    to: data.email,
    subject: EmailSubjects[templateType],
    text: EmailSubjects[templateType],
    html: html
  };
  // const sentFrom = new Sender(messageData.from, "Joobs");
  // const recipients = [
  //   new Recipient(data.email, "")
  // ];

  try {
    // mg.messages.create(DOMAIN, messageData).then(res => {
    //   console.log(res);
    // }).catch(error => {
    //   console.log(error);
    // });



const info = await resend.emails.send({
  from: messageData.from,
  to: messageData.to,
  subject: messageData.subject,
  html: messageData.html
});
    // const emailParams = new EmailParams()
    // .setFrom(sentFrom)
    // .setTo(recipients)
    // .setReplyTo(sentFrom)
    // .setSubject(messageData.subject)
    // .setHtml(messageData.html)
    // .setText(messageData.text);
  
    // const info = await mailerSend.email.send(emailParams);
    console.log(info);
    return generateCode ? code : undefined;
  } catch (error: any) {
    console.log(error);
      throw new Error(error.message);
  }
} 

export const sendEmailCreatedWork = async (data: any, templateType: EmailTemplateType) => {
  const htmlTemplate = EmailTemplates[templateType];

  const html = getEmailHTML(htmlTemplate, data.title);

  const messageData = {
    from: 'noreply@triquicoin.com',
    to: data.email,
    subject: EmailSubjects[templateType],
    text: EmailSubjects[templateType],
    html: html
  };
  // const sentFrom = new Sender(messageData.from, "Joobs");
  // const recipients = [
  //   new Recipient(data.email, "")
  // ];

  try {
    // mg.messages.create(DOMAIN, messageData).then(res => {
    //   console.log(res);
    // }).catch(error => {
    //   console.log(error);
    // });



const info = await resend.emails.send({
  from: messageData.from,
  to: messageData.to,
  subject: messageData.subject,
  html: messageData.html
});
    // const emailParams = new EmailParams()
    // .setFrom(sentFrom)
    // .setTo(recipients)
    // .setReplyTo(sentFrom)
    // .setSubject(messageData.subject)
    // .setHtml(messageData.html)
    // .setText(messageData.text);
  
    // const info = await mailerSend.email.send(emailParams);
    console.log(info);
    return 'Succesfully sent';
  } catch (error: any) {
    console.log(error);
      throw new Error(error.message);
  }
} 