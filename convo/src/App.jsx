import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ChannelsPage from './pages/ChannelsPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import LoadingCover from './components/LoadingCover';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { setLogUserIn } from './redux/actions';
import { auth, firebaseDatabase } from './firebase';
import { recordNewUser } from './firebase/database';
import ImageZoomer from './components/ImageZoomer';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

export default function App() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: 'rgb(192,192,192)'
      },
      tooltipColor: {
        bg: 'white',
        text: 'black'
      },
      borderColor: 'whitesmoke',
      publicColor: 'rgb(150, 246, 246)',
      privateColor: 'rgb(185, 239, 164)',
      mainColorNormal: 'rgb(29, 32, 37)',
      mainColorSlightDark: 'rgb(26, 28, 33)',
      mainColorDark: 'rgb(21, 24, 27)',
      mainColorSlightLight: 'rgb(38, 42, 49)',
      mainColorLight: 'rgb(54, 57, 63)',
      highlightColor: 'rgba(255, 255, 255, 0.1)',
      contrastColor: 'whitesmoke',
      iconColor: 'whitesmoke',
      mode: 'dark',
    },
    typography: {
      allVariants: {
        color: 'whitesmoke'
      },
      fontFamily: '"Inter"'
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, isLoading] = useAuthState(
    auth,
    {onUserChanged: (user) => {
      if (!user) {
        navigate('/');
      } else {
        recordNewUser(user).then(() => {
          navigate('/channels')
        })
      }
    }}
  );

  useEffect(() => {
    if (!user) return;
  
    return onSnapshot(doc(firebaseDatabase, 'users', user?.uid), (userDoc) => {
      dispatch(setLogUserIn({...userDoc.data()}))
    })
  }, [user, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <ImageZoomer />
      <ToastContainer theme='dark' position='top-left'/>
      <LoadingCover display={isLoading} />
      <Routes>
        <Route path='/' element={<LoginRegisterPage />} />
        <Route path='/channels/' element={<ChannelsPage />} />
        <Route path='/channels/:cid' element={<ChannelsPage />} />
      </Routes>
    </ThemeProvider>
  )
}
