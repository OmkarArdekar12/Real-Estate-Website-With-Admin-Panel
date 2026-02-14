import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{
        top: 90,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#1e293b",
          border: "2px solid #facc15",
          borderRadius: "25px",
          paddingInline: "1rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          letterSpacing: "2px",
        },
        success: {
          iconTheme: {
            primary: "#facc15",
            secondary: "#1e293b",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#1e293b",
          },
        },
      }}
    />
  );
}
