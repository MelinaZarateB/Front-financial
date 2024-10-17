import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white", // Color de fondo del campo de entrada
            height: "35px", // Altura personalizada del campo de entrada
            //padding: "0", // Eliminar el padding para que el contenido se ajuste bien dentro del campo
            "& input": {
              padding: "8px 12px", // Ajustar el padding del texto dentro del input
              fontSize: "14px", // Tamaño de la fuente del texto dentro del input
            },
            "& fieldset": {
              // borderColor: "#2196f3", // Color del borde cuando no está enfocado
            },
            "&:hover fieldset": {
              //borderColor: "#1565c0", // Color del borde cuando está en hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2196f3", // Color del borde cuando está enfocado
            },
          },
          "& .MuiInputLabel-root": {
            marginLeft: "2px",
            marginRight: "2px",
            fontSize: "14px", // Ajustar el tamaño del label
            transform: "translate(10px, 8px)", // Ajustar la posición del label cuando está dentro del input
            "&.MuiInputLabel-shrink": {
              transform: "translate(10px, -10px) ", // Ajustar la posición y tamaño cuando el label está "shrinked"
            },
          },
        },
      },
    },
  },
});

export default theme;
