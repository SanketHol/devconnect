import { useParams } from "react-router-dom";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useProfile } from "../../hooks/useProfile";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfilePosts from "../../components/profile/ProfilePosts";

function Profile() {
  const { id } = useParams();

  const {
    data: currentUser,
    isLoading: currentUserLoading,
  } = useCurrentUser();

  // Wait until current user is loaded
  const profileId = id ?? currentUser?.id;

  const {
    data: profile,
    isLoading: profileLoading,
  } = useProfile(profileId);

  if (currentUserLoading || profileLoading || !profile) {
    return (
      <div className="text-center py-20 text-slate-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">

      <ProfileHeader
        profile={profile}
        isOwnProfile={Number(profileId) === currentUser.id}
      />

      <ProfileStats profile={profile} />

      <ProfilePosts userId={profileId} />

    </div>
  );
}

export default Profile;