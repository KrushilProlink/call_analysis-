import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { UsersListWrapper } from "./users-list/UsersList";
import { InnerUsersListWrapper } from "./users-list/InnerUserList";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Call Details",
    path: "/apps/user-management/users",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="users"
          element={
            <>
              <PageTitle>Call Details</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path="users/:id"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                Recruiter Call Details
              </PageTitle>
              <InnerUsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/apps/user-management/users" />} />
    </Routes>
  );
};

export default UsersPage;
