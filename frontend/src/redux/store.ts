import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/user/userApi";
import userSlice from "./features/user/userSlice";
import { authApi } from "./features/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { courseApi } from "./features/course/courseApi";
import { assignmentApi } from "./features/Assessments/Assignments/assignmentApi";
import { quizApi } from "./features/Assessments/Quiz/quizApi";
import { ExamApi } from "./features/Assessments/Exam/examApi";
import { assessmentApi } from "./features/Assessments/AssessmentApi";

// import { counterSlice } from "./features/counter/counterSlice";
// import { quotesApiSlice } from "./features/quotes/quotesApiSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// Infer the `RootState` type from the root reducer
// export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [assignmentApi.reducerPath]: assignmentApi.reducer,
        [quizApi.reducerPath]: quizApi.reducer,
        [ExamApi.reducerPath]: ExamApi.reducer,
        [assessmentApi.reducerPath]: assessmentApi.reducer,
        user: userSlice
    },
    devTools: false,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([userApi.middleware, authApi.middleware, courseApi.middleware, assignmentApi.middleware, quizApi.middleware, ExamApi.middleware, assessmentApi.middleware]);
    },
});



setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch