import React from "react";
import styles from "./style.module.css";

const TechPage = () => {
  return (
    <main className={styles.techPage}>
      <div className="container">
        {/* <div className="section-title">
          <h2>Technical Resume</h2>
        </div> */}
        <div className={styles.resumeContainer}>
          {/* Header Section */}
          <div className={styles.header}>
            <h1 className={styles.name}>Bryan Hadden</h1>
            <p className={styles.title}>Lead & Sr Engineer</p>
            <div className={styles.contact}>
              <span>📱 (678) 459-8384</span>
              <span>📧 bryanchrishadden@gmail.com</span>
              <span>🔗 SiteOne • Salesforce Plus • NCR • Chik-Fil-A • RoomsToGo</span>
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Professional Experience</h3>
            
            <div className={styles.experience}>
              <div className={styles.jobHeader}>
                <h4 className={styles.jobTitle}>Lead Engineer</h4>
                <span className={styles.company}>SiteOne Landscape</span>
                <span className={styles.dates}>August 2023 - Present</span>
              </div>
              <ul className={styles.achievements}>
                <li>Lead and mentor a team of 15 & own complex frontend features, like React app integration with customer data, complex higher order React/NextJS components and customer security/standards</li>
                <li>Simplified checkout process by building custom React dropdown for address management, reducing queue time by 30% and speeding checkout by 15%</li>
                <li>Responsible for researching high impact & low time investment technical solutions, meeting with Directors of Product & Technology to improve feature delivery</li>
              </ul>
              <div className={styles.techStack}>Tech Stack: NextJS, React, React Query, Frontend Tokens, Node, TypeScript, Java, MicroServices</div>
            </div>

            <div className={styles.experience}>
              <div className={styles.jobHeader}>
                <h4 className={styles.jobTitle}>Lead Engineer</h4>
                <span className={styles.company}>NCR</span>
                <span className={styles.dates}>February 2021 - August 2023</span>
              </div>
              <ul className={styles.achievements}>
                <li>Owned team UI development, hands on with web applications, client/frontend state management, backend state management, Frontend React controllers and utils</li>
                <li>Lead developer for NCR documentation initiative, maintaining 50K+ pages of frontend content via React, Vanilla JavaScript and NextJS for top clients like Walmart & Starbucks</li>
                <li>Owned technical guidelines, specifications, testing-strategies, and roadmaps for the initiative</li>
              </ul>
              <div className={styles.techStack}>Tech Stack: NextJS, Azure, Github Actions, Canary Deployment, Node, MicroServices, Docker</div>
            </div>

            <div className={styles.experience}>
              <div className={styles.jobHeader}>
                <h4 className={styles.jobTitle}>Sr React Developer</h4>
                <span className={styles.company}>Freelancer</span>
                <span className={styles.dates}>December 2019 - February 2021</span>
              </div>
              
              <div className={styles.freelanceProject}>
                <h5>Salesforce</h5>
                <ul className={styles.achievements}>
                  <li>Rebuilt Featured Episode/Original Series for Salesforce Plus in Salesforce Web Components</li>
                  <li>One of 3 Srs in a team of 30; Daily mentoring, pairing & code reviews</li>
                </ul>
                <div className={styles.techStack}>Tech Stack: GCP, React, Redux, Gitlab, Yarn, Charles (Reverse Proxies), Jest</div>
              </div>

              <div className={styles.freelanceProject}>
                <h5>Disney</h5>
                <ul className={styles.achievements}>
                  <li>Owned Frontend security application with company-wide impact, Lucas Films, Parks, Pixar etc.</li>
                  <li>Used jQuery and Vanilla JavaScript to build entire suite of applications</li>
                  <li>Skilled up on Python on the job; Owned AWS implementation for the app</li>
                </ul>
                <div className={styles.techStack}>Tech Stack: Azure, Python, Django, Gitlab, Node</div>
              </div>

              <div className={styles.freelanceProject}>
                <h5>Chick-Fil-A</h5>
                <ul className={styles.achievements}>
                  <li>In first two months took ownership of and delivered favorites React feature which makes up about 1/3rd of current app</li>
                  <li>Launched new CFA web app nationally & internationally</li>
                  <li>Collaborated with Business, UX and Product to implement efficient design patterns</li>
                </ul>
                <div className={styles.techStack}>Tech Stack: React, Redux, Gitlab, Yarn, Charles (Reverse Proxies), Jest</div>
              </div>

              <div className={styles.freelanceProject}>
                <h5>RoomsToGo</h5>
                <ul className={styles.achievements}>
                  <li>Re-engineered e-commerce site with millions in sales per day into React App</li>
                  <li>Helped lead diverse team of 30+; Successfully rebuilt checkout flow for RoomsToGo.com</li>
                </ul>
                <div className={styles.techStack}>Tech Stack: React, Gatsby, GraphQL, AWS, React Native</div>
              </div>
            </div>

            <div className={styles.experience}>
              <div className={styles.jobHeader}>
                <h4 className={styles.jobTitle}>Lead Engineer</h4>
                <span className={styles.company}>Porsche</span>
                <span className={styles.dates}>September 2018 – December 2019</span>
              </div>
              <ul className={styles.achievements}>
                <li>Owned Amazon Web Services like EC2, AWS Identity and access management</li>
                <li>Architected vessel tracking application which tracked & provided insights for 3billion+ euros of product</li>
                <li>Owned app with 100+ users including shipping/port managers to middle management and C-Suite</li>
                <li>Co-designed & Implemented GraphQL/Hasura/Node back-end solution for large ride sharing company</li>
              </ul>
              <div className={styles.techStack}>Tech Stack: AWS, GCP, React, Node, Python, MongoDB, Angular, Jenkins, GraphQL (FE and BE)</div>
            </div>

            <div className={styles.experience}>
              <div className={styles.jobHeader}>
                <h4 className={styles.jobTitle}>Frontend & Designer</h4>
                <span className={styles.company}>Home Depot</span>
                <span className={styles.dates}>May 2017 – September 2018</span>
              </div>
              <ul className={styles.achievements}>
                <li>Joined as UXer, took initiative to add development to skill set when opportunity arose</li>
                <li>Implemented and maintained several EC2 instances for internal sites via PHP, SSH-ing into virtual machine instance</li>
                <li>Maintained internal framework with Vanilla JavaScript, Angular & React for several thousand developers and several hundred designers</li>
              </ul>
              <div className={styles.techStack}>Tech Stack: GCP, React, Angular, Vanilla JavaScript, jQuery, Node, PHP</div>
            </div>
          </div>

          {/* Education Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Education/Training/Certifications</h3>
            <div className={styles.education}>
              <div className={styles.degreeHeader}>
                <h4 className={styles.degree}>Foundations of Science Engineering</h4>
                <span className={styles.school}>MIT</span>
                <span className={styles.graduation}>Jan - May 2017</span>
              </div>
            </div>
            <div className={styles.education}>
              <div className={styles.degreeHeader}>
                <h4 className={styles.degree}>Business Administration</h4>
                <span className={styles.school}>Winston Salem State University</span>
                <span className={styles.graduation}>May 2006 – December 2010</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TechPage; 