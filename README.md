# Property Finder

## Part A

## R1. Description of the website

### Purpose

In today's real estate market, finding the perfect property can be an overwhelming and time-consuming task for potential buyers and renters alike. The abundance of properties combined with the cluttered and often overly complex features of many existing platforms only adds to the frustration. Users are frequently bombarded with irrelevant options and excessive details, which obscure the information they actually need, making the search process more challenging than it should be.

Our real estate app seeks to transform this experience by providing a streamlined, user-friendly platform designed specifically to cut through the noise. With a focus on simplicity and efficiency, our app allows users to easily search for, view, and book property listings, removing the obstacles that typically stand in the way of a smooth property search. By prioritizing the most essential features and presenting them in a clear, accessible format, our app ensures that users can quickly and effectively navigate the property market, leading them to their ideal property with minimal hassle.

### Functionality & Features

#### Visitors

- Can browse the landing page to understand the app's purpose and benefits.
- Can search and view basic property listings, including essential details like price, location, and property type.
- Have the option to sign up to become registered users.

#### Registered Users

- Secure sign-up & sign-in with user authentication.
- Can create and manage property listings if they are property owners or agents.
- Can book viewings for properties they are interested in.

#### Administrators

- Manage user roles with role-based access control (RBAC).
- Can monitor and moderate content, including property listings and user accounts.

#### Target Audience

This app is aimed at potential property buyers, renters, real estate agents, and property owners who are looking for a simple, efficient platform to list, search, and book properties. It is designed for users who value a straightforward experience without the complexities of advanced features, making it ideal for those who want to find or list properties quickly and easily.

### Tech Stack: MERN + Additional Technologies

To build this real estate platform, the MERN stack will be used, providing a robust and scalable solution:

- **MongoDB:** A NoSQL database that will store all user information, property listings, bookings, and other data. MongoDB’s flexible schema will allow for easy scalability and management of complex data structures.
- **Express.js:** A web application framework for Node.js, Express.js will handle the server-side logic, routing, and API creation, providing a solid foundation for the backend of the application.
- **React.js:** The frontend of the application will be built using React.js, offering a dynamic and responsive user interface. React’s component-based architecture will ensure a seamless user experience with fast rendering and easy maintenance.
- **Node.js:** As the runtime environment, Node.js will allow for the development of a fast and efficient server-side application. It will handle all the backend operations, including the integration with MongoDB and communication with the frontend.

### Other Technologies Used

- **HTML & CSS:** For structuring and styling the frontend of the application, ensuring it is both visually appealing and user-friendly.
- **Netlify:** Used for deploying the frontend of the application, providing continuous deployment and serverless backend services.
- **Render:** Utilized for deploying the backend of the application, offering an easy-to-use cloud platform that supports modern web applications.
- **Figma:** A design tool used for creating UI/UX designs and wireframes, ensuring a coherent and attractive user interface.
- **Git:** A version control system that allows for efficient collaboration and tracking of changes throughout the development process.


## R2. Dataflow Diagram

The diagrams below illustrate the data flow within a real estate platform through different levels of detail.

### **Context Diagram (Level 0)**
   - **Overview:** This is the highest-level view of the system, showing the primary entities that interact with the Real Estate Platform.
   - **Entities:**
     - **User:** An individual who interacts with the platform, typically searching for properties.
     - **Agent:** A real estate agent who lists properties on the platform.
   - **Interactions:**
     - **User Authentication:** The process of verifying the user's identity.
     - **Property Search:** The user searches for properties listed on the platform.
     - **Property Listing:** Agents upload property details to the platform.

![Dataflow Diagram Level 0](/docs/dataflow-diagram/level-0.png)

### **Decomposition Diagram (Level 1)**
   - **Overview:** This diagram breaks down the high-level processes into more detailed sub-processes within the system.
   - **Sub-Processes:**
     - **User Authentication:** Handles user login, ensuring access is granted only to registered users. It interacts with User Data to validate credentials.
     - **Property Management:** The process by which agents add, edit, or remove property listings. This process interacts with the Property Data storage to manage listings.
     - **Property Search:** Allows users to query the platform for properties based on their search criteria. It retrieves data from the Property Data storage to return results.

![Dataflow Diagram Level 1](/docs/dataflow-diagram/level-1.png)

