import { Link } from "react-router-dom";
import { useQuery } from "utils/useQuery";

type PaginationProps = {
  page: string;
};

const Pagination: React.FC<PaginationProps> = ({ page, children }) => {
  const search = useQuery();
  const match = page === (search.get("page") || "1");
  const className = match ? " active" : "";

  return (
    <li className={"page-item" + className}>
      <Link className="page-link" to={`?page=${page}`}>
        {children}
      </Link>
    </li>
  );
};

export default Pagination;
