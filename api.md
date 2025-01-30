# API Documentation

This documentation describes the available API endpoints for managing climbs and comments.

## Table of Contents

1. [Climb API](#climb-api)
    - [Get Climb by Index](#get-climb-by-index)
    - [Add New Climb](#add-new-climb)
    - [Get Climb List Length](#get-climb-list-length)
2. [Comment API](#comment-api)
    - [Get Comments for a Climb](#get-comments-for-a-climb)
    - [Add Comment to a Climb](#add-comment-to-a-climb)

---

## Climb API

### Get Climb by Index

- **URL:** `/api/climb/get`
- **Method:** `GET`
- **Query Parameters:**
    - `i` (required) — The index of the climb in the list.
- **Response:**
    - A single climb object, which includes the following properties:
        - `name`: The name of the climb.
        - `difficulty`: The difficulty rating of the climb.
        - `imgURL`: The URL of an image representing the climb.

#### Example Request:

```
GET /api/climb/get?i=0
```

#### Example Response:

```json
{
    "name": "Burden of Dreams",
    "difficulty": "V17",
    "imgURL": "https://www.planetmountain.com/uploads/img/1/81988.jpg"
}
```

---

### Add New Climb

- **URL:** `/api/climb/add`
- **Method:** `POST`
- **Request Body (JSON):**
    - `floatingName` (required) — The name of the climb.
    - `floatingDifficulty` (required) — The difficulty rating of the climb.
    - `floatingImageURL` (required) — The image URL representing the climb.
- **Response:**
    - `200 OK` — The climb is successfully added to the list and saved to the data file.

#### Example Request:

```json
{
    "floatingName": "Alphane",
    "floatingDifficulty": "V17",
    "floatingImageURL": "https://cdn.climbing.com/wp-content/uploads/2022/08/Neilson-021822-05775-scaled.jpg?width=730"
}
```

#### Example Response:

```json
OK
```

---

### Get Climb List Length

- **URL:** `/api/climb/length`
- **Method:** `GET`
- **Response:**
    - `200 OK` — The total number of climbs in the list (as a string).

#### Example Request:

```
GET /api/climb/length
```

#### Example Response:

```
10
```

---

## Comment API

### Get Comments for a Climb

- **URL:** `/api/comment/get`
- **Method:** `GET`
- **Query Parameters:**
    - `climb` (required) — The name of the climb to fetch comments for.
- **Response:**
    - An array of comment texts related to the specified climb.

#### Example Request:

```
GET /api/comment/get?climb=Burden%20of%20Dreams
```

#### Example Response:

```json
[
    "Start with a micro-crimp match and a high left foot stab.",
    "Deadpoint to the right-hand crimp and engage a left drop-knee.",
    "Slight thumb catch on the right-hand crimp helps with stability.",
    "Stab left foot into a tiny divot to stay balanced.",
    "Micro-adjust fingers before the final match to avoid slipping."
]
```

---

### Add Comment to a Climb

- **URL:** `/api/comment/add`
- **Method:** `POST`
- **Query Parameters:**
    - `climb` (required) — The name of the climb to add the comment to.
- **Request Body (JSON):**
    - `commentText` (required) — The text of the comment.
- **Response:**
    - `200 OK` — The comment is successfully added to the climb's list of comments.

#### Example Request:

```json
{
    "commentText": "Left hand on a small undercling, right hand on a sharp crimp."
}
```

#### Example Response:

```json
OK
```
