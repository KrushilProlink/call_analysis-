import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { RecruiterCallDetails } from "./table/RecruiterCallDetails";
import { KTCard } from "../../../../../_metronic/helpers";

const RecruiterCalList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <RecruiterCallDetails />
      </KTCard>
    </>
  );
};

const RecruiterCallListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <RecruiterCalList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { RecruiterCallListWrapper };
