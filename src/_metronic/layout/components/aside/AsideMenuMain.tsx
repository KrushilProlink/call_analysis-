import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
import { MdDashboard } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AnalyticsIcon from "@mui/icons-material/Analytics";
export function AsideMenuMain() {
  const intl = useIntl();

  return (
    <>
      <AsideMenuItem
        to="/dashboard"
        icon={<MdDashboard />}
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
      />
      {/* <AsideMenuItem
        to="/apps/call-analysis/callDetails"
        icon={<IoIosCall />}
        title="Call Analysis"
      />
      <AsideMenuItem
        to="/apps/call-Improvements/details"
        icon={<AnalyticsIcon />}
        title="Call Improvements"
      /> */}
      <AsideMenuItem
        to="/apps/executive-summary/details"
        icon={<IoIosCall />}
        title="Summary & Training"
      />
      <AsideMenuItem
        to="/apps/manual-analysis/details"
        icon={<ContentPasteSearchIcon />}
        title="Manual Analysis"
      />
    </>
  );
}
