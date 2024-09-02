import AppBreadcrumb from "../../AppBreadcrumb";
import HeaderTitle from "../../HeaderTitle";
import { userListBreadcrumb } from "../../../utils/Data/breadcrumb";
import { columns } from "./Columns";
import { payments } from "../../../utils/Data/userlist";
import { UserDataTable } from "./UserDataTable";


const UserList = () => {
  return (
    <div className="p-4  block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          <AppBreadcrumb links={userListBreadcrumb} />
        </div>
        <HeaderTitle className="mt-1 ">All users</HeaderTitle>
        {/*  Table Started*/}
        <div className="min-w-full align-middle">
          <UserDataTable columns={columns} data={payments} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
