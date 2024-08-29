# Blog Application Frontend

This is the frontend of a Blog Application built using React. The application provides role-based access control, allowing both customers and admins to interact with the app according to their permissions. The customer can create, edit, and delete blogs, while the admin can manage customers.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)


## Features

- **User Authentication**: Users can register and log in to the application.
- **Role-Based Access Control**: Two types of users: 'customer' and 'admin'.
  - Customers can create, edit, and delete their own blogs.
  - Admins can manage customer accounts (delete customers).
- **State Management**: Handled using React Context API.
- **Notifications**: Snackbar notifications for actions like login, logout, blog creation, editing, and deletion.
- **Error Handling**: Error boundaries to catch and display UI errors.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling navigation within the application.
- **CSS Modules**: For styling components locally.
- **Snackbar**: For notification handling.
- **Axios**: For making HTTP requests to the backend API.
- **React Context API**: For state management and authentication context.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your local machine.
- Backend server (API) running for full functionality.
- git clone  https://github.com/your-username/fesste-backend.git 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-frontend.git
   cd blog-frontend

## Login Page
![image](https://github.com/user-attachments/assets/6fbb22eb-cf6f-4d81-ad43-f9c38832ad5b)

## Register Page
![image](https://github.com/user-attachments/assets/92476b06-d3bc-4899-91df-8f9d6cf8e5ca)

## Create Blog
![image](https://github.com/user-attachments/assets/8fecdfc8-ab7b-48d7-944a-cd6d4bd014bf) 

## Blog List
![image](https://github.com/user-attachments/assets/45605e70-0642-4d5e-9b4a-485ba2ec0114)
## Customer List
![image](https://github.com/user-attachments/assets/1fc16426-8852-4b9c-b733-981fef4ed548) 
## Soft Delete Modal
![image](https://github.com/user-attachments/assets/bee5212d-e10d-4e38-89fa-549679fa1ede)










