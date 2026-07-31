import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Check,
  Trash2,
} from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";


function getNotificationIcon(type) {

  if (type === "like") {
    return <Heart size={20} />;
  }

  if (type === "comment") {
    return <MessageCircle size={20} />;
  }

  if (type === "follow") {
    return <UserPlus size={20} />;
  }

  return <Bell size={20} />;
}


function getNotificationText(notification) {

  const name =
    notification.sender?.full_name ||
    "Someone";


  if (notification.type === "like") {
    return (
      <>
        <span className="font-semibold text-white">
          {name}
        </span>{" "}
        liked your post.
      </>
    );
  }


  if (notification.type === "comment") {
    return (
      <>
        <span className="font-semibold text-white">
          {name}
        </span>{" "}
        commented on your post.
      </>
    );
  }


  if (notification.type === "follow") {
    return (
      <>
        <span className="font-semibold text-white">
          {name}
        </span>{" "}
        started following you.
      </>
    );
  }


  return (
    <>
      <span className="font-semibold text-white">
        {name}
      </span>{" "}
      interacted with you.
    </>
  );
}


function Notifications() {

  const {
    notifications,
    isLoading,
    unreadCount,
    markReadMutation,
    deleteMutation,
  } = useNotifications();


  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-10">

        <div className="animate-pulse space-y-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-20
                rounded-2xl
                bg-slate-900
                border
                border-slate-800
              "
            />
          ))}

        </div>

      </div>
    );
  }


  return (
    <div className="max-w-3xl mx-auto py-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-cyan-500/10
                text-cyan-400
                flex
                items-center
                justify-center
              "
            >
              <Bell size={22} />
            </div>

            <h1 className="text-3xl font-bold">
              Notifications
            </h1>

          </div>

          <p className="text-slate-500 mt-2">
            Stay updated with your DevConnect activity.
          </p>

        </div>


        {unreadCount > 0 && (
          <div
            className="
              px-4
              py-2
              rounded-full
              bg-cyan-500/10
              text-cyan-400
              text-sm
              font-semibold
            "
          >
            {unreadCount} unread
          </div>
        )}

      </div>


      {/* EMPTY STATE */}

      {notifications.length === 0 && (

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-12
            text-center
          "
        >

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-slate-800
              flex
              items-center
              justify-center
              text-slate-500
              mb-5
            "
          >
            <Bell size={28} />
          </div>

          <h2 className="text-xl font-semibold">
            You're all caught up
          </h2>

          <p className="text-slate-500 mt-2">
            New notifications will appear here.
          </p>

        </div>

      )}


      {/* NOTIFICATIONS */}

      <div className="space-y-3">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className={`
              group
              flex
              items-center
              gap-4
              p-5
              rounded-2xl
              border
              transition
              ${
                notification.is_read
                  ? "bg-slate-900 border-slate-800"
                  : "bg-cyan-500/5 border-cyan-500/20"
              }
            `}
          >

            {/* ICON */}

            <div
              className={`
                flex
                shrink-0
                items-center
                justify-center
                w-11
                h-11
                rounded-xl
                ${
                  notification.type === "like"
                    ? "bg-red-500/10 text-red-400"
                    : notification.type === "comment"
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "bg-purple-500/10 text-purple-400"
                }
              `}
            >
              {getNotificationIcon(
                notification.type
              )}
            </div>


            {/* CONTENT */}

            <div className="flex-1 min-w-0">

              <p className="text-sm text-slate-300">
                {getNotificationText(
                  notification
                )}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {new Date(
                  notification.created_at
                ).toLocaleString()}
              </p>

            </div>


            {/* UNREAD DOT */}

            {!notification.is_read && (
              <div
                className="
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-cyan-400
                  shrink-0
                "
              />
            )}


            {/* ACTIONS */}

            <div
              className="
                flex
                items-center
                gap-2
                opacity-0
                group-hover:opacity-100
                transition
              "
            >

              {!notification.is_read && (

                <button
                  onClick={() =>
                    markReadMutation.mutate(
                      notification.id
                    )
                  }
                  title="Mark as read"
                  className="
                    w-9
                    h-9
                    rounded-lg
                    bg-slate-800
                    flex
                    items-center
                    justify-center
                    text-slate-400
                    hover:text-cyan-400
                    hover:bg-slate-700
                  "
                >
                  <Check size={17} />
                </button>

              )}


              <button
                onClick={() =>
                  deleteMutation.mutate(
                    notification.id
                  )
                }
                title="Delete"
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-slate-800
                  flex
                  items-center
                  justify-center
                  text-slate-400
                  hover:text-red-400
                  hover:bg-slate-700
                "
              >
                <Trash2 size={17} />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


export default Notifications;