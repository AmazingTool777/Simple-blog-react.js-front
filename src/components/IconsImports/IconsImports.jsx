import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faNewspaper,
	faUserPlus,
	faLock,
	faSearch,
	faClock,
	faSortUp,
	faSortDown,
	faEye,
	faList,
	faPlus,
	faArrowLeft,
	faPenAlt,
	faUser,
	faUsers,
	faAngleRight,
	faAngleLeft,
	faFileImage,
	faSignOutAlt,
	faTimesCircle,
	faCheckCircle,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faNewspaper,
	faUserPlus,
	faLock,
	faSearch,
	faClock,
	faSortUp,
	faSortDown,
	faEye,
	faList,
	faPlus,
	faArrowLeft,
	faPenAlt,
	faUser,
	faUsers,
	faAngleRight,
	faAngleLeft,
	faFileImage,
	faSignOutAlt,
	faTimesCircle,
	faCheckCircle,
	faEnvelope
);

const IconsImports = ({ children }) => {
	return <>{children}</>;
};

export default IconsImports;