### **Detailed Process Diagram (Level 2)**
   - **Overview:** This diagram delves even deeper into the specific processes and interactions between components.
   - **Key Components:**
     - **Registration & Login:** The initial step where the user provides credentials, which are verified against stored data.
     - **User Authentication:** Once credentials are verified, the user is authenticated, and profile data is managed.
     - **Manager User Profiles:** Handles updates and management of user profiles, interacting with User Data for storing and retrieving information.
     - **Property Management:** Includes more granular actions like adding, editing, or removing properties by agents.
     - **Search Properties:** Users send search criteria, which the platform processes to return relevant properties from the Property Data storage.
     - **View Property Details:** After retrieving search results, users can view specific details of a property.

![Dataflow Diagram Level 2](/docs/dataflow-diagram/level-2.png)

Each level of the diagram adds more detail to the processes within the Real Estate Platform, from a broad overview in Level 0 to specific interactions and data flows in Level 2.

## R3. Application Architecture Diagram

The application architecture diagram below appears to represent a three-layered architecture typically used in software applications.

![Application Architecture Diagram](/docs/application-architecture-diagram/1.png)

### 1. Presentation Layer
- **Description**: This is the topmost layer of the architecture, which handles the interaction between the user and the application.
- **Components**:
  - **User, Agent, Admin**: These represent different types of users or roles that interact with the system. They could have different levels of access and functionalities.
  - **Web UI (User Interface)**: The interface that users interact with, typically through a web browser. The Web UI sends requests to the application layer and receives responses.

### 2. Application Layer
- **Description**: This middle layer contains the business logic of the application. It processes the requests from the presentation layer, interacts with the data layer, and sends the appropriate responses back.
- **Components**:
  - **User Authentication Service**: This service handles user login, authentication, and authorization by validating user credentials against stored data.
  - **Property Management Service**: Manages property-related information, likely handling CRUD (Create, Read, Update, Delete) operations for property records.
  - **Property Search Service**: Allows users to search for properties based on various criteria, sending queries to the data layer and returning results to the presentation layer.
- **Process**:
  - Requests from the Web UI are sent to these services, which then process the requests by interacting with the data layer.

### 3. Data Layer
- **Description**: This is the bottommost layer, responsible for data storage and retrieval.
- **Components**:
  - **User Data Store**: A database or data storage system that holds user credentials and authentication data.
  - **Property Data Store**: Stores property details, which could include information like property descriptions, locations, prices, etc.
- **Process**:
  - The application layer services interact with the data stores to retrieve, update, or store data. The retrieved data is then sent back to the application layer, which formats it for the Web UI.

### Overall Workflow:
1. A user (User, Agent, Admin) interacts with the Web UI.
2. The Web UI sends a **Request** to one of the services in the Application Layer.
3. The service processes the request, possibly interacting with the Data Layer to retrieve or store data.
4. The processed data is sent back to the Web UI as a **Response**.
5. The Web UI displays the response to the user.

This architecture ensures a clear separation of concerns, making the application more modular, scalable, and easier to maintain.

## R4. User Stories

### Main User Story:
As a potential homebuyer or renter, I want to efficiently search for properties, view detailed listings, and book appointments to find and secure my ideal home quickly and easily.
User Activities:
High-level tasks that the user needs to complete:
Search for properties.
View property details.
Book a property viewing.
Manage profile and saved properties.

### User Tasks:
Steps the user needs to complete to achieve the above activities:
1. Enter search criteria (location, price range, property type).
2. Browse search results.
3. View details of a selected property.
4. Save favorite properties.
5. Book a viewing for a property.
6. Confirm or cancel booking.
7. Edit personal profile.
8. View saved properties and booking history.

### User Steps:
Granular, discrete interactions to complete the tasks above:
1. Search for Properties:
    o Enter desired location in the search bar.
    o Select property type from the dropdown.
    o Set the price range slider.
    o Click the "Search" button.
2. View Property Details:
    o Click on a property from the search results.
    o View property photos, price, and description.
    o Check availability and contact details of the agent.
3. Book a Viewing:
    o Click on the "Book Viewing" button.
    o Choose a preferred date and time.
    o Enter contact details for confirmation.
    o Click "Confirm Booking."
4. Manage Profile:
    o Go to the profile section.
    o Update personal information.
    o View saved properties and booking history.
    o Edit or delete saved properties.
    o Cancel or reschedule bookings.

