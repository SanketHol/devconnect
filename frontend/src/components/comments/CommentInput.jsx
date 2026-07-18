import { useState } from "react";
import Button from "../ui/Button";
import { useCreateComment } from "../../hooks/useCreateComment";

function CommentInput({ postId }) {

    const [text, setText] = useState("");

    const mutation = useCreateComment(postId);

    const submit = () => {

        if (!text.trim()) return;

        mutation.mutate({

            postId,

            text,

        });

        setText("");

    };

    return (

        <div className="mt-4">

            <textarea

                value={text}

                onChange={(e) => setText(e.target.value)}

                placeholder="Write a comment..."

                className="w-full bg-slate-800 rounded-xl p-3 resize-none"

            />

            <div className="mt-2">

                <Button

                    onClick={submit}

                    loading={mutation.isPending}

                >

                    Comment

                </Button>

            </div>

        </div>

    );

}

export default CommentInput;