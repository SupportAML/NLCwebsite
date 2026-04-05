import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'support@apexmedlaw.com';
const FROM_EMAIL = 'NLC Website <noreply@updates.apexmedlaw.com>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const {
    firstName, lastName, email, phone,
    specialty, otherSpecialty,
    boardCertifications, licensedStates,
    yearsExperience, currentInstitution, bio,
    cvBase64, cvFilename, cvContentType,
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !specialty || !boardCertifications || !currentInstitution || !yearsExperience) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const displaySpecialty = specialty === 'Other' ? (otherSpecialty || 'Other') : specialty;

  const attachments = [];
  if (cvBase64 && cvFilename) {
    attachments.push({
      filename: cvFilename,
      content: cvBase64,
      type: cvContentType || 'application/pdf',
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Physician Application: ${firstName} ${lastName}, ${displaySpecialty}`,
        html: `
          <h2>New Physician Expert Witness Application</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee; width: 180px;">Name</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Specialty</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${displaySpecialty}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Board Certifications</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${boardCertifications}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Years of Experience</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${yearsExperience}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Current Institution</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${currentInstitution}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Licensed States</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${licensedStates || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Professional Bio</td>
              <td style="padding: 8px 12px;">${bio ? bio.replace(/\n/g, '<br>') : 'Not provided'}</td>
            </tr>
          </table>
          ${cvFilename ? `<p style="margin-top: 16px; color: #666;">📎 CV attached: ${cvFilename}</p>` : ''}
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">This application was submitted via the NLC website physician sign-up form.</p>
        `,
        attachments,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Send confirmation email to applicant
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        cc: [TO_EMAIL],
        subject: 'Application Received — Neurology Legal Consulting',
        html: `
          <h2>Thank You for Your Application</h2>
          <p>Dear Dr. ${lastName},</p>
          <p>We've received your application to join the Neurology Legal Consulting expert witness team. Our team will review your credentials and experience, and we'll be in touch within 2–3 business days.</p>
          <p>If you have any questions in the meantime, please reply to this email or call us at <strong>(919) 307-7949</strong>.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Neurology Legal Consulting</strong><br>
          <a href="https://neurolegalconsulting.com">neurolegalconsulting.com</a></p>
        `,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