### User Story Table

| Version 1: Initial release feature. | Version 2: Second iteration feature. | Version 3: Later iteration feature. |
|-------------------------------------|--------------------------------------|--------------------------------------|

| User Story | Acceptance Criteria | Importance | Accept/Reject | Version |
|------------|---------------------|------------|---------------|---------|
| As an end user, I want to be able to sign-up/login so that I don’t have to enter my details every time I use the platform | When I successfully sign up for an account and log in, I should receive confirmation and be granted access to all user functionalities | HIGH | Accept | 1 |
| As an end user, I want to be able to browse available properties so that I can easily find ones that interest me | When I'm logged in, I should be able to view property listings complete with images, price, and other essential details | HIGH | Accept | 1 |
| As an end user, I want to be able to search for properties based on criteria like location and price range so that I can find properties that match my preferences | Upon logging in, I should be able to filter property listings by location, price range, and property type using the search functionality | HIGH | Accept | 1 |
| As an admin, I want to manage property listings effectively so that the platform always reflects the latest offerings | When logged in with admin privileges, I should have the ability to add, edit, or remove property listings, including images and detailed descriptions | HIGH | Accept | 1 |
| As an end user, I want to be able to book a property viewing so that I can schedule a time to visit the property | When selecting a property, I should have the option to book a viewing, with a confirmation provided upon successful booking | MEDIUM | Accept | 2 |
| As an admin, I want to oversee user bookings so that I can manage and confirm appointments | With admin access, I should be able to view and manage all user bookings to ensure proper scheduling and follow-ups | MEDIUM | Accept | 2 |
| As an end user, I want to be able to save favorite properties so that I can easily revisit them later | Upon finding a property I like, I should have the option to save it to a favorites list for easy access in the future | HIGH | Accept | 2 |
| As an end user, I want to be able to book viewings or make rental agreements directly through the platform so that I can manage my property interests efficiently | When booking a viewing or making a rental agreement, I should receive confirmation and have the option to cancel or reschedule the booking | HIGH | Accept | 3 |
| As an end user, I want to see properties on an advanced map so that I can visually locate them and view additional information | When accessing the map feature, I should see available properties plotted with detailed information displayed when clicked | MEDIUM | Accept | 3 |



## R5. Wireframes for multiple standard screen sizes

### Desktop: Home

- Nav Bar: Top navigation with 'Home', 'Property Finder', 'Buy', 'Rent', and 'Agents'.
- Login Button: Includes 'Login' and 'Signup'. After logging in, a 'My Properties' button will appear.
- Hero Section: A simple slogan with buttons for our two main pages, 'To Buy' and 'To Rent'.
- Feature Section: Displays the four latest updated properties. The default view is 'For Sale', but users can switch to 'For Rent' to see the latest rental properties.
- Contact: 'View Agents' button leads to the Agents page. 'Contact Us' sends an email to the company email.
- Footer: Optional, depending on time. We could include social media icons linking to other platforms.

![Desktop Home Page](/docs/wireframe/laptop/home.png)

### Desktop: Login

- Login: Users can log in with their email and password.
- Create Account: A link to the account creation page for new users.

![Desktop Login Page](/docs/wireframe/laptop/login.png)

### Desktop: Create Account

- Account Creation: Users can create a new account by providing their first name, last name, mobile number, email, and password.
- Sign In: A link for users who already have an account.

![Desktop Create Account Page](/docs/wireframe/laptop/create-account.png)

### Desktop: Property For Sale & For Rent

- Search Bar: Allows users to search by keywords like address, suburb, or postcode.
- Property Display: Three properties per row (possibly two for tablet size and one for mobile). Each card shows a photo, address, and price. Users can click on a card for more details.
- For Rent Page: Uses the same layout as the 'For Sale' page but displays rental properties.

![Desktop Property For Sale](/docs/wireframe/laptop/for-sale.png)
![Desktop Property For Rent](/docs/wireframe/laptop/for-rent.png)

### Desktop: Property Info

- Details: A page with photos and comprehensive information about the property.
- Actions: Users can save the property or contact the agent.

![Desktop Property Info](/docs/wireframe/laptop/property-info.png)

### Desktop: Agents

- Agent Details: A page displaying the agent's details.
- Contact Agent: Allows users to send an email to a specific agent.

![Desktop Agent](/docs/wireframe/laptop/agents.png)

