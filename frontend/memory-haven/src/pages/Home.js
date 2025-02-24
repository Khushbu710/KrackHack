import React from 'react';
import '../index.css';  // Ensure CSS is linked

function Home() {
  return (
    <div>
      <h1>Memory Haven</h1>
      <p>Save your memories today and relive them in the future! 📸✨</p>

      {/* 📖 About Section */}
      <div className="section-box about-box">
        <h2>About Memory Haven</h2>
        <p>
          Memory Haven allows you to store memories, messages, and media capsules that unlock at a future date. 
          Whether it’s a heartfelt letter 💌, a surprise video 🎥, or a personal time capsule ⏳, we ensure your moments are preserved securely.  
        </p>
      </div>

      {/* 🛠️ How It Works Section */}
      <div className="section-box how-it-works-box">
        <h2>How It Works</h2>
        <ul className="how-it-works">
          <li>Sign up and create your secure account 🔑</li>
          <li>Upload memories in the form of text, images, or videos 🎥</li>
          <li>Set an unlock date for your capsule 📅</li>
          <li>Revisit your memories when the time arrives ⏳</li>
        </ul>
      </div>

      {/* 🎁 Why Use Memory Haven? */}
      <div className="section-box features-box">
        <h2>Why Use Memory Haven?</h2>
        <div className="features">
          <div className="feature-box">🔒 Secure storage for your precious memories.</div>
          <div className="feature-box">📈 Perfect for personal growth tracking.</div>
          <div className="feature-box">🎁 Great for surprises, anniversaries, and special messages.</div>
          <div className="feature-box">🕰️ Easy access to past emotions and experiences.</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
