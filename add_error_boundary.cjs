const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const errorBoundaryClass = `
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{background: 'white', color: 'red', padding: '20px', zIndex: 9999, position: 'relative', height: '100vh', width: '100vw'}}><h1>Something went wrong.</h1><pre>{this.state.error.toString()}</pre></div>;
    }
    return this.props.children;
  }
}
`;

const mapPageDecl = `const MapPage = ({ onClose }) => {`;

if (!code.includes('class ErrorBoundary')) {
  code = code.replace(mapPageDecl, errorBoundaryClass + '\n' + mapPageDecl);
}

const mapPageReturn = `return (
    <div className="map-page-container">`;
const mapPageReturnReplace = `return (
    <ErrorBoundary>
    <div className="map-page-container">`;

const mapPageEnd = `      </div>
  );
};`;
const mapPageEndReplace = `      </div>
    </ErrorBoundary>
  );
};`;

code = code.replace(mapPageReturn, mapPageReturnReplace);
code = code.replace(mapPageEnd, mapPageEndReplace);

fs.writeFileSync('src/components/MapPage.jsx', code);
