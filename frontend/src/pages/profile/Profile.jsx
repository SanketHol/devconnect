import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useProfile } from "../../hooks/useProfile";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfilePosts from "../../components/profile/ProfilePosts";

function Profile() {
  const { data: currentUser, isLoading } = useCurrentUser();

  const { data: profile } = useProfile(currentUser?.id);

  if (isLoading)
    return (
      <div className="text-center py-20 text-slate-400">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">

      <ProfileHeader profile={profile} />

      <ProfileStats profile={profile} />

      <ProfilePosts />

    </div>
  );
}

export default Profile;