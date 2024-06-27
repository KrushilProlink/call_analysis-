import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { InnerUserTable } from "./table/InnerUserTable";
import { KTCard } from "../../../../../_metronic/helpers";

const InnerUserList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <InnerUserTable />
      </KTCard>
    </>
  );
};

const InnerUsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <InnerUserList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { InnerUsersListWrapper };
