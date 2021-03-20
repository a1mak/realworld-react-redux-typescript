import {
  createEntityAdapter,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { isValidationError, NetworkStatus } from "api/types";
import { Article } from "app/models/Article";
import { RootState } from "app/store";
import { createAppAsyncThunk } from "utils/createAppAsyncThunk";

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.slug,
});

/**
 * Articles slice of Redux store
 */
type ArticlesExtendState = {
  status: NetworkStatus;
  idsByPage: { [index: number]: string[] };
  articlesCount: number;
  error?: SerializedError; // Any serializable error, basicaly a message
};

const initialState = articlesAdapter.getInitialState<ArticlesExtendState>({
  status: "idle",
  idsByPage: {},
  articlesCount: 0,
});
export const fetchArticles = createAppAsyncThunk<
  { articles: Article[]; articlesCount: number },
  {
    limit: number;
    offset: number;
    page: number;
    tag?: string;
    author?: string;
    favorited?: string;
  }
>(
  "articles/fetchAll",
  async ({ page, ...data }, { rejectWithValue, extra: { fetchArticles } }) => {
    const result = await fetchArticles(data);

    // If api returns a validation error then reject action with error body
    if (isValidationError(result)) {
      return rejectWithValue(result);
    }

    return result;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "success";
        state.articlesCount = action.payload.articlesCount;
        state.idsByPage[action.meta.arg.page] = action.payload.articles.map(
          (article) => article.slug
        );
        articlesAdapter.upsertMany(state, action.payload.articles);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error;
      });
  },
});

export const {
  selectAll: selectAllArticles,
  selectIds: selectArticleIds,
  selectById: selectArticle,
} = articlesAdapter.getSelectors<RootState>((state) => state.articles);

export const selectFilteredArticles = (limit: number, offset: number) => (
  state: RootState
) =>
  selectArticleIds(state)
    .slice(offset, offset - 1 + limit)
    .map((id) => selectArticle(state, id))
    .filter((article): article is Article => !!article);

export const selectArticlesByPage = (page: number) => (state: RootState) =>
  (state.articles.idsByPage[page] || [])
    .map((id) => selectArticle(state, id))
    .filter((article): article is Article => !!article);

export const selectArticlesCount = (state: RootState) =>
  state.articles.articlesCount;

export default articlesSlice.reducer;
