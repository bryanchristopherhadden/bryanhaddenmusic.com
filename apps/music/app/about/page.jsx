import React from "react";
import Image from "next/image";
import styles from "./style.module.css"; // Importing a CSS module

const AboutPage = () => {
  return (
    <main>
      <div className="container">
        <div className="section-title"></div>
        <div className="row">
          <div className="bio-image">
            <div className={styles.imageContainer}>
              <Image
                priority={true}
                src="/me2.jpeg"
                alt="Bryan Hadden"
                width={100}
                height={100}
                sizes="(max-width: 900px) 300px, 100%"
                className={styles.image}
              />
            </div>
          </div>
          <div className="bio-blerb">
            <p>
              As a passionate music producer with over a decade of experience, I
              specialize in helping artists discover and refine their unique
              sound. My production style blends contemporary techniques with
              timeless musical principles, creating tracks that feel both fresh
              and authentic.
            </p>
            <p>
              I've worked across multiple genres including indie rock,
              electronic, and alternative pop, always focusing on bringing out
              the artist's vision rather than imposing my own. My studio is
              equipped with both vintage and cutting-edge equipment, allowing
              for a wide range of sonic possibilities.
            </p>
            <p
              style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "20px" }}
            >
              Whether you're recording your first EP or looking to evolve your
              established sound, I'm committed to creating a collaborative
              environment where your music can truly shine. My philosophy is
              simple: make your music sound more like you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
