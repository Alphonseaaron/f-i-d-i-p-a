# FIDIPA Website

## Admin Access Instructions

To access the admin panel:

1. Go to the website URL + '/admin'
2. Use these credentials:
   - Email: admin@fidipa.org
   - Password: (Contact the system administrator for the password)

### Security Notes
- Never share admin credentials
- Always log out after using the admin panel
- Use a secure, private browser session
- Enable 2FA if available

## Deployment Instructions

To deploy the website:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

The site will be deployed to: https://f-i-d-i-p-a.web.app