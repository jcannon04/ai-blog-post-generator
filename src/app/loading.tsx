const LoadingPage: React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    );
  };
  
  export default LoadingPage;