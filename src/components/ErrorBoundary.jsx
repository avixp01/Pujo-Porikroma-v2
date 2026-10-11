import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ReactPlayer crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', fontSize: '12px', padding: '10px' }}>
          Player Error: {this.state.error?.message}
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
