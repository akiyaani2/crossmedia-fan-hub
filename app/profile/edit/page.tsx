export default function EditProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-cosmic-blue mb-6">Edit Your Profile</h1>
      <p className="text-neon-accent mb-8">Update your avatar, bio, and other settings.</p>
      {/* Placeholder for profile editing form */}
      <form className="space-y-6 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
        {/* Example field: Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-purple-300 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-neon-accent focus:ring-neon-accent sm:text-sm text-white placeholder-gray-400"
            placeholder="Tell the multiverse about yourself..."
          ></textarea>
        </div>

        {/* Placeholder for other fields like avatar upload, username, etc. */}
        <div className="text-gray-400">[Other Profile Fields Placeholder]</div>

        {/* Placeholder Save Button */}
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-cosmic-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-neon-accent focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
} 