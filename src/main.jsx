import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserProvider from './provider/userProvider.jsx';
import PostCUPage from './pages/postCU.jsx';
import SchedulePage from './pages/schedule.jsx';
import FriendPage from './pages/friend.jsx';
import AdminPage from './pages/admin.jsx';
import { withLogin, withLoginAndAdmin } from './hoc/hoc.jsx';

const ProtectedPostCreate = withLogin(PostCUPage);
const ProtectedSchedule = withLogin(SchedulePage);
const ProtectedFriend = withLogin(FriendPage);
const ProtectedAdmin = withLoginAndAdmin(AdminPage);

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/login", element: <LoginPage/>},
  {path: "/register", element: <RegisterPage/>},
  {path: "/post/create", element: <ProtectedPostCreate/>},
  {path: "/schedule", element: <ProtectedSchedule/>},
  {path: "/friend", element: <ProtectedFriend/>},
  {path: "/admin", element: <ProtectedAdmin/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
)