### Desktop: My Property (for user)

- Login Required: Users must be logged in to access this page.
- Saved Properties: Displays all saved properties.
- Search Bar: Allows users to filter the list.
- Remove Properties: Users can remove saved properties using a button next to each listing.

![Desktop My Property](/docs/wireframe/laptop/my-property.png)

### Desktop: My Listing (for agent)

- Agent Mode: Similar to the user mode but with additional functions.
- Editing: Agents can edit each property listing.
- Add Listings: Agents can add new listings.
- Admin Page: We could set up an admin page to view, edit, or remove all listings if time permits.

![Desktop My Listing](/docs/wireframe/laptop/my-listing.png)

### Desktop: New Listing (for agent)

- Upload New Listings: A page for agents to upload new listings.

![Desktop Add New Listing](/docs/wireframe/laptop/new-listing.png)

### Tablet: Home

![Tablet Home](/docs/wireframe/tablet/home.png)

### Tablet: Login

![Tablet Login](/docs/wireframe/tablet/login.png)

### Tablet: Create Account

![Tablet Create Account](/docs/wireframe/tablet/create-account.png)

### Tablet: Property For Sale & For Rent

![Tablet Property For Sale](/docs/wireframe/tablet/for-sale.png)
![Tablet Property For Rent](/docs/wireframe/tablet/for-rent.png)

### Tablet: Agents

![Tablet Agent](/docs/wireframe/tablet/agents.png)

### Tablet: My Property (for user)

![Tablet My Property](/docs/wireframe/tablet/my-property.png)

### Tablet: My Listing (for agent)

![Tablet My Listing](/docs/wireframe/tablet/my-listing.png)

### Tablet: New Listing (for agent)

![Tablet New Listing](/docs/wireframe/tablet/new-listing.png)

### Mobile: Home

![Mobile Home](/docs/wireframe/mobile/home.png)

### Mobile: Login

![Mobile Login](/docs/wireframe/mobile/login.png)

### Mobile: Create Account

![Mobile Create Account](/docs/wireframe/mobile/create-account.png)

### Mobile: Property For Sale & For Rent

![Mobile Property For Sale](/docs/wireframe/mobile/for-sale.png)
![Mobile Property For Rent](/docs/wireframe/mobile/for-rent.png)

### Mobile: Agents

![Mobile Agent](/docs/wireframe/mobile/agents.png)

### Mobile: My Property (for user)

![Mobile My Property](/docs/wireframe/mobile/my-property.png)

### Mobile: My Listing (for agent)

![Mobile My Listing](/docs/wireframe/mobile/my-listing.png)

### Mobile: New Listing (for agent)

![Mobile New Listing](/docs/wireframe/mobile/new-listing.png)

## R6. Screenshots of Our Trello Board

##### 12/8/2024

![Trello 20240812](/docs/trello/20240812.png)

##### 13/8/2024

![Trello 20240813](/docs/trello/20240813.png)

##### 14/8/2024

![Trello 20240814](/docs/trello/20240814.png)

##### 15/8/2024

![Trello 20240815](/docs/trello/20240815.png)

##### 16/8/2024

![Trello 20240815](/docs/trello/20240816.png)

##### 17/8/2024

![Trello 20240815](/docs/trello/20240817.png)

##### 19/8/2024

![Trello 20240819](/docs/trello/20240819.png)

##### 20/8/2024

![Trello 20240820](/docs/trello/20240820.png)

##### 21/8/2024

![Trello 20240821](/docs/trello/20240821.png)

##### 22/8/2024

![Trello 20240822](/docs/trello/20240822.png)

##### 23/8/2024

![Trello 20240823](/docs/trello/20240823.png)

##### 26/8/2024

![Trello 20240826](/docs/trello/20240826.png)

##### 27/8/2024

![Trello 20240827](/docs/trello/20240827.png)

## Part B

### R8. Evidence of User Testing

#### Development Environment Testing from Wing 

