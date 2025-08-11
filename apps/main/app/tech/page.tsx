"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TechPage(): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <main>
      <div className="column">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Full Stack Developer</h1>
          <p>
            Building modern web applications with React, Node.js, and TypeScript.
          </p>
          <p>
            Passionate about creating efficient, scalable, and user-friendly solutions.
          </p>
          
          <div style={{ marginTop: "40px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/tech/portfolio" className="btn btn-custom">
              View Portfolio
            </Link>
            <Link href="/tech/resume" className="btn btn-custom">
              View Resume
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}