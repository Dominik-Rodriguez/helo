insert into users(
    username,
    password
) values (
    ${username},
    ${hash}
)
returning id, username;