import  { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

type AppBreadcrumbProps = {
  links: { [to: string]: string }[];
};

const AppBreadcrumb: FC<AppBreadcrumbProps> = ({ links }) => {
  return (
    <div>
      <Breadcrumb >
        <BreadcrumbList>
          {links.map((link, index) =>
            Object.entries(link).map(([key, value]) =>
              links.length - 1 !== index ? (
                <BreadcrumbItem key={index + value + key}>
                  <BreadcrumbLink className="">
                    <Link to={key}>{value}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={index + value + key}>
                  <BreadcrumbPage className="">{value}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AppBreadcrumb;
