import { User } from "../../types/user";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
    const formattedDob = new Date(user.dob).toISOString().split('T')[0];
    return (
        <div className="border border-slate-200 rounded-lg shadow-[2px_2px_6px] shadow-yellow-950 h-full text-clip bg-yellow-900 cursor-pointer">            
            <img
                src={user.pictureUrl}
                alt={user.name}
                className="w-full object-cover rounded-t-lg"
            />
            <h3 className="font-semibold m-2 text-yellow-400 text-sm  md:text-md lg:text-lg">
                {user.name}
            </h3>
            <hr className="m-4 text-yellow-400" />
            <p className="mx-auto my-2 text-base text-yellow-400 sm:text-sm">
                <strong>DOB:</strong> {formattedDob}
            </p>
        </div>
    );
}

export default UserCard;