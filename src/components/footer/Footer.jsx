import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>ElucG</div>
      <div className={styles.text}>
        ElucG's Thesis Project for Fudan University © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;