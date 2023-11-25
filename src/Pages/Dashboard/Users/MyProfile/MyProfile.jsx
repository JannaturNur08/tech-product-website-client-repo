import useAuth from "../../../../hooks/useAuth";

const MyProfile = () => {
	const { user } = useAuth();
	return (
		<div>
			<div className="text-center mt-20 space-y-3">
				<div className="avatar">
					<div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
						<img src={user.photoURL} width={15} />
					</div>
				</div>
                <h2 >{user.displayName}</h2>
                <h3>{user.email}</h3>
                <div>
                    <button className="bg-green-500 text-white px-5 py-3 rounded-md">Membership Subscribe</button>
                </div>
			</div>
		</div>
	);
};

export default MyProfile;
