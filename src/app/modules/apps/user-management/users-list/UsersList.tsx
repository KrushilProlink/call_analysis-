import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { UserTable } from "./table/UserTable";
import { UserEditModal } from "./user-edit-modal/UserEditModal";
import { KTCard } from "../../../../../_metronic/helpers";
// import ColspanTable from "./table/ColspanTable";

const UsersList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UserTable />
        {/* <InnerUserTable /> */}
        {/* <ColspanTable /> */}
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  );
};

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { UsersListWrapper };
