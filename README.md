# My Personal Resume

A clean, minimal resume website built with Next.js, Tailwind CSS, and Shadcn UI.

## Live Demo & Credits

🌐 Check it out here: **[https://idanci.me](https://idanci.me)**

- [Tedawf](https://github.com/tedawf/tedawf.com) - Original creator of the resume template

## Features

- Minimal design with Shadcn UI
- Light/dark mode toggle
- Contact form with email integration
- Responsive mobile design

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- Vercel (hosting)
- Resend (email)

## Getting Started

```bash
git clone https://github.com/idanci/idanci.me my-resume
cd my-resume
npm install
cp .env.example .env.local
# Add your own API keys to .env.local
npm run dev
```

## Environment Variables

```env
RESEND_API_KEY=your_key
```

## Customization

- Update personal info in `src/data/*.json`
- Add your resume to `public/resume.pdf`

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

## Costs

- Domain: ~$20/year
- Hosting: Free tiers

## License

MIT
