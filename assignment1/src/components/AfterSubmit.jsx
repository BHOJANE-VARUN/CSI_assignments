import { useNavigate } from 'react-router-dom';

export default function AfterSubmit({ data }) {
  const navigate = useNavigate();

  if (!data) return (
    <div>
      <p>No data submitted. Please fill the form first.</p>
      <button onClick={() => navigate('/')}>
        Go to Form
      </button>
    </div>
  );

  return (
    <div>
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(data).map(([key, value]) =>
          key === 'showPassword' ? null : (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          )
        )}
      </ul>
      <button onClick={() => navigate('/')}>
        Go Back
      </button>
    </div>
  );
}
