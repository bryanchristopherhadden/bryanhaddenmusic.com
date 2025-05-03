import React from "react";
import Image from "next/image";
import styles from "./style.module.css"; // Importing a CSS module

const AboutPage = () => {
  return (
    <main>
      <div
        className="container"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div className="section-title">
          <h2>About Me</h2>
        </div>
        <div className="row">
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className={styles.imageContainer} // Use the CSS module class
              style={{
                height: "220px",
                position: "relative",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <Image
                width={0}
                height={0}
                sizes="100%"
                src="/me.jpeg"
                alt="Bryan Hadden"
                layout="responsive"
                className={styles.image} // Use the CSS module class
              />
            </div>
          </div>
          <div className="col-md-6">
            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
              As a passionate music producer with over a decade of experience, I
              specialize in helping artists discover and refine their unique
              sound. My production style blends contemporary techniques with
              timeless musical principles, creating tracks that feel both fresh
              and authentic.
            </p>
            <p
              style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "20px" }}
            >
              I’ve worked across multiple genres including indie rock,
              electronic, and alternative pop, always focusing on bringing out
              the artist’s vision rather than imposing my own. My studio is
              equipped with both vintage and cutting-edge equipment, allowing
              for a wide range of sonic possibilities.
            </p>
            <p
              style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "20px" }}
            >
              Whether you’re recording your first EP or looking to evolve your
              established sound, I’m committed to creating a collaborative
              environment where your music can truly shine. My philosophy is
              simple: make your music more like you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
