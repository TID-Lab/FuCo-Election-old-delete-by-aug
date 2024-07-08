// Represents a user of the system.
import mongoose, { Schema } from "mongoose";
//const passportLocalMongoose = require('passport-local-mongoose');
require("dotenv").config();

const userSchema = new Schema(
	{
		provider: { type: String, default: "local" },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String },
		hasDefaultPassword: { type: Boolean, default: true },
		role: { type: String, default: "viewer" },
		active: { type: Boolean, default: true },
		attempts: { type: Number, default: 0 },
		last: { type: Date },
	},
	{
		statics: {
			can(permission: string) {
				// i wanna refactor this, we dont use this anywhere else.
				const permissions = {
					"manage trends": ["admin"],
					"view data": ["viewer", "monitor", "admin"],
					"edit data": ["monitor", "admin"],
					"change settings": ["admin"],
					"view users": ["viewer", "monitor", "admin"],
					"view other users": ["manager", "admin"],
					"update users": ["viewer", "monitor", "admin"],
					"admin users": ["admin"],
					"change admin password": ["admin"],
					"edit tags": ["manager", "admin"],
				};
				type IPermission = keyof typeof permissions;
				// Determine if a user can do a certain action
				return (req, res, next) => {
					const user = req.user;
					if (
						process.env.ADMIN_PARTY &&
						process.env.ADMIN_PARTY.toLowerCase() === "true"
					) {
						next();
					}
					mongoose.model("User").findById(user.id, (err, foundUser) => {
						if (err) {
							res.status(422).send("No user found.");
							return next(err);
						}

						if (Object.prototype.hasOwnProperty.call(permissions, permission)) {
							if (
								permissions[permission as IPermission].indexOf(foundUser.role) >
								-1
							) {
								return next();
							}
						}
						res.status(401).send(`You are not authorized to ${permission}.`);
					});
				};
			},
		},
	},
);

// userSchema.plugin(passportLocalMongoose, {
// 	usernameLowerCase: true,
// });

const User = mongoose.model("User", userSchema);

export default User;
