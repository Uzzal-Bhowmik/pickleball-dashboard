export const mainTheme = {
  token: {
    colorPrimary: "#305FA1",
    colorInfo: "#305FA1",
    fontFamily: "inherit",
  },

  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "#000",
      itemHoverBg: "var(--primary)",
      itemHoverColor: "#fff",
      subMenuItemBg: "var(--demin-primary-50)",
      itemSelectedBg: "#305fa1",
      itemSelectedColor: "white",
      iconSize: 17,
      itemMarginBlock: 10,
      itemHeight: 56,
      itemPaddingInline: 1,
    },

    Table: {
      headerBg: "var(--primary)",
      headerSplitColor: "white",
      headerColor: "rgb(248, 250, 252)",
      cellFontSize: 16,
      colorText: "black",
      borderColor: "rgba(255, 255, 255, 0.18)",
      footerColor: "rgba(31, 41, 55, 0.88)",
      footerBg: "rgb(79, 106, 167)",
      headerFilterHoverBg: "transparent",
      filterDropdownMenuBg: "#fff",
      filterDropdownBg: "#fff",
      colorPrimary: "red",
      // colorInfo: "#1B70A6",
      borderColor: "lightGray",
      headerBorderRadius: "0",
    },

    Button: {
      colorPrimary: "rgb(27,113,167)",
      colorPrimaryHover: "rgb(38,143,209)",
    },

    Input: {
      colorBorder: "#a2a2a3",
    },
    Select: {
      colorBorder: "#a2a2a3",
    },

    DatePicker: {
      colorBorder: "#a2a2a3",
    },
  },
};