| User Story | Expected Result | Response in App (User Comment) | Result |
|------------|-----------------|--------------------------------|--------|
| **General Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an end user, I want to be able to sign-up/login so that I don’t have to enter my details every time I use the platform | User should be able to sign up for an account and log in successfully, receiving confirmation and access to all user functionalities | I can successfully sign up and log in, receiving a confirmation email and access to all functionalities | Pass |
| As an end user, I want to be able to browse available properties so that I can easily find ones that interest me | User should be able to view property listings with images, price, and other essential details when logged in | When logged in, I can view property listings with all necessary details including images and prices | Pass |
| As an end user, I want to be able to search for properties based on criteria like location and price range so that I can find properties that match my preferences | User should be able to filter property listings by location, price range, and property type using the search functionality | I can filter property listings by location, price range, and property type using the search functionality | Pass |
| **Admin Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an admin, I want to manage property listings effectively so that the platform always reflects the latest offerings | Admin should have the ability to add, edit, or remove property listings, including images and detailed descriptions | When logged in with admin privileges, I can add, edit, and remove property listings, including images and detailed descriptions | Pass |
| **Specific Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As a user, I want to manage my profile so that my personal information is up to date | User should be able to update personal information, view saved properties and booking history, and edit or delete saved properties | I can update my personal information, view saved properties and booking history, and edit or delete saved properties from the profile section | Pass |
| As a user, I want to book a property viewing so that I can visit the property in person | User should be able to book a viewing by selecting a preferred date and time and entering contact details for confirmation | I can book a viewing by selecting a date and time, entering contact details, and receiving a confirmation | Pass |

#### Development Environment Testing from Sam

| User Story | Expected Result | Response in App (User Comment) | Result |
|------------|-----------------|--------------------------------|--------|
| **General Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an end user, I want to be able to sign-up/login so that I don’t have to enter my details every time I use the platform | User should be able to sign up for an account and log in successfully, receiving confirmation and access to all user functionalities | The sign-up and login process was smooth. I received a confirmation email and had access to all functionalities without any issues. | Pass |
| As an end user, I want to be able to browse available properties so that I can easily find ones that interest me | User should be able to view property listings with images, price, and other essential details when logged in | Browsing properties was easy. All listings included images, prices, and detailed descriptions, making it simple to find interesting properties. | Pass |
| As an end user, I want to be able to search for properties based on criteria like location and price range so that I can find properties that match my preferences | User should be able to filter property listings by location, price range, and property type using the search functionality | The search functionality worked well. I could filter properties by location, price range, and type, and the results matched my preferences. | Pass |
| **Admin Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an admin, I want to manage property listings effectively so that the platform always reflects the latest offerings | Admin should have the ability to add, edit, or remove property listings, including images and detailed descriptions | Managing property listings was straightforward. I could add, edit, and remove listings, including updating images and descriptions, without any problems. | Pass |
| **Specific Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As a user, I want to manage my profile so that my personal information is up to date | User should be able to update personal information, view saved properties and booking history, and edit or delete saved properties | Updating my profile was easy. I could change my personal information, view saved properties and booking history, and edit or delete saved properties. | Pass |
| As a user, I want to book a property viewing so that I can visit the property in person | User should be able to book a viewing by selecting a preferred date and time and entering contact details for confirmation | Booking a viewing was efficient. I selected a date and time, entered my contact details, and received a confirmation without any issues. | Pass |


#### Production Environment User Testing from Wing

| User Story | Expected Result | Response in App (User Comment) | Result |
|------------|-----------------|--------------------------------|--------|
| **General Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an end user, I want to be able to sign-up/login so that I don’t have to enter my details every time I use the platform | User should be able to sign up for an account and log in successfully, receiving confirmation and access to all user functionalities | The sign-up process was quick, and I received a confirmation email immediately. Logging in was straightforward, and I had full access to the platform. | Pass |
| As an end user, I want to be able to browse available properties so that I can easily find ones that interest me | User should be able to view property listings with images, price, and other essential details when logged in | Browsing properties was intuitive. Each listing had clear images, pricing information, and detailed descriptions, making it easy to find properties of interest. | Pass |
| As an end user, I want to be able to search for properties based on criteria like location and price range so that I can find properties that match my preferences | User should be able to filter property listings by location, price range, and property type using the search functionality | The search filters worked perfectly. I could narrow down the listings by location, price range, and property type, and the results were accurate. | Pass |
| **Admin Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an admin, I want to manage property listings effectively so that the platform always reflects the latest offerings | Admin should have the ability to add, edit, or remove property listings, including images and detailed descriptions | The admin panel was user-friendly. I could easily add new listings, edit existing ones, and remove outdated properties. Updating images and descriptions was seamless. | Pass |
| **Specific Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As a user, I want to manage my profile so that my personal information is up to date | User should be able to update personal information, view saved properties and booking history, and edit or delete saved properties | Managing my profile was simple. I updated my personal information, reviewed my saved properties and booking history, and edited or deleted saved properties without any issues. | Pass |
| As a user, I want to book a property viewing so that I can visit the property in person | User should be able to book a viewing by selecting a preferred date and time and entering contact details for confirmation | Booking a property viewing was hassle-free. I chose a convenient date and time, entered my contact details, and received a confirmation promptly. | Pass |

