import { Controller, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import { MdAddCard } from "react-icons/md";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const {_id,ownerEmail,product_name,description,facebook_external_link,google_external_link,
        timestamp, } = useLoaderData();
        const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
	const { register, handleSubmit,  control , formState: { errors } } = useForm();

    const now = moment().format("MMMM Do YYYY, h:mm:ss a");

	const onSubmit = async (data) => {
		console.log(data);
		// image upload to imgbb and then get an url
		const imageFile = { image: data.image[0] };
		const res = await axiosPublic.post(image_hosting_api, imageFile, {
			headers: {
				"content-type": "multipart/form-data",
			},
		});
		if (res.data.success) {
			// now send the menu item data to the server with the image url

			console.log(data.timestamp);
			const product = {
				ownerEmail: user.email,
				product_name: data.name,
				description: data.description,
				image: res.data.data.display_url,
                tags: data.tags.map((tag) => tag.text),
				facebook_external_link: data.fbLink,
				google_external_link: data.googleLink,
				status: "pending",
				timestamp: moment(data.timestamp).format("MMMM Do YYYY, h:mm:ss a"),
				vote: 0,
				votedUsers:[]
			};
			//
			console.log(data.timestamp);
			const productRes = await axiosPublic.patch(`/products/${_id}`, product);
			console.log(productRes.data);
            if(product.data.modifiedCount > 0){
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the product.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
		}
		console.log("with image url", res.data);
	};

    return (
        <div>
            <h2>Update product here</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-control w-full my-6 space-y-3">
						<div className="avatar">
							<div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
								<img src={user.photoURL} />
							</div>
						</div>
						<p>Owner Name : {user.displayName}</p>
						<p>Owner Email : {ownerEmail}</p>
					</div>

					<div className="form-control w-full my-6">
						<label className="label">
							<span className="label-text">Product Name*</span>
						</label>
						<input
							type="text"
                            defaultValue={product_name}
							placeholder="Product Name"
							{...register("name", { required: true })}
							required
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control w-full my-6">
						<input
							{...register("image", { required: true })}
							type="file"
							className="file-input w-full max-w-xs"
						/>
                        {errors.image && (
						<span className="text-red-500">
							Image is required
						</span>
					)}
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<textarea
							{...register("description", { required: true })}
							className="textarea textarea-bordered h-24"
                            defaultValue={description}
							placeholder="Description"></textarea>
					</div>

					{/* tags */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Tags</span>
						</label>
						<Controller
							name="tags"
							control={control}
							defaultValue={[]}
							render={({ field }) => (
								<ReactTags
									{...field}
									tags={field.value}
									handleDelete={(index) =>
										field.onChange(
											field.value.filter(
												(_, i) => i !== index
											)
										)
									}
									handleAddition={(tag) =>
										field.onChange([...field.value, tag])
									}
									inputProps={{ placeholder: "Add a tag" }}
								/>
							)}
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text">FaceBook Link</span>
						</label>
						<input
							type="text"
							{...register("fbLink", { required: true })}
							placeholder="Facebook Link"
                            defaultValue={facebook_external_link}
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Google Link</span>
						</label>
						<input
							type="text"
							{...register("googleLink", { required: true })}
							placeholder="Google Link"
                            defaultValue={google_external_link}
							className="input input-bordered"
						/>
					</div>

					<div className="form-control w-full my-6">
						<label className="label">
							<span className="label-text">Post Date</span>
						</label>
						<input
							type="date"
							min={now}
							placeholder="Post Date"
                            defaultValue={timestamp}
							{...register("timestamp", { required: true })}
							required
							className="input input-bordered w-full"
						/>
					</div>

					<button className="btn bg-primary text-white">
						Submit <MdAddCard />
					</button>
				</form>
        </div>
    );
};

export default UpdateProduct;