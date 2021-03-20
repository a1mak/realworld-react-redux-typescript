import { range } from "utils/range";
import PaginationLink from "./PaginationLink";

type PaginationProps = {
  total: number;
  limit: number;
};

const Pagination: React.FC<PaginationProps> = ({ total, limit }) => {
  const pages = range(1, Math.ceil(total / limit));

  return (
    <nav>
      <ul>
        {pages.map((page) => (
          <PaginationLink key={page} page={page.toString()}>
            {page}
          </PaginationLink>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
