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

    // Simple replacement logic for the admin memo
    // We replace the specific "Shipment Confirmed" header and main content block
    const formattedContent = content.replace(/\n/g, '<br>');
    
    const headerTitle = category === 'pets' ? 'Pet Care Update' : 'Shipment Update';
    
    // Inject custom content into the template
    // We'll replace the entire main <div> content for flexibility
    const contentToInject = `
      <h1>${headerTitle}</h1>
      <div style="font-size: 16px; line-height: 1.8; color: #334155; margin-bottom: 30px;">
        ${formattedContent}
      </div>
      <center>
        <a href="https://hussgrouptransportcourier.com" class="button">Visit Our Website</a>
      </center>
    `;

    // Regex to select the main content area (from <h1> to before <p style="font-size: 14px">)
    const finalHtml = html.replace(
      /<div class="content">[\s\S]*?<p style="font-size: 14px;/,
      `<div class="content">${contentToInject}<p style="font-size: 14px;`
    );

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
