const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

code = code.replace(
  "padding: '12px',\n                    fontSize: '16px',\n                    fontWeight: '600',\n                    cursor: 'pointer',\n                    marginBottom: '12px',\n                    boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                  }}>\n                  Verification",
  "padding: '12px',\n                  fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '12px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Verification"
);

// Let's also fix the indentation for Enter Code in confirm_email:
code = code.replace(
  "padding: '12px',\n                    fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code",
  "padding: '12px',\n                  fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code"
);

// Let's also fix the indentation for Enter Code in reset_password:
code = code.replace(
  "padding: '12px',\n                    fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '16px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code",
  "padding: '12px',\n                  fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '16px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
