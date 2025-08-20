# Bryan Hadden | Choose Your Journey

A modern, interactive portfolio website showcasing Bryan Hadden's dual expertise in music production and full-stack development. Built with Next.js 15 and featuring a unique dual-experience design.

## 🌟 Features

### 🎵 Music Experience
- **Interactive Music Player**: Custom-built music player with full controls
- **Original Productions**: Featuring tracks across multiple genres (Pop, House, RnB, Hip-Hop, Rap)
- **Artist Collaborations**: Showcasing work with various artists including Justo, Bre, Leah Daily, and IO Music
- **Dynamic Playlist**: JSON-driven song management with metadata

### 💻 Tech Portfolio
- **Project Showcases**: Detailed presentations of technical projects
- **Video Demonstrations**: Embedded project videos and prototypes
- **Professional Resume**: Downloadable PDF resume
- **Responsive Design**: Optimized for all devices

### 🚀 Technical Features
- **Performance Monitoring**: Integrated Vercel Analytics and Speed Insights
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Modern UI**: Material-UI components with custom styling
- **Email Integration**: Contact functionality via EmailJS
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.1** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript** - Type safety
- **Styled Components 6.1.0** - CSS-in-JS styling
- **Material-UI 5.14.8** - Component library
- **Framer Motion 12.23.9** - Animation library

### Integrations
- **Vercel Analytics** - User analytics
- **Vercel Speed Insights** - Performance monitoring
- **EmailJS** - Contact form functionality
- **React Player** - Video playback

### Development
- **ESLint** - Code linting
- **Node.js >=18.0.0** - Runtime requirement

## 📁 Project Structure

```
bryanhaddenmusic.com/
├── apps/
│   └── main/                 # Main Next.js application
│       ├── app/
│       │   ├── components/   # Shared components
│       │   ├── music/        # Music experience
│       │   ├── tech/         # Tech portfolio
│       │   └── layout.tsx    # Root layout
│       ├── public/
│       │   ├── songs/        # Music files
│       │   ├── videos/       # Project demos
│       │   └── songs.json    # Music metadata
│       └── package.json
├── packages/
│   └── shared/               # Shared components library
└── package.json              # Monorepo configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bryanhaddenmusic.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎵 Music Section

The music experience features:

- **8 Original Tracks** across multiple genres
- **Interactive Player** with play/pause, seek, and volume controls
- **Artist Collaborations** with detailed track information
- **Dynamic Loading** from JSON configuration

### Featured Tracks
- **Let's Get Even** - Pop (2025)
- **Uber Black** - House (2025)
- **First Class** - House (2025)
- **Shroomie Girl** - RnB (2025)
- **Right Back** - RnB collaboration with Justo (2024)
- **Still Waters** - Hip-Hop collaboration with Bre (2025)
- **Pull Up** - Rap collaboration with Leah Daily (2025)
- **Coexist** - RnB collaboration with IO Music (2025)

## 💻 Tech Portfolio

The tech section showcases:

- **Full-Stack Projects** with detailed case studies
- **Video Demonstrations** of applications in action
- **Professional Experience** and skills overview
- **Contact Information** with direct email integration

### Featured Projects
- **Vessel Tracker Application**
- **Entry Management System**
- **Internal Framework Development**
- **Prototype Development**

## 🔧 Configuration

### Environment Variables
The application uses Vercel's built-in analytics and speed insights, which work automatically when deployed to Vercel.

### Customization
- Update `songs.json` to modify the music playlist
- Modify components in `app/components/` for UI changes
- Add new projects in `app/tech/components/projects/`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes and orientations

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure build settings (auto-detected for Next.js)
3. Deploy with integrated analytics and speed insights

### Manual Deployment
```bash
npm run build
npm run start
```

## 📈 Performance

- **Speed Insights**: Integrated Vercel Speed Insights for Core Web Vitals monitoring
- **Analytics**: User behavior tracking with Vercel Analytics
- **Optimized Images**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

## 🤝 Contributing

This is a personal portfolio project. For suggestions or feedback, please reach out through the contact form on the website.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Bryan Hadden**
- Website: [bryanhaddenmusic.com](https://bryanhaddenmusic.com)
- Portfolio: Music Producer & Full-Stack Developer

---

*Built with ❤️ using Next.js, React, and modern web technologies*
