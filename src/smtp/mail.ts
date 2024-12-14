import { Students } from "../types";

export function sendMail(alumniMail:string,studentData:Students,userMail:string) {
    const mailOptions = {
        from: `"Alumni Connect" <formaldehye080@gmail.com>`,
        to: alumniMail,
        subject: `Referral/Guidance Request from ${studentData.Name}`,
        html: `
             <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #1a365d;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        border-radius: 8px 8px 0 0;
                    }
                    .content {
                        background-color: #ffffff;
                        padding: 30px;
                        border: 1px solid #e2e8f0;
                        border-radius: 0 0 8px 8px;
                    }
                    .student-info {
                        background-color: #f8fafc;
                        padding: 20px;
                        border-radius: 6px;
                        margin: 20px 0;
                    }
                    .info-item {
                        margin: 10px 0;
                        padding: 8px 0;
                        border-bottom: 1px solid #e2e8f0;
                    }
                    .info-label {
                        font-weight: bold;
                        color: #1a365d;
                        width: 120px;
                        display: inline-block;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #89CFF0;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        margin: 10px 0;
                        text: black;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e2e8f0;
                        color: #64748b;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1>Alumni Connection Request</h1>
                    </div>
                    <div class="content">
                        <p>Dear Alumnus,</p>
                        
                        <p>I hope this email finds you well. A current student from your college has reached out seeking guidance and mentorship. They believe your experience and insights would be invaluable to their professional journey.</p>
                        
                        <div class="student-info">
                            <h2 style="color: #1a365d; margin-bottom: 20px;">Student Details</h2>
                            <div class="info-item">
                                <span class="info-label">Name:</span>
                                ${studentData.Name}
                            </div>
                            <div class="info-item">
                                <span class="info-label">Roll Number:</span>
                                ${studentData.RollNo}
                            </div>
                            <div class="info-item">
                                <span class="info-label">Branch:</span>
                                ${studentData.Branch}
                            </div>
                            <div class="info-item">
                                <span class="info-label">Batch:</span>
                                ${studentData.Batch}
                            </div>
                            <div class="info-item">
                                <span class="info-label">Email:</span>
                                <a href="mailto:${userMail}" style="color: #2563eb;">${userMail}</a>
                            </div>
                            <div class="info-item">
                                <span class="info-label">LinkedIn:</span>
                                <a href="${studentData.LinkedIn}" style="color: #2563eb;">View Profile</a>
                            </div>
                        </div>

                        <p>To help you learn more about the student's background and aspirations, you can review their credentials:</p>
                        
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${studentData.Resume}" class="button">View Resume</a>
                        </div>

                        <p>Your guidance could make a significant difference in shaping this student's career path. If you're able to spare some time for mentorship or provide industry insights, please feel free to reach out to the student directly.</p>

                        <p>Thank you for considering this request and for being a valuable member of our alumni community.</p>

                        <div class="footer">
                            <p>Best regards,<br>AlumniConnect Team</p>
                            <p style="font-size: 12px; color: #94a3b8;">This email was sent through the official Alumni Connect. If you want to stop the mail contact here</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `,
    };
    return mailOptions;
}
