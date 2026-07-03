import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GroupsIcon from "@mui/icons-material/Groups";

// Student kabineti navigatsiyasi
export const STUDENT_NAV = [
  { icon: <HomeIcon fontSize="small" />,        labelKey: "sp.nav_home",       path: "/student" },
  { icon: <CreditCardIcon fontSize="small" />,  labelKey: "sp.nav_payments",   path: "/student/payments" },
  { icon: <GroupsIcon fontSize="small" />,      labelKey: "sp.nav_groups",     path: "/student/my-groups" },
];
