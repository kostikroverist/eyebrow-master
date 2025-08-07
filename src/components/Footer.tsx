const Footer = () => {
  return (
    <footer className="bg-[#140F1F] text-white py-12">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">
          Makeup & Brows
        </h2>
        <p className="text-gray-400 mb-6">Твій образ - моє мистецтво</p>

        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.instagram.com/your_instagram_handle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a
            href="https://www.facebook.com/your_facebook_handle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fab fa-facebook-f fa-2x"></i>
          </a>
          <a
            href="mailto:youremail@example.com"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-envelope fa-2x"></i>
          </a>
          <a
            href="tel:+380XXXXXXXXX"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-phone fa-2x"></i>
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} My Website. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
