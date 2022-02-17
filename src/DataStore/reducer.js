const initialState = {
  isLogin: false,
  user: null,
  isHome: true,
  hideSideBar: false,
  todo: [],
  search: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, user: action.user };
    case "SIGN-UP":
      return { ...state, isHome: action.isHome };
    case "Toggle_Sidebar":
      return { ...state, hideSideBar: action.hideSideBar };
    case "Sign_Out":
      return { ...state, user: null, isLogin: false };
    case "Add_Todo":
      return { ...state, todo: [...state.todo, action.data] };
    case "Delete":
      return { ...state, todo: [...action.data] };
    case "SEARCH":
      return { ...state, search: action.search };
    default:
      return { ...state };
  }
};
export { initialState, reducer };
