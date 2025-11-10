# DIMCPrep - Online Question Bank Platform

DIMCPrep is an online learning platform specifically designed for healthcare professionals preparing for the Diploma in Immediate Care (DIMC) examination. Built with Next.js 15 and modern web technologies.

## Features

- 800+ Expert Questions
- 3 Full Mock Exams
- Progress Tracking Dashboard
- Performance Analytics
- Mobile Responsive Design
- Real-time Updates
- Secure Authentication

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication:** Firebase
- **Payment Processing:** Stripe
- **Charts:** Chart.js
- **UI Components:** React Icons, Framer Motion
- **Form Handling:** React Hook Form

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
NEXT_PUBLIC_URL=your_api_url
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
  ├── app/              # App router pages
  ├── assets/           # Static assets
  ├── components/       # React components
  ├── fonts/           # Custom fonts
  ├── lib/             # External libraries setup
  └── redux/           # Redux store and slices
```

## Build & Deployment

To build the project:

```bash
npm run build
# or
pnpm build
```

The project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is proprietary software. All rights reserved.

## Support

For support queries, contact us at info@dimcprep.com