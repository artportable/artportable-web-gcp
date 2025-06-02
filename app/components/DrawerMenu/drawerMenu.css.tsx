import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    // Main drawer container - mobile first, viewport height
    container: {
      width: "85vw",
      maxWidth: "320px",
      minWidth: "280px",
      height: "100vh",
      backgroundColor: "#fafafa",
      fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
      borderRadius: "0",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      overflowY: "hidden",
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "350px",
        maxWidth: "350px",
      },
      [theme.breakpoints.up("md")]: {
        width: "380px",
        maxWidth: "380px",
      },
    },

    // Header section with close button
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px 8px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e8e9eb",
      flexShrink: 0,
      minHeight: "48px",
    },

    brandSection: {
      display: "flex",
      alignItems: "center",
    },

    brandText: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#1a1a1a",
      letterSpacing: "-0.02em",
    },

    brandLogo: {
      height: "34px",
      width: "auto",
      maxWidth: "100px",
      objectFit: "contain",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      [theme.breakpoints.up("sm")]: {
        height: "38px",
        maxWidth: "120px",
      },
    },

    closeButtonFlex: {
      display: "flex",
      justifyContent: "flex-end",
    },

    closeButton: {
      padding: "6px",
      color: "#6b6b6b",
      borderRadius: "6px",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        backgroundColor: "#f0f1f2",
        color: "#1a1a1a",
        transform: "scale(1.05)",
      },
    },

    // Main content area - scrollable if needed
    drawerContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      overflowX: "hidden",
    },

    // Navigation sections
    navigationSection: {
      padding: "0",
      flexShrink: 0,
    },

    sectionHeader: {
      padding: "12px 20px 6px",
      fontSize: "10px",
      fontWeight: 600,
      color: "#9ca3af",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      backgroundColor: "#fafafa",
      borderBottom: "1px solid #f0f1f2",
    },

    // User profile section
    userSection: {
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e8e9eb",
      padding: "0",
      flexShrink: 0,
    },

    profileItem: {
      padding: "10px 20px",
      minHeight: "44px",
      borderRadius: "0",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        backgroundColor: "#f8f9fa",
        transform: "translateX(2px)",
      },
    },

    upgradeItem: {
      backgroundColor: "#e3f2fd",
      borderLeft: "3px solid #2196f3",
      "&:hover": {
        backgroundColor: "#bbdefb",
      },
    },

    // Standard list items - more compact
    listItem: {
      padding: "8px 20px",
      minHeight: "40px",
      borderRadius: "0",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      borderBottom: "1px solid #f0f1f2",
      "&:hover": {
        backgroundColor: "#f8f9fa",
        transform: "translateX(2px)",
      },
      "&:active": {
        backgroundColor: "#e9ecef",
      },
    },

    listItemText: {
      "& .MuiListItemText-primary": {
        fontSize: "14px",
        fontWeight: 500,
        color: "#1a1a1a",
        lineHeight: 1.3,
      },
    },

    listItemIcon: {
      minWidth: "36px",
      color: "#6b6b6b",
      "& .MuiSvgIcon-root": {
        fontSize: "18px",
      },
    },

    // Avatar styling
    avatarSection: {
      marginRight: "12px",
    },

    // Nested items (language selection) - more compact
    nested: {
      paddingLeft: "48px",
      paddingTop: "6px",
      paddingBottom: "6px",
      minHeight: "36px",
      "&:hover": {
        backgroundColor: "#f0f1f2",
        transform: "translateX(2px)",
      },
    },

    nestedText: {
      "& .MuiListItemText-primary": {
        fontSize: "13px",
        fontWeight: 400,
        color: "#4a4a4a",
      },
    },

    // Language section
    languageSection: {
      backgroundColor: "#ffffff",
      marginTop: "4px",
      borderTop: "1px solid #e8e9eb",
      flexShrink: 0,
    },

    languageHeader: {
      padding: "10px 20px",
      minHeight: "40px",
      borderBottom: "1px solid #f0f1f2",
      "&:hover": {
        backgroundColor: "#f8f9fa",
      },
    },

    languageIcon: {
      color: "#6b6b6b",
      transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    },

    languageIconExpanded: {
      transform: "rotate(180deg)",
    },

    // Footer section (logout) - always at bottom
    footerSection: {
      marginTop: "auto",
      backgroundColor: "#ffffff",
      borderTop: "1px solid #e8e9eb",
      padding: "8px 0",
      flexShrink: 0,
    },

    logoutItem: {
      padding: "10px 20px",
      minHeight: "44px",
      color: "#dc3545",
      "&:hover": {
        backgroundColor: "#fff5f5",
        transform: "translateX(2px)",
      },
      "& .MuiListItemText-primary": {
        color: "#dc3545",
        fontWeight: 500,
        fontSize: "14px",
      },
      "& .MuiListItemIcon-root": {
        color: "#dc3545",
        minWidth: "36px",
      },
    },

    // Action buttons
    actionButton: {
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      borderRadius: "6px",
      padding: "8px 16px",
      margin: "8px 20px",
      textTransform: "none",
      fontSize: "13px",
      fontWeight: 600,
      boxShadow: "0 2px 8px rgba(26, 26, 26, 0.15)",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        backgroundColor: "#000000",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(26, 26, 26, 0.2)",
      },
    },

    // Special styling for favorites indicator
    favoriteBadge: {
      "& .MuiBadge-badge": {
        backgroundColor: "#ff4757",
        color: "#ffffff",
        fontSize: "10px",
        fontWeight: 600,
        minWidth: "16px",
        height: "16px",
        borderRadius: "8px",
      },
    },

    // Divider styling
    divider: {
      backgroundColor: "#e8e9eb",
      margin: "4px 0",
    },

    // Compact list container
    compactList: {
      padding: "0",
      "& .MuiListItem-root": {
        paddingTop: "6px",
        paddingBottom: "6px",
      },
    },

    // Responsive adjustments
    [theme.breakpoints.down("xs")]: {
      container: {
        width: "100vw",
        maxWidth: "none",
      },
      listItem: {
        padding: "6px 16px",
        minHeight: "38px",
      },
      profileItem: {
        padding: "8px 16px",
        minHeight: "40px",
      },
    },

    // Utility classes
    noDecoration: {
      textDecoration: "none",
      color: "inherit",
    },

    flexGrow: {
      flexGrow: 1,
    },

    // Animation classes
    slideIn: {
      animation: "$slideInFromRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },

    "@keyframes slideInFromRight": {
      from: {
        transform: "translateX(100%)",
        opacity: 0,
      },
      to: {
        transform: "translateX(0)",
        opacity: 1,
      },
    },

    // Touch targets for mobile - more compact
    touchTarget: {
      minHeight: "40px",
      [theme.breakpoints.up("sm")]: {
        minHeight: "38px",
      },
    },

    // Scrollable section for middle content
    scrollableContent: {
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
      paddingBottom: "8px",
    },
  })
);

