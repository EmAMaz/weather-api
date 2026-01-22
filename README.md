
# 🏨 Weather API

Weather API is a weather API that collects and returns weather data.

Project carried out through the website “roadmap.sh” https://roadmap.sh/projects/weather-api-wrapper-service




## 🛠️ Technologies Used

**Server:** Node, Express y TypeScript

**Cahe:** Redis
## 🚀 Installation

Follow these steps to get the API up and running in your local environment.

1 Clone the Repository
```bash
  git clone https://github.com/EmAMaz/weather-api.git
  cd weather-api
```

1.1- Install Dependencies
```bash
  npm install
```
1.2 Configure Environment Variables
```bash
    KEY_API=****
    REDIS_URL:***
```
1.3 Run the Application - Development Mode
```bash
npm run dev
```
## API Reference

#### Get weather

```http
  GET /api/weather
```

| Query parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `location` | `string` | **Required**. Your API key in .env file |


