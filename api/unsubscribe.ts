import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://hdfzveivvakqnbnasbuj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_NlLrEZ8zhcIFCWEEsWgnzg_saXOWEZX';

function maskEmail(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex <= 1) return email;
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex);
  const visible = local[0];
  return `${visible}***${domain}`;
}

function buildPage(email: string | undefined): string {
  const maskedEmail = email ? maskEmail(email) : null;
  const emailLine = maskedEmail
    ? `<p class="sub">The address <strong>${maskedEmail}</strong> has been removed from NLC outreach.</p>`
    : '<p class="sub">Your address has been removed from NLC outreach.</p>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribed — Neurology Legal Consulting</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #F6F7F9;
      color: #0B1A2F;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 24px rgba(11,26,47,0.08);
      max-width: 480px;
      width: 100%;
      padding: 3rem 2.5rem 2.5rem;
      text-align: center;
    }
    .icon {
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 1.25rem;
      color: #3A6EFF;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0B1A2F;
      margin-bottom: 0.75rem;
      letter-spacing: -0.01em;
    }
    .sub {
      font-size: 0.975rem;
      color: #4A5568;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .note {
      font-size: 0.85rem;
      color: #6B7280;
      line-height: 1.5;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #E5E7EB;
    }
    .footer {
      margin-top: 2rem;
      font-size: 0.8rem;
      color: #9CA3AF;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
    .accent { color: #3A6EFF; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#10003;</div>
    <h1>You've been unsubscribed.</h1>
    ${emailLine}
    <p class="note">If this was a mistake, reply to any previous email and we'll restore you to the list.</p>
    <div class="footer">Neurology Legal Consulting</div>
  </div>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const email = typeof req.query.email === 'string' ? req.query.email.trim() : undefined;
  const campaign = typeof req.query.campaign === 'string' ? req.query.campaign.trim() : undefined;
  const userAgent = req.headers['user-agent'] ?? '';
  const referrer = req.headers['referer'] ?? req.headers['referrer'] ?? '';

  // Always return the confirmation page regardless of DB outcome
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (email) {
    try {
      const body: Record<string, unknown> = {
        email,
        source: 'resend',
        user_agent: userAgent,
        referrer,
        raw_query: req.query,
      };
      if (campaign) body.campaign = campaign;

      const sbRes = await fetch(
        `${SUPABASE_URL}/rest/v1/email_unsubscribes`,
        {
          method: 'POST',
          headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(body),
        }
      );

      if (!sbRes.ok) {
        const errText = await sbRes.text();
        console.error('[unsubscribe] Supabase error', sbRes.status, errText);
      }
    } catch (err) {
      console.error('[unsubscribe] fetch error', err);
    }
  }

  return res.status(200).send(buildPage(email));
}
