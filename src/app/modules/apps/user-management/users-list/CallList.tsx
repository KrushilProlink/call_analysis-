import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { CallDetailsTable } from "./table/CallDetailsTable";
import { KTCard } from "../../../../../_metronic/helpers";
// import ColspanTable from "./table/ColspanTable";

const CallList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <CallDetailsTable />
      </KTCard>
    </>
  );
};

const CallListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CallList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { CallListWrapper };
