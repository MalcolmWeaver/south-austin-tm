import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-tm-blue text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:southaustintoastmasters@gmail.com" className="hover:text-tm-yellow">
                  southaustintoastmasters@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href="tel:512-351-2706" className="hover:text-tm-yellow">
                  512-351-2706
                </a>
              </p>
            </div>
          </div>

          {/* Meeting Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Meeting Information</h3>
            <div className="space-y-2 text-gray-300">
              <p>Every Tuesday at 7:00 PM CST</p>
              <p>Austin Community College</p>
              <p>South Austin Campus</p>
              <p>Room 1319 (3rd Floor)</p>
              <p>1820 W. Stassney Lane</p>
              <p>Austin, TX 78745</p>
            </div>
          </div>

          {/* Social Media & Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <a href="https://www.facebook.com/SATMClub" className="hover:text-tm-yellow">
                  Facebook
                </a>
              </p>
              <p>
                <a href="https://www.instagram.com/southaustintoastmasters/" className="hover:text-tm-yellow">
                  Instagram
                </a>
              </p>
              <p className="mt-4">
                <a
                  href="https://www.toastmasters.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tm-yellow"
                >
                  Toastmasters International
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} South Austin Toastmasters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
