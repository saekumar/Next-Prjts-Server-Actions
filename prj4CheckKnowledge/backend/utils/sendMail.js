import nodemailer from 'nodemailer'

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    auth: {
      user: 'saikumarpuppala249@gmail.com',
      pass: 'eayrowasdgulsnvf',
    },
  })
  const mailOptions = {
    from: 'saikumarpuppala249@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(mailOptions)
}

export default sendMail
