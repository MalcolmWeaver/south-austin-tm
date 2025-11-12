import Image from "next/image";

// Enable ISR - revalidate every 4 hours (sync with calendar)
export const revalidate = 14400;

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tm-blue to-tm-maroon text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to South Austin Toastmasters!
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            A mutually supportive and positive learning environment for developing
            communication and leadership skills
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The mission of South Austin Toastmasters club is to provide a mutually
              supportive and positive learning environment in which every individual member
              has the opportunity to develop communication and leadership skills, which in
              turn foster self-confidence and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-tm-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            About South Austin Toastmasters
          </h2>

          {/* Meeting Photo */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/meeting-photo.jpg"
              alt="South Austin Toastmasters meeting in progress"
              width={1200}
              height={600}
              className="w-full h-64 md:h-80 object-cover"
              priority
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-tm-blue">
              <h3 className="text-xl font-bold text-tm-blue mb-4">What We Do</h3>
              <p className="text-gray-700 mb-4">
                South Austin Toastmasters club exists to give its members a place to
                practice public speaking, learn how to create impactful presentations,
                and how to give helpful feedback -- and just hang out with some amazing
                people once a week!
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-tm-maroon">
              <h3 className="text-xl font-bold text-tm-maroon mb-4">Pathways Program</h3>
              <p className="text-gray-700 mb-4">
                Being a part of Toastmasters International, our members select pathways
                that better fit their goals for personal and professional development.
                Through the Pathways program, Toastmasters can improve:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Dynamic Leadership skills</li>
                <li>Persuasive Influence techniques</li>
                <li>Engaging Humor strategies</li>
                <li>And much more</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Meetings
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">When</h3>
                <p className="text-lg text-gray-700">
                  Every Tuesday at 7:00 PM - 8:00 PM CST
                </p>
                <p className="text-gray-600 mt-1">
                  Please arrive by 6:45 PM to ensure smooth start to the meeting
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Where</h3>
                <p className="text-lg text-gray-700">
                  Austin Community College, South Austin Campus
                </p>
                <p className="text-gray-700">Room 1319 (3rd Floor)</p>
                <p className="text-gray-700 mt-2">
                  1820 W. Stassney Lane<br />
                  Austin, TX 78745
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Guests are welcome!</strong> No RSVP required.
                </p>
                <p className="text-gray-600">
                  Please join us by 6:45 PM so we can visit with you before the meeting starts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-tm-maroon text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step in your journey to becoming a confident speaker and leader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/guests"
              className="bg-tm-yellow text-tm-blue px-8 py-4 text-lg rounded-lg font-bold hover:bg-yellow-300 transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              Visit as a Guest
            </a>
            <a
              href="/calendar"
              className="bg-tm-blue text-white px-8 py-4 text-lg rounded-lg font-bold hover:bg-opacity-90 transition-colors border-2 border-white text-center min-h-[48px] flex items-center justify-center"
            >
              View Meeting Schedule
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
