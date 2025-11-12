import FAQ from "@/components/FAQ";
import Image from "next/image";

const faqItems = [
  {
    question: "Do I have to speak at my first meeting?",
    answer:
      "No! You're welcome to observe. However, you may be invited to participate in Table Topics (impromptu speaking), but it's completely optional.",
  },
  {
    question: "How much does it cost to visit?",
    answer:
      "Visiting is free! You can attend as a guest multiple times before deciding if you'd like to become a member.",
  },
  {
    question: "What should I wear?",
    answer:
      "Business casual is typical, but feel free to dress comfortably. We want you to feel at ease!",
  },
  {
    question: "How do I become a member?",
    answer:
      "After visiting, if you'd like to join, we'll help you sign up through Toastmasters International. Membership includes access to the Pathways learning experience and all club benefits.",
  },
  {
    question: "Can I bring a friend?",
    answer:
      "Absolutely! Guests are always welcome, and bringing a friend is encouraged.",
  },
];

export default function GuestsPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Visiting as a Guest
        </h1>

        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-tm-blue to-tm-maroon text-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="text-xl mb-4">
            We're excited that you're interested in visiting South Austin Toastmasters!
          </p>
          <p className="text-lg">
            Guests are always welcome at our meetings. Come see what we're all about and
            experience the friendly, supportive atmosphere that makes our club special.
          </p>
        </section>

        {/* No RSVP Required */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-start">
            <svg className="h-8 w-8 text-green-500 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No RSVP Required</h2>
              <p className="text-lg text-gray-700 mb-2">
                Simply show up! We meet every Tuesday at 7:00 PM.
              </p>
              <p className="text-gray-600">
                Please arrive by 6:45 PM so we can visit with you before the meeting starts.
              </p>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>

          <div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
            {/* Text Content - Takes 1 column (50%) on desktop */}
            <div className="space-y-6 md:order-1 order-2">
            <div>
              <h3 className="text-xl font-bold text-tm-blue mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Your First Visit
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-tm-maroon mr-2">•</span>
                  <span>Arrive by 6:45 PM - meet the greeters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tm-maroon mr-2">•</span>
                  <span>Get a quick overview of Toastmasters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tm-maroon mr-2">•</span>
                  <span>Watch speeches and evaluations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tm-maroon mr-2">•</span>
                  <span>Optional: Try Table Topics (impromptu speaking)</span>
                </li>
              </ul>
            </div>

              <div>
                <h3 className="text-xl font-bold text-tm-maroon mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Meeting Format
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-tm-blue mr-2">•</span>
                    <span><strong>Prepared Speeches:</strong> 5-7 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tm-blue mr-2">•</span>
                    <span><strong>Table Topics:</strong> 1-2 min impromptu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tm-blue mr-2">•</span>
                    <span><strong>Evaluations:</strong> Constructive feedback</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tm-blue mr-2">•</span>
                    <span><strong>Duration:</strong> 7:00-8:00 PM (60 min)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Club Photo - Takes 1 column (50%) on desktop, full width on mobile */}
            <div className="rounded-lg overflow-hidden shadow-lg md:order-2 order-1">
              <Image
                src="/images/club-photo.jpg"
                alt="South Austin Toastmasters club members"
                width={1440}
                height={1080}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Meeting Location */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Meeting Location</h2>
          <div className="space-y-2 text-gray-700">
            <p className="text-lg font-semibold">Austin Community College, South Austin Campus</p>
            <p>Room 1319 (3rd Floor)</p>
            <p>1820 W. Stassney Lane</p>
            <p>Austin, TX 78745</p>
            <p className="mt-4 text-gray-600">
              Parking is available in the ACC parking lot. The building is easily accessible
              and room 1319 is on the third floor.
            </p>
          </div>
        </section>

        {/* FAQ - Accordion */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <FAQ items={faqItems} />
        </section>

        {/* Prospective Member Sign-up */}
        <section className="bg-blue-50 p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in Joining?</h2>
          <p className="text-gray-700 mb-6">
            Fill out our prospective member form and we'll get in touch with you!
          </p>
          <a
            href="https://www.toastmasters.org/Find-a-Club/01085173-south-austin/contact-club?id=e741e89a-8cd7-ec11-a2fd-005056875f20"
            className="inline-block bg-tm-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
          >
            Prospective Member Sign-Up Form →
          </a>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-tm-blue to-tm-maroon text-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-lg mb-6">
            We meet every Tuesday at 7:00 PM. We look forward to seeing you!
          </p>
          <a
            href="/calendar"
            className="inline-block bg-tm-yellow text-tm-blue px-8 py-4 text-lg rounded-lg font-bold hover:bg-yellow-300 transition-colors text-center min-h-[48px]"
          >
            View Meeting Schedule
          </a>
        </section>
      </div>
    </div>
  );
}
