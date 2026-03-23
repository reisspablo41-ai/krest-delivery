import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Extract form data from the request
    const { firstName, lastName, email, phone, message } = await req.json();

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_123456789') {
      console.warn('Email notifications skipped: RESEND_API_KEY not configured in .env');
      return new Response(JSON.stringify({ success: true, skipped: true }), { status: 200 });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Krest Delivery <support@krestdelivery.com>',
      to: 'support@krestdelivery.com',
      replyTo: email,
      subject: `New Priority Inquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1e2d21; padding: 30px; text-align: center;">
            <img src="https://fwlquslzwqlklvrjzopa.supabase.co/storage/v1/object/public/krest-storage/log.png" alt="Krest Delivery" height="40">
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1e2d21; margin-top: 0;">New Contact Form Submission</h2>
            <p style="color: #4a5568; line-height: 1.6;">You have received a new message through the Krest Delivery contact form.</p>
            <table width="100%" style="border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #718096; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #1e2d21; font-weight: 600;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #718096;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #1e2d21; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #718096;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #1e2d21; font-weight: 600;">${phone}</td>
              </tr>
            </table>
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; color: #4a5568; line-height: 1.6;">
              <strong>Message:</strong><br>
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
            &copy; 2026 Krest Delivery Global Logistics
          </div>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Response on success
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully!', id: data.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Response on failure
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send email' }),
      { status: 500 }
    );
  }
}
