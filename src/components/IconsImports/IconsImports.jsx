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
  faUser
);

const IconsImports = ({ children }) => {
  return <>{children}</>;
};

export default IconsImports;
