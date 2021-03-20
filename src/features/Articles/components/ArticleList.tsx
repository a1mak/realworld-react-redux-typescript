import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../../utils/useQuery";
import {
  fetchArticles,
  selectArticlesByPage,
  selectArticlesCount
} from "../articlesSlice";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";

type ArticleListProps = {
  limit?: number;
};

const ArticleList: React.FC<ArticleListProps> = ({ limit = 10 }) => {
  const dispatch = useDispatch();
  const query = useQuery();
  const page = parseInt(query.get("page") || "1");
  const articles = useSelector(selectArticlesByPage(page));
  const total = useSelector(selectArticlesCount);

  useEffect(() => {
    dispatch(fetchArticles({ limit, offset: (page - 1) * limit, page }));
  }, [dispatch, limit, page]);

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      <Pagination limit={limit} total={total} />
    </>
  );
};

export default ArticleList;
