export default function MembersPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Member Resources
        </h1>

        {/* Easy-Speak Link */}
        <section className="bg-tm-blue text-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Sign Up for Meeting Roles</h2>
          <p className="text-lg mb-6">
            Use Easy-Speak to sign up for roles and manage your meeting participation.
          </p>
          <a
            href="https://easy-speak.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-tm-yellow text-tm-blue px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
          >
            Go to Easy-Speak →
          </a>
        </section>

        {/* Club Goals */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Goals for South Austin Club Members
          </h2>
          <ol className="space-y-4 text-gray-700">
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">1.</span>
              <span>Sign up for a role for every meeting you attend.</span>
            </li>
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">2.</span>
              <span>Schedule yourself to present a speech project at least once a month.</span>
            </li>
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">3.</span>
              <span>Make every speech part of a Pathways project.</span>
            </li>
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">4.</span>
              <span>Invite friends!</span>
            </li>
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">5.</span>
              <span>
                Renew your membership on time -- in the fall, before the end of September,
                and in the spring, before the end of March.
              </span>
            </li>
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">6.</span>
              <span>
                Make sure your educational completions are registered in the TMI
                (Toastmasters International) Club website.
              </span>
            </li>
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">7.</span>
              <span>Share your celebration of a new achievement with your club members.</span>
            </li>
            <li className="flex">
              <span className="font-bold text-tm-maroon mr-3">8.</span>
              <span>
                Volunteer to help in the administration of the club success as an officer
                assistant, and eventually an officer!
              </span>
            </li>
          </ol>
        </section>

        {/* Important Reminders */}
        <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Important Reminders</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Membership Renewal:</strong> Remember to renew your membership on time:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Fall renewals: Before the end of September</li>
              <li>Spring renewals: Before the end of March</li>
            </ul>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-tm-blue mb-2">Toastmasters International</h3>
              <p className="text-gray-700 mb-3">
                Access the main Toastmasters website for Pathways materials and resources.
              </p>
              <a
                href="https://www.toastmasters.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tm-blue hover:underline font-semibold"
              >
                Visit Toastmasters.org →
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold text-tm-blue mb-2">District Website</h3>
              <p className="text-gray-700 mb-3">
                Find district events, contests, and additional resources.
              </p>
              <a
                href="#"
                className="text-tm-blue hover:underline font-semibold"
              >
                Visit District Website →
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold text-tm-blue mb-2">Easy-Speak</h3>
              <p className="text-gray-700 mb-3">
                Sign up for meeting roles and view the schedule.
              </p>
              <a
                href="https://easy-speak.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tm-blue hover:underline font-semibold"
              >
                Go to Easy-Speak →
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold text-tm-blue mb-2">Pathways</h3>
              <p className="text-gray-700 mb-3">
                Learn about different Pathways and track your progress.
              </p>
              <a
                href="https://www.toastmasters.org/pathways-overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tm-blue hover:underline font-semibold"
              >
                Explore Pathways →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
