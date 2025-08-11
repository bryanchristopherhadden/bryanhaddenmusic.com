"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SiteCard = ({ title, description, url, icon }: { title: string; description: string; url: string; icon: string }) => {
  return (
    <motion.div
      className="site-card"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={url}>
        <div className="site-icon">{icon}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="visit-arrow">→</div>
      </Link>
    </motion.div>
  );
};

export default function Home(): JSX.Element {
  return (
    <main className="homepage">
      <div className="homepage-content">
        <motion.div
          className="homepage-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Hi I'm Bryan Hadden</h1>
          <p>Please checkout some of the stuff I've made.</p>
        </motion.div>
        
        <motion.div
          className="site-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SiteCard
            title="Music"
            description="Music production, beats, and creative collaborations"
            url="/music"
            icon="🎵"
          />
          
          <SiteCard
            title="Tech"
            description="Full-stack development portfolio and technical projects"
            url="/tech"
            icon="💻"
          />
        </motion.div>
        
        <motion.div
          className="homepage-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>Producer • Developer • Creator</p>
        </motion.div>
      </div>
    </main>
  );
}
