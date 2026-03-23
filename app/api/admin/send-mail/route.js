import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { to, subject, content, category } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.warn('Email dispatch skipped: RESEND_API_KEY missing');
      return new Response(JSON.stringify({ success: true, skipped: true }), { status: 200 });
    }

    // Load base template
    const templatePath = path.join(process.cwd(), 'app/admin/templates/confirmation_email.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    const formattedContent = content.replace(/\n/g, '<br>');
    const headerTitle = category === 'pets' ? 'Pet Care Update' : 'Shipment Update';

    const contentToInject = `
          <tr>
            <td style="padding:48px 48px 32px;">
              <span style="display:inline-block;padding:6px 14px;background-color:rgba(30, 45, 33, 0.05);color:#1e2d21;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-radius:100px;margin-bottom:20px;">Official Notification</span>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:800;color:#1e2d21;line-height:1.2;letter-spacing:-0.02em;">${headerTitle}</h1>
              <div style="font-size:16px;line-height:1.7;color:#4a5568;margin-bottom:32px;">${formattedContent}</div>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#1e2d21;border-radius:10px;">
                          <a href="https://hussgrouptransportcourier.com" target="_blank" style="display:inline-block;padding:18px 40px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.5px;">Visit Our Website &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="text-align:center;font-size:14px;color:#94a3b8;margin-top:24px;">
                Need help? <a href="mailto:support@krestdelivery.com" style="color:#1e2d21;font-weight:600;text-decoration:none;">Contact Support</a>
              </p>
            </td>
          </tr>`;

    const finalHtml = html.replace('<!-- CONTENT_PLACEHOLDER -->', contentToInject);

    const { data, error } = await resend.emails.send({
      from: 'Krest Delivery <support@krestdelivery.com>',
      to: to,
      subject: subject,
      html: finalHtml,
      replyTo: 'support@krestdelivery.com'
    });

    if (error) throw new Error(error.message);

    return new Response(JSON.stringify({ success: true, id: data.id }), { status: 200 });
  } catch (error) {
    console.error('Admin Mail Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to dispatch email' }), { status: 500 });
  }
}
