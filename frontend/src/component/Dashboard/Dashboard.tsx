import { dashboardBreadcrumb } from "../../utils/Data/breadcrumb";
import { statCardData } from "../../utils/Data/dashboardState";
import AppBreadcrumb from "../AppBreadcrumb";
import AttendanceChart from "./AttendanceChart";
import HeaderTitle from "../HeaderTitle";
import { StatCard, StatCardList } from "./StatCard";

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-50 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="mb-4">
          {/* Page Breadcrumb */}
          <AppBreadcrumb links={dashboardBreadcrumb} />
        </div>
        {/*  Title */}
        <HeaderTitle className="mt-1 font-roboto">Overview</HeaderTitle>
        {/* State Card */}
        <StatCardList>
          {statCardData.map(({ title, total, change }) => (
            <StatCard title={title} total={total} change={change} />
          ))}
        </StatCardList>
        {/* State Card */}

        <div className="grid gap-4 mt-4 lg:w-[calc(100%_-_256px)] rounded">
          {/* Bar Graph */}
          <div className="bg-white w-full flex flex-col">
            <div className="px-4 py-2 flex justify-between items-center">
              <h2 className=" font-medium text-xl font-roboto">Attendance</h2>{" "}
              <div className="sm:block hidden">
                <select name="course" id="course" className="border focus:outline-none px-3 py-2 rounded-md  bg-gray-50 focus:ring-1  focus:ring-gray-700 cursor-pointer">
                  <option value="Computer Science" selected>Computer Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
                 <select name="timeLine" id="timeLine" className="border focus:outline-none px-3 py-2 rounded-md ml-4 bg-gray-50 focus:ring-1  focus:ring-gray-700  cursor-pointer -mr-2">
                  <option value="This Weak" selected>This Weak</option>
                  <option value="This Month">This Month</option>
                </select>
              </div>
            </div>
            <AttendanceChart />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
