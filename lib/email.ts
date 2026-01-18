import { Resend } from 'resend'

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      console.warn('📧 RESEND_API_KEY not found. Email will be logged only.')
      console.log('📧 Email Details:')
      console.log('To:', data.to)
      console.log('Subject:', data.subject)
      console.log('HTML:', data.html)
      return true // Don't fail the request, just log
    }

    // Send email using Resend
    const { data: result, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [data.to],
      subject: data.subject,
      html: data.html,
      text: data.text,
    })

    if (error) {
      console.error('📧 Email sending failed:', error)
      return false
    }

    console.log('📧 Email sent successfully:', result)
    return true
    
  } catch (error) {
    console.error('📧 Email sending error:', error)
    return false
  }
}

export function formatContactFormEmail(formData: any, formType: string): EmailData {
  const subject = `New ${formType} Submission from ${formData.name || formData.companyName || formData.fullName || 'Unknown'}`
  
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">SAT NOC</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">New ${formType} Submission</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">Submission Details</h2>
  `
  
  // Add form-specific fields
  if (formType === 'Contact Form') {
    html += `
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${formData.name}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${formData.email}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
          ${formData.message}
        </div>
      </div>
    `
  } else if (formType === 'Demo Request') {
    html += `
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${formData.name}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${formData.email}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Phone:</strong> ${formData.phone}</p>
      </div>
    `
  } else if (formType === 'Enterprise Inquiry') {
    html += `
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0; color: #666;"><strong>Company Name:</strong> ${formData.companyName}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${formData.email}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Phone:</strong> ${formData.phone}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Employees:</strong> ${formData.employees}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Challenges:</strong></p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
          ${formData.challenges}
        </div>
      </div>
    `
  } else if (formType === 'Plan Inquiry') {
    html += `
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0; color: #666;"><strong>Plan:</strong> ${formData.planName}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Full Name:</strong> ${formData.fullName}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${formData.email}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Phone:</strong> ${formData.phone}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Location:</strong> ${formData.location}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Yearly Plan:</strong> ${formData.yearlyPlan ? 'Yes' : 'No'}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Number of Systems:</strong> ${formData.noOfSystems || 1}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Duration:</strong> ${formData.months || 1} month(s)</p>
      </div>
    `
  }
  
  html += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            This email was sent from the SAT NOC website.<br>
            Submission time: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  `
  
  return {
    to: 'satmz0001@gmail.com', // Resend trial account - can only send to registered email
    subject,
    html,
    text: `${subject}\n\n${JSON.stringify(formData, null, 2)}`
  }
}
