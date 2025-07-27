# Bryan Hadden Music

A professional music production website showcasing Bryan Hadden's work as a music producer and engineer. The site features an interactive music player, portfolio of produced tracks, and information about music production services.

## 🎵 About

Bryan Hadden is a passionate music producer with over a decade of experience, specializing in helping artists discover and refine their unique sound. His production style blends contemporary techniques with timeless musical principles, creating tracks that feel both fresh and authentic.

### Services
- Music production and engineering
- Sound design and mixing
- Artist development and collaboration
- Multi-genre production (indie rock, electronic, alternative pop, RnB, House, HipHop)

## 🚀 Features

- **Interactive Music Player**: Built-in audio player with playlist functionality
- **Portfolio Showcase**: Collection of produced tracks across various genres
- **Professional Bio**: Detailed background and experience in music production
- **Contact Integration**: Direct email contact for music inquiries
- **Responsive Design**: Optimized for desktop and mobile devices

## 🎼 Music Portfolio

The site features tracks produced by Bryan Hadden, including:
- **Let's Get Even** (Pop, 2025)
- **Uber Black** (House, 2025) 
- **First Class** (House, 2025)
- **Shroomie Girl** (RnB, 2025)
- **Right Back** - Justo (RnB, 2024)
- **Still Waters** - Bre (HipHop, 2025)
- **Pull Up** - Leah Daily (Rap, 2025)
- **Coexist** - IO Music (RnB, 2025)

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: CSS Modules, Emotion (styled-components)
- **UI Components**: Material-UI (MUI)
- **Audio**: HTML5 Audio API with custom player controls
- **Deployment**: Vercel (with analytics)
- **Contact**: EmailJS integration

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd bryanhaddenmusic.com-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
bryanhaddenmusic.com-main/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── tech/              # Technical resume page
│   ├── layout.tsx         # Root layout
│   └── page.js            # Home page
├── components/            # Shared components
├── src/                   # Source files
│   └── components/        # React components
│       └── MusicPlayer.jsx # Custom audio player
├── public/                # Static assets
│   ├── songs/            # Audio files
│   ├── songs.json        # Track metadata
│   └── css/              # External stylesheets
└── package.json          # Dependencies and scripts
```

## 🎯 Key Components

- **MusicPlayer**: Custom React component with play/pause, shuffle, and progress controls
- **Navigation**: Responsive navigation with mobile support
- **StyledComponents**: Reusable styled components using Emotion
- **Email Integration**: Direct mailto links for music inquiries

## 📞 Contact

For music production inquiries:
- **Email**: bryanchrishadden@gmail.com
- **Phone**: (678) 459-8384

## 🎨 Design Philosophy

The site embodies Bryan's production philosophy: "Let's make your music sound more like you." The design focuses on authenticity and collaboration, reflecting the personalized approach to music production.

---

*Built with Next.js and React • Deployed on Vercel*
