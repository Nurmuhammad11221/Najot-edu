import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import imgStudy from "../assets/study.svg";
import imgLogo from "../assets/logo-md.png";
import { authApi } from "../api/auth";
import ResetPasswordModal from "../components/ResetPasswordModal";
import {
  saveToken,
  saveRole,
  extractRole,
  getRole,
  getHomePathForRole,
} from "../hooks/useAuth";

export default function Login() {
  const routerNavigate = useNavigate();
  
  // Holat o'zgaruvchilari
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessMsgOpen, setIsSuccessMsgOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetDoneOpen, setIsResetDoneOpen] = useState(false);

  // Formani yuborish
  async function submitHandler(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    try {
      const responseData = await authApi.login({ phone: phoneNumber, password: userPassword });
      
      const jwt =
        responseData?.token ||
        responseData?.access_token ||
        responseData?.accessToken ||
        responseData?.data?.token ||
        responseData?.data?.access_token;
        
      if (jwt) {
        saveToken(jwt);
      }

      const foundUserName =
        responseData?.user?.name ||
        responseData?.user?.full_name ||
        responseData?.user?.firstName ||
        responseData?.name ||
        responseData?.full_name ||
        responseData?.data?.user?.name ||
        null;
        
      if (foundUserName) {
        localStorage.setItem("user_name", String(foundUserName));
      }

      const assignedRole = extractRole(responseData) || getRole();
      saveRole(assignedRole);

      if (!assignedRole) {
        console.warn("[Tizimga kirish] Rol aniqlanmadi, standart yo'lga o'tiladi.");
      }

      setIsSuccessMsgOpen(true);
      routerNavigate(getHomePathForRole(assignedRole));
    } catch (error) {
      setErrorMessage(error?.message ? error.message : "Xato: Telefon yoki parol mos kelmadi");
    } finally {
      setIsLoading(false);
    }
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function openResetModal() {
    setIsResetModalOpen(true);
  }

  function closeResetModal() {
    setIsResetModalOpen(false);
  }

  function onResetSuccess() {
    setIsResetDoneOpen(true);
  }

  function closeSuccessSnackbar() {
    setIsResetDoneOpen(false);
  }

  return (
    <div className="flex h-screen w-screen">
      {/* Chap tomon: Rasm */}
      <div className="hidden md:flex w-1/2 bg-[#1a2b5e] items-center justify-center">
        <img
          src={imgStudy}
          alt="Talaba rasmi"
          className="w-4/5 max-w-lg"
        />
      </div>

      {/* O'ng tomon: Forma */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center bg-white px-8 relative">
        <div className="flex flex-col items-center mb-8">
          <p className="text-[10px] text-center text-gray-500 uppercase tracking-wide leading-tight mb-3">
            MUHAMMAD AL-XORAZMIY NOMIDAGI
            <br />
            TOSHKENT AXBOROT TEXNOLOGIYALARI
            <br />
            UNIVERSITETI
          </p>
          <img
            src={imgLogo}
            alt="TATU logotipi"
            className="w-20 h-20 object-contain"
          />
        </div>

        <h1 className="text-[#1a2b5e] font-bold text-lg tracking-widest mb-8 uppercase">
          Learning Management System
        </h1>

        <form
          onSubmit={submitHandler}
          className="w-full max-w-sm flex flex-col gap-5"
        >
          <div>
            <label className="block text-sm text-gray-700 mb-1">Telefon raqami</label>
            <TextField
              fullWidth
              placeholder="998XXXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="small"
              variant="outlined"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Maxfiy parol</label>
            <TextField
              fullWidth
              placeholder="Parolni kiriting"
              type={isPasswordVisible ? "text" : "password"}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        size="small"
                      >
                        {isPasswordVisible ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
            />
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={openResetModal}
                className="text-xs text-[#1a2b5e] hover:underline cursor-pointer"
              >
                Parolni unutdingizmi?
              </button>
            </div>
          </div>

          {errorMessage ? (
            <Alert severity="error" sx={{ borderRadius: "4px" }}>
              {errorMessage}
            </Alert>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: "#1a2b5e",
              "&:hover": { backgroundColor: "#14225a" },
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "16px",
              py: 1.2,
            }}
          >
            {isLoading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Tizimga kirish"
            )}
          </Button>
        </form>

        <p className="absolute bottom-6 text-xs text-gray-400">
          Copyright © 2021 of Tashkent University of Information Technologies
        </p>
      </div>

      <Snackbar
        open={isSuccessMsgOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Kirish muvaffaqiyatli!
        </Alert>
      </Snackbar>

      <ResetPasswordModal
        open={isResetModalOpen}
        onClose={closeResetModal}
        onSuccess={onResetSuccess}
      />

      <Snackbar
        open={isResetDoneOpen}
        autoHideDuration={4000}
        onClose={closeSuccessSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Yangi parol o'rnatildi!
        </Alert>
      </Snackbar>
    </div>
  );
}
