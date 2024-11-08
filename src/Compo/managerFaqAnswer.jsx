import React, { useState, useEffect } from 'react';

const ManagerFAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [currentFAQIndex, setCurrentFAQIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const token = localStorage.getItem('jwttoken');
      const response = await fetch(`https://online-banking-system-backend.vercel.app/showunresponse`, {
        method: 'GET',
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch FAQs.");
      const data = await response.json();
      console.log("Fetched FAQs:", data);
      setFaqs(data.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    const faq = faqs[currentFAQIndex];
    try {
      const token = localStorage.getItem('jwttoken');
      const response = await fetch(`https://online-banking-system-backend.vercel.app/giveanswer`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ FAQ_ID: faq.faq_id, answer: answer }),
      });
      if (!response.ok) throw new Error("Failed to submit answer.");
      setMessage("FAQ answered successfully!");
      setFaqs(faqs.filter((_, index) => index !== currentFAQIndex));
      setCurrentFAQIndex((prev) => (prev > 0 ? prev - 1 : 0));
      setAnswer("");
    } catch (error) {
      setMessage(`Failed to submit answer: ${error.message}`);
    }
  };

  const handleNext = () => currentFAQIndex < faqs.length - 1 && setCurrentFAQIndex(currentFAQIndex + 1);
  const handlePrevious = () => currentFAQIndex > 0 && setCurrentFAQIndex(currentFAQIndex - 1);

  if (loading) return <div>Loading FAQs...</div>;
  if (error) return <div>{error}</div>;
  if (!faqs.length) return <div>No unanswered FAQs available.</div>;

  const { question, user_id, name, email } = faqs[currentFAQIndex];

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="bg-blue-700 w-full p-6 flex justify-between items-center">
        <h2 className="text-white text-2xl">Manager FAQ Response Panel</h2>
      </div>
      <div className="w-full max-w-xl bg-white mt-8 p-8 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-center mb-6">FAQ {currentFAQIndex + 1} of {faqs.length}</h3>
        <div className="text-gray-700 mb-6">
          <p><strong>User ID:</strong> {user_id}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <hr className="my-4" />
          <p><strong>Question:</strong> {question}</p>
          <textarea
            className="w-full mt-4 p-2 border rounded"
            rows="4"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        {message && <div className="text-green-500 mb-4">{message}</div>}
        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAnswerSubmit}
            disabled={!answer.trim()}
          >
            Submit Answer
          </button>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={handlePrevious}
            disabled={currentFAQIndex === 0}
          >
            Previous
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={handleNext}
            disabled={currentFAQIndex === faqs.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerFAQPage;
