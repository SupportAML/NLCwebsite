import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'info@neurolegalconsulting.com';
const CC_EMAIL = 'support@apexmedlaw.com';
const FROM_EMAIL = 'NLC Website <noreply@apexmedlaw.com>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const {
    firstName, lastName, lawFirm, email, phone,
    caseTypes, otherCaseType, specialties,
    urgentDeadline, deadlineDetails, caseDetails,
  } = req.body;

  if (!firstName || !lastName || !lawFirm || !email || !caseDetails || !urgentDeadline) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const caseTypeDisplay = caseTypes && caseTypes.length > 0
    ? caseTypes.map((t: string) => t === 'Other' && otherCaseType ? `Other: ${otherCaseType}` : t).join(', ')
    : 'Not specified';

  const specialtyDisplay = specialties && specialties.length > 0
    ? specialties.join(', ')
    : 'Not specified';

  const urgentDisplay = urgentDeadline === 'yes'
    ? `⚠️ YES${deadlineDetails ? ` — ${deadlineDetails}` : ''}`
    : 'No';

  const subjectPrefix = urgentDeadline === 'yes' ? '🔴 URGENT: ' : '';

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
        cc: [CC_EMAIL],
        reply_to: email,
        subject: `${subjectPrefix}New Case Inquiry from ${firstName} ${lastName} — ${lawFirm}`,
        html: `
          <h2>New Case Inquiry</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee; width: 160px;">Name</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Law Firm</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${lawFirm}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Case Type</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${caseTypeDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Specialty Needed</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${specialtyDisplay}</td>
            </tr>
            <tr style="background: ${urgentDeadline === 'yes' ? '#FEF3C7' : 'transparent'};">
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Urgent Deadline</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${urgentDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Case Details</td>
              <td style="padding: 8px 12px;">${caseDetails.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