### Production Environment User Testing from Sam

| User Story | Expected Result | Response in App (User Comment) | Result |
|------------|-----------------|--------------------------------|--------|
| **General Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an end user, I want to be able to sign-up/login so that I don’t have to enter my details every time I use the platform | User should be able to sign up for an account and log in successfully, receiving confirmation and access to all user functionalities | Signing up was straightforward, and I received a confirmation email right away. Logging in was seamless, and I had immediate access to all features. | Pass |
| As an end user, I want to be able to browse available properties so that I can easily find ones that interest me | User should be able to view property listings with images, price, and other essential details when logged in | The property browsing experience was excellent. Listings were detailed with high-quality images, accurate pricing, and comprehensive descriptions. | Pass |
| As an end user, I want to be able to search for properties based on criteria like location and price range so that I can find properties that match my preferences | User should be able to filter property listings by location, price range, and property type using the search functionality | The search functionality was very effective. I could easily filter properties by location, price range, and type, and the results matched my criteria perfectly. | Pass |
| **Admin Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an admin, I want to manage property listings effectively so that the platform always reflects the latest offerings | Admin should have the ability to add, edit, or remove property listings, including images and detailed descriptions | The admin tools were very efficient. Adding, editing, and removing property listings was easy, and updating images and descriptions was quick and intuitive. | Pass |
| **Specific Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As a user, I want to manage my profile so that my personal information is up to date | User should be able to update personal information, view saved properties and booking history, and edit or delete saved properties | Updating my profile information was effortless. I could view my saved properties, booking history, and make changes without any hassle. | Pass |
| As a user, I want to book a property viewing so that I can visit the property in person | User should be able to book a viewing by selecting a preferred date and time and entering contact details for confirmation | Booking a viewing was very convenient. I selected my preferred date and time, entered my contact details, and received a confirmation almost instantly. | Pass |

### Production Environment Testing from Rorry

| User Story | Expected Result | Response in App (User Comment) | Result |
|------------|-----------------|--------------------------------|--------|
| **General Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an end user, I want to be able to sign-up/login so that I don’t have to enter my details every time I use the platform | User should be able to sign up for an account and log in successfully, receiving confirmation and access to all user functionalities | The sign-up and login process was user-friendly. I received a confirmation email quickly and had no trouble accessing the platform's features. | Pass |
| As an end user, I want to be able to browse available properties so that I can easily find ones that interest me | User should be able to view property listings with images, price, and other essential details when logged in | Browsing properties was a breeze. Each listing had clear images, accurate pricing, and detailed descriptions, making it easy to find properties of interest. | Pass |
| As an end user, I want to be able to search for properties based on criteria like location and price range so that I can find properties that match my preferences | User should be able to filter property listings by location, price range, and property type using the search functionality | The search feature worked flawlessly. I could filter properties by location, price range, and type, and the results were exactly what I was looking for. | Pass |
| **Admin Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As an admin, I want to manage property listings effectively so that the platform always reflects the latest offerings | Admin should have the ability to add, edit, or remove property listings, including images and detailed descriptions | Managing property listings was straightforward. I could easily add new listings, update existing ones, and remove outdated properties, including updating images and descriptions. | Pass |
| **Specific Users** | **Expected Result** | **Response in App (User Comment)** | **Result** |
| As a user, I want to manage my profile so that my personal information is up to date | User should be able to update personal information, view saved properties and booking history, and edit or delete saved properties | Managing my profile was simple. I could update my personal information, view my saved properties and booking history, and make changes as needed. | Pass |
| As a user, I want to book a property viewing so that I can visit the property in person | User should be able to book a viewing by selecting a preferred date and time and entering contact details for confirmation | Booking a property viewing was easy. I selected a convenient date and time, entered my contact details, and received a confirmation without any delay. | Pass |
