import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import AfterSubmit from './components/AfterSubmit';


export default function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={<Form onSubmit={setSubmittedData} />}
      />
      <Route
        path="/success"
        element={<AfterSubmit data={submittedData} />}
      />
    </Routes>
  );
}
