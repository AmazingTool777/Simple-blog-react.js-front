import { useMemo } from "react";

// Default user avatar images
import defaultMan from "../../assets/images/default-man.png";
import defaultWoman from "../../assets/images/default-woman.png";

// Styles
import "./UserAvatar.css";

const UserAvatar = ({ gender = "M", src = null, alt = "", imgClassName = "", className = "", id = "" }) => {
	const defaultAvatar = gender === "M" ? defaultMan : defaultWoman;

	const containerProps = useMemo(() => {
		const containerProps = {
			style: { backgroundImage: `url(${defaultAvatar})` },
			className: `app-user-avatar${className ? ` ${className}` : ""}`,
		};
		if (id) containerProps.id = id;
		return containerProps;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gender]);

	return <div {...containerProps}>{src && <img src={src} alt={alt} className={imgClassName} />}</div>;
};

export default UserAvatar;
