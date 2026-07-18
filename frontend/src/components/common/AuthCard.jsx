import Card from "../ui/Card";

function AuthCard({ title, children }) {

    return (

        <Card className="w-full max-w-md">

            <h2 className="text-3xl font-bold text-center mb-8">

                {title}

            </h2>

            {children}

        </Card>

    );

}

export default AuthCard;