# Portfolio

## Purpose

The API is written in Nodejs and is designed to allow users to add songs to their favorites. Additionally, users can contribute by adding songs and artists that are not in the database yet, with the goal of raising recognition for underrated artists.

## Frontend

The frontend of the application is built with React and is located in the `images/api/frontend` directory. If you want to run the frontend separately, follow the instructions in the [frontend README](images/api/frontend/README.md).
**Note: This is my first time working with React.**

## Getting Started

To run the project, follow these steps:

1. Copy the `.env.template` file to a new file called `.env`.
2. Run the following command to build and start the project using Docker Compose:
    ```
    docker-compose up --build
    ```
## API Endpoints
| HTTP Verbs | Endpoints | Action | Parameters |
| --- | --- | --- | --- |
| GET | /artists | Get all artists | N/A |
| POST | /artists | Create a new artist | `name` (string) |
| GET | /songs | Get all songs | N/A |
| POST | /songs | Add a new song | `name` (string), `artist` (string) |
| GET | /songs/:artist_id | Get all songs from an artist | `artist_id` (number) |
| GET | /users | Get all users | N/A |
| POST | /users/register | Create a new user | `username` (string), `email` (string), `password`(string) |
| POST | /users/login | Login a user | `email` (string), `password` (string) |
| POST | /users/add-favorite-song | Add a song to a user's favorites | `favorite_song_id` (number) |
| DELETE | /users/delete-favorite-song | Delete a song from a user's favorite |`favorite_song_id` (number) |
| GET | /users/:user_id/favorite-songs | Get all favorite songs from a user | N/A |


## Status

The project is currently in development.

## License

This project is licensed under the [MIT License](LICENSE).

## Questions and Support

If you have any questions or need assistance, feel free to open a support ticket.
