// src/components/Spinner.tsx
function Spinner(): JSX.Element {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div
        style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f8',
          borderTop: '5px solid #4481c3',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '20px auto',
        }}
      />
    </>
  );
}

export default Spinner;
