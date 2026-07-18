function CommentCard({ comment }) {

    return (

        <div className="flex gap-3 py-3">

            <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center font-semibold">

                {comment.user.full_name.charAt(0)}

            </div>

            <div className="flex-1">

                <div className="bg-slate-800 rounded-xl px-4 py-3">

                    <h4 className="font-semibold text-sm">

                        {comment.user.full_name}

                    </h4>

                    <p className="mt-1 text-sm">

                        {comment.text}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default CommentCard;