# feedbacksystem_backend
Feedback API
A simple Express.js API for collecting and analyzing user feedback, including reviews with ratings and comments.
Table of Contents

Features
Prerequisites
Installation
Usage
API Endpoints
Response Format
Error Handling
Running the Server
License

Features

Submit feedback with a name, rating (1-5), and comment.
Retrieve all feedback entries.
Get analytics including average rating and rating distribution.
Input validation for feedback submissions.
CORS support for cross-origin requests.
JSON response format with success status and error messages.

Prerequisites

Node.js (v14 or higher recommended)
npm (Node Package Manager)

Installation

Clone or download the repository:git clone <repository-url>
cd <repository-directory>


Install dependencies:npm install

This installs express and cors as specified in the code.

Usage

Start the server:node index.js


The server will run on http://localhost:3000 by default, or the port specified in the PORT environment variable.

API Endpoints
POST /feedback
Submit a new feedback entry.

Request Body:{
"name": "string",
"rating": integer,
"comment": "string"
}


name: A non-empty string (trimmed).
rating: An integer between 1 and 5.
comment: A non-empty string (trimmed).


Response:
201 Created: Returns the created feedback object with an id and timestamp.
400 Bad Request: If validation fails (e.g., invalid name, rating, or comment).



GET /feedback
Retrieve all feedback entries.

Response:
200 OK: Returns an array of all feedback objects.
500 Server Error: If an error occurs while fetching feedback.



GET /feedback/analytics
Get analytics for feedback, including average rating and rating distribution.

Response:
200 OK: Returns an object with:
averageRating: A number (rounded to one decimal place).
ratingDistribution: An object with counts of each rating (1 to 5).


500 Server Error: If an error occurs while calculating analytics.
If no reviews exist, returns averageRating: 0.0 and zero counts for all ratings.



Response Format
All responses follow this structure:
{
"success": boolean,
"data": object | array,
"message": string (optional, included in error responses)
}

Error Handling

Validation errors return 400 Bad Request with a descriptive message.
Server errors return 500 Server Error with a generic message.
All errors include success: false in the response.

Running the Server

Set the PORT environment variable to change the default port (3000):PORT=4000 node index.js


Access the API at http://localhost:<port>.

License
This project is licensed under the MIT License.