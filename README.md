# Bryan Hadden: Lead Full-Stack Engineer and Music Producer

This is the source for my personal site, which I designed, built, and run myself. It combines my engineering portfolio with a music store where visitors can listen to tracks and buy beats.

**Live site:** [bryanhaddenmusic.com](https://bryanhaddenmusic.com) | **Engineering portfolio:** [/tech](https://bryanhaddenmusic.com/tech) | **Music:** [/music](https://bryanhaddenmusic.com/music)

## About me

I'm a Lead Full-Stack Engineer based in Atlanta with 8+ years of experience building web and mobile applications, mostly with React and Node. I've worked with teams at Bed Bath & Beyond, SiteOne Landscape, NCR, Porsche, Home Depot, Salesforce, Disney, and Chick-fil-A.

Most of that code is private, so this repo is the best public example of how I work end to end. Some results from those roles:

- **Bed Bath & Beyond:** cut API response times by 40% by implementing GraphQL Federation for a React Native app.
- **SiteOne Landscape:** raised checkout conversion by 5.5% and cut checkout time by 15%.
- **NCR:** led a React/Next.js documentation platform of 50K+ pages for clients including Walmart and Starbucks.
- **Porsche:** architected a real-time vessel tracking application covering €3B+ in product.

The full details are in my [resume](apps/main/public/bryan-hadden-resume-2025.pdf).

## What I built here

- **Two experiences in one app:** a shared Next.js codebase serves both the engineering portfolio and the music site.
- **Music store:** includes a custom audio player, a cart, and Stripe checkout.
- **Digital delivery:** after purchase, customers get emailed download links that expire after 24 hours.
- **Contact form:** messages go through a server-side API route using Nodemailer.
- **Analytics:** Vercel Analytics and Speed Insights, Google Analytics 4, and Google Ads conversion tracking.
- **Pre-deploy checks:** a custom Git hook runs linting, type checks, and a production build before each commit, catching deployment failures before they reach Vercel.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | React, Next.js 15 (App Router), TypeScript, Mantine, styled-components, Framer Motion |
| Backend | Next.js API routes, Node.js |
| Integrations | Stripe, Nodemailer |
| Infrastructure | Vercel, npm workspaces monorepo |
| Analytics | Vercel Analytics, Speed Insights, Google Analytics 4 |

## Run it locally

You'll need Node.js 18 or later.

```bash
git clone https://github.com/bryanchristopherhadden/bryanhaddenmusic.com.git
cd bryanhaddenmusic.com
npm install
npm run dev
```

The site runs at `http://localhost:3000`. Checkout and email need their own Stripe and email credentials set as environment variables.

## Contact

I'm happy to talk about engineering roles or the work behind this site.

- **LinkedIn:** [linkedin.com/in/bryanhadden](https://www.linkedin.com/in/bryanhadden)
- **Email:** [bryanchrishadden@gmail.com](mailto:bryanchrishadden@gmail.com)

## License

[MIT](LICENSE)
