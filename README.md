<img src="./readme/readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/readme/title2.svg"/>

> A platform for business owners to list their restaurants and manage their statistics, and a mobile app for customers to discover restaurants and reserve a table in a certain restaurant.

### Customer Stories

- As a customer, I want to be able to filter by location, price, category, and rating to choose a restaurant according to my preferences.
- As a customer, I want to be able to check ratings, reviews, and comments, and comment on others' reviews so that I can ask them more detailed questions about their experience at a specific restaurant.
- As a customer, I want to be able to reserve a table to ensure there is availability before visiting.

### Manager Stories

- As a restaurant manager, I want to be able to add my restaurant and menu to increase its popularity.
- As a restaurant manager, I want to be able to remove an item from the menu that is no longer served in my restaurant.
- As a restaurant manager, I want to be able to view reservations and restaurant statistics.

### Admin Stories

- As an admin, I want to be able to approve or reject requests to add new restaurants.
- As an admin, I want to be able to remove a restaurant.
- As an admin, I want to be able to use the support system to manage restaurant inquiries and issues.

<br><br>

<!-- Prototyping -->
<img src="./readme/readme/title3.svg"/>

> I designed GoResto using wireframes and mockups, continually refining the layout until achieving an optimal design.

### Wireframes

| Landing Screen                                        | Register Screen                                         | Login Screen                                      |
| ----------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------- |
| ![Landing](./readme/readme/demo/landingWireframe.png) | ![Register](./readme/readme/demo/registerWireframe.png) | ![Login](./readme/readme/demo/loginWireframe.png) |

### Mockups

| Setup Screen                                    | Dashboard Screen                                        | Reservations Screen                                          |
| ----------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| ![Setup](./readme/readme/demo/setupMockups.png) | ![Dashboard](./readme/readme/demo/dashboardMockups.png) | ![Reservations](./readme/readme/demo/reservationsMockup.png) |

<br><br>

<!-- Implementation -->
<img src="./readme/readme/title4.svg"/>

> Using the wireframes and mockups as a guide, I implemented GoResto app with the following features:

### User Screens (Mobile)

| Login Screen                                         | Register Screen                                     | Loading Screen                                           | Home Screen                                          |
| ---------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| ![Login](./readme/readme/demo/mobileSignin.png)      | ![Regiter](./readme/readme/demo/mobileRegister.png) | ![Loading](./readme/readme/demo/loading.gif)             | ![Home](./readme/readme/demo/home.gif)               |
| Restaurants Screen                                   | Chats Screen                                        | Display Restaurant Screen                                | Menu Screen                                          |
| ![Restaurants](./readme/readme/demo/restaurants.gif) | ![Chats](./readme/readme/demo/chats.gif)            | ![Restaurant](./readme/readme/demo/mobileRestaurant.png) | ![Menu](./readme/readme/demo/menu.gif)               |
| Ratings & Reviews Screen                             | Rating Form Screen                                  | Reserving Form Screen                                    | Reservations Screen                                  |
| ![Ratings](./readme/readme/demo/ratings.gif)         | ![Rating](./readme/readme/demo/rating.gif)          | ![Reserving](./readme/readme/demo/restaurant.gif)        | ![Reservings](./readme/readme/demo/reservations.gif) |

### Manager Screens (Web)

| Login Screen                             | Register Screen                                | Home Screen                                      |
| ---------------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| ![Login](./readme/readme/demo/login.png) | ![Register](./readme/readme/demo/register.png) | ![Dashboard](./readme/readme/demo/dashboard.png) |
| Setup Screen                             | Pending Screen                                 |
| ![Setup](./readme/readme/demo/setup.png) | ![Pending](./readme/readme/demo/pending.png)   |

### Manager Screens /Animated (Web)

| Reservations Screen                                       | Menu Screen                                     | Add Menu Item Screen                              |
| --------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| ![Reservations](./readme/readme/demo/webReservations.gif) | ![Menu](./readme/readme/demo/webMenu.gif)       | ![MenuItem](./readme/readme/demo/addMenuItem.gif) |
| Chats Screen                                              | Inquiry Screen                                  | About Screen                                      |
| ![Chats](./readme/readme/demo/webChats.gif)               | ![Inquiry](./readme/readme/demo/webInquiry.gif) | ![About](./readme/readme/demo/editResto.gif)      |
| Choosing Location                                         |
| ![Map](./readme/readme/demo/map.gif)                      |

### Admin Screens /Animated (Web)

| Removing User                                | Filtering Restaurants                                                  | Removing Restaurant                                            |
| -------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| ![Users](./readme/readme/demo/userAdmin.gif) | ![Filtering Restaurants](./readme/readme/demo/filteringRestoAdmin.gif) | ![Removing Restaurant](./readme/readme/demo/removingResto.gif) |
| Displaying Menu                              | Filtering Inquiries                                                    | Requests Screen                                                |
| ![Menu](./readme/readme/demo/menuAdmin.gif)  | ![Filtering Inquiries](./readme/readme/demo/inquiries.gif)             | ![Requests](./readme/readme/demo/requestsAdmin.gif)            |

<br><br>

<!-- Tech stack -->
<img src="./readme/readme/title5.svg"/>

### GoResto is built using the following technologies:

- This project uses the React Native app development framework and the React web development framework.
- For persistent storage (database), it uses MySQL database along with MongoDB (for the chatting system).
- It uses the font ["Raleway"](https://fonts.googleapis.com/css2?family=Fasthand&family=Raleway:wght@400;500;700;800;900&display=swap) as its main font, and its design adheres to the material design guidelines.

<br><br>

<!-- How to run -->
<img src="./readme/readme/title6.svg"/>

> To set up GoResto locally, follow these steps:

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

To install GoResto locally:

1. Open any terminal (like command prompt or vs terminal) and navigate to where you want to install the project

   ```sh
   cd folder-name
   ```

2. Clone the repo
   ```sh
   git clone https://github.com/ShifaaKhalil98/GoResto.git
   ```
3. Navigate to the web app folder and install NPM packages

   ```sh
   npm install
   ```

4. Run the web app

   ```sh
   npm start
   ```

5. Make sure you have Node.js installed on your computer by visiting the official website

   ```sh
   https://nodejs.org/en/download
   ```

6. Navigate to the mobile app folder and install NPM packages

   ```sh
   npm install
   ```

7. Install expo

   ```sh
   npm install -g expo-cli
   ```

8. Run the mobile app

   ```sh
   expo start
   ```

9. Run it on the web

   ```sh
   press w
   ```

10. Run the server in Laravel

    a. Visit https://getcomposer.org/download/ to install Composer then run the below command to install the dependencies

    ```sh
    expo start
    ```

    b. Migrate to the database

    ```sh
    php artisan migrate
    ```

    c. Run the server

    ```sh
    php artisan serve
    ```

Now, you should be able to run GoResto (web app and mobile app) locally and explore its features.
